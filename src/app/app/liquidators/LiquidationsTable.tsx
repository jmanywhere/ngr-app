"use client";
import {
  useContractRead,
  useContractReads,
  useContractWrite,
  useWaitForTransaction,
} from "wagmi";
import { growConfig, ngrGrowConfig } from "@/data/contracts";
import { formatEther, parseEther } from "viem";
import { useImmer } from "use-immer";
import classNames from "classnames";
import { current } from "immer";

export default function LiquidationsTable() {
  const [selectedIds, setSelectedIds] = useImmer<Array<number>>([]);
  const { data: liquidationInfo } = useContractReads({
    contracts: [
      {
        ...growConfig,
        functionName: "calculatePrice",
      },
      {
        ...ngrGrowConfig,
        functionName: "queuePosition",
      },
      {
        ...ngrGrowConfig,
        functionName: "liquidatorAmount",
      },
      {
        ...ngrGrowConfig,
        functionName: "totalAmount",
      },
    ],
    watch: true,
  });

  const { currentPrice, queuePosition, liquidatorAmount, totalAmount } = {
    currentPrice: (liquidationInfo?.[0].result || 0n) as bigint,
    queuePosition: (liquidationInfo?.[1].result || 0n) as bigint,
    liquidatorAmount: (liquidationInfo?.[2].result || 0n) as bigint,
    totalAmount: (liquidationInfo?.[3].result || 0n) as bigint,
  };

  const { data: positions } = useContractRead({
    ...ngrGrowConfig,
    functionName: "getPositions",
    args: [0n, queuePosition],
    enabled: (queuePosition > 0n) as boolean,
    watch: true,
  });

  const {
    data: liquidateData,
    write: liquidate,
    isLoading: loadingTxLiquidate,
  } = useContractWrite({
    ...ngrGrowConfig,
    functionName: "liquidateOthers",
    args: [selectedIds.map((id) => BigInt(id))],
    onSuccess: () => {
      setSelectedIds((draft) => {
        draft = [];
      });
    },
  });

  const { data: liquidateReceipt, isLoading: isLiquidating } =
    useWaitForTransaction({
      hash: liquidateData?.hash,
      confirmations: 5,
    });

  const descPositions = (
    positions?.map((position, index) => {
      return { ...position, index };
    }) as Array<{
      owner: `0x${string}`;
      depositTime: bigint;
      liqTime: bigint;
      amountDeposited: bigint;
      growAmount: bigint;
      liquidationPrice: bigint;
      isLiquidated: boolean;
      early: boolean;
      index: number;
    }>
  )?.reverse();
  const allPositions = positions?.length || 0;
  return (
    <>
      <h2>
        Current Price:{" "}
        {parseFloat(formatEther(currentPrice)).toLocaleString(undefined, {
          maximumFractionDigits: 6,
        })}
      </h2>
      <div className="w-full flex justify-center items-center py-2">
        <button
          className={classNames(
            "btn btn-primary border-secondary/40 border-2 text-white/90",
            selectedIds.length === 0
              ? "bg-slate-600/50 text-white/20 border-secondary/10 pointer-events-none"
              : "",
            loadingTxLiquidate || isLiquidating
              ? "opacity-50 pointer-events-none"
              : ""
          )}
          onClick={() => liquidate?.()}
        >
          {loadingTxLiquidate || isLiquidating ? (
            <span className="loading loading-ball" />
          ) : (
            "Liquidate"
          )}
        </button>
      </div>
      <div className="bg-slate-600 rounded-lg mb-12">
        <table className="table">
          <thead>
            <th>Position ID</th>
            <th>GROW Amount</th>
            <th>Liquidation Price</th>
            <th>Profit To Earn</th>
            <th>Can Liquidate</th>
            <th />
          </thead>
          <tbody className="text-white/70">
            {descPositions?.map((position, tableIndex) => {
              const currentAmount =
                ((position.growAmount as bigint) * currentPrice) /
                parseEther("1");
              const split = currentAmount / 100n;
              const canLiquidate = position.liquidationPrice < currentPrice;
              if (!canLiquidate) return null;
              return (
                <tr key={`Liquidation-index-${position.index}`}>
                  <th>{allPositions - tableIndex - 1}</th>
                  <td>
                    {parseFloat(
                      formatEther(position.growAmount || 0n)
                    ).toLocaleString(undefined, { maximumFractionDigits: 0 })}
                  </td>
                  <td>
                    {parseFloat(
                      formatEther(position.liquidationPrice || 0n)
                    ).toLocaleString(undefined, { maximumFractionDigits: 8 })}
                  </td>
                  <td>
                    {position.isLiquidated || !canLiquidate
                      ? "-"
                      : parseFloat(formatEther(split)).toLocaleString(
                          undefined,
                          {
                            maximumFractionDigits: 6,
                          }
                        )}
                  </td>
                  <td className="text-center">
                    {canLiquidate && !position.isLiquidated ? (
                      <input
                        type="checkbox"
                        className="checkbox checkbox-primary"
                        checked={selectedIds.indexOf(position.index) > -1}
                        onChange={() =>
                          setSelectedIds((draft) => {
                            const idIndex = draft.indexOf(position.index);
                            if (idIndex > -1) {
                              draft.splice(idIndex, 1);
                            } else {
                              draft.push(position.index);
                            }
                          })
                        }
                      />
                    ) : (
                      ""
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}
