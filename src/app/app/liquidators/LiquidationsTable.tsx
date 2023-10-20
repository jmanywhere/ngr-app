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
import { parse } from "path";

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
      {
        ...ngrGrowConfig,
        functionName: "totalPaidToLiquidators",
      },
    ],
    watch: true,
  });

  const {
    currentPrice,
    queuePosition,
    liquidatorAmount,
    totalAmount,
    totalPaidToLiquidators,
  } = {
    currentPrice: (liquidationInfo?.[0].result || 0n) as bigint,
    queuePosition: (liquidationInfo?.[1].result || 0n) as bigint,
    liquidatorAmount: (liquidationInfo?.[2].result || 0n) as bigint,
    totalAmount: (liquidationInfo?.[3].result || 0n) as bigint,
    totalPaidToLiquidators: (liquidationInfo?.[4].result || 0n) as bigint,
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
        const length = draft.length;
        draft.splice(0, length);
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
      <h2 className="text-xl text-center whitespace-pre-wrap bg-slate-800 w-full max-w-xs p-4 rounded-xl text-slate-300">
        Current Price:{"\n"}
        <span className="text-4xl font-bold text-primary">
          {parseFloat(formatEther(currentPrice)).toLocaleString(undefined, {
            maximumFractionDigits: 6,
          })}
        </span>
        {"\n"}
        <span className="text-sm">Paid to Liquidators:{"\n"}</span>
        <span className="text-xl font-bold text-primary">
          {parseFloat(formatEther(totalPaidToLiquidators)).toLocaleString(
            undefined,
            {
              maximumFractionDigits: 6,
            }
          )}
        </span>
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
                ((position.growAmount as bigint) * currentPrice * 96n) /
                parseEther("100");
              const maxLiq =
                (position.growAmount * position.liquidationPrice * 96n) /
                parseEther("100");
              const split = maxLiq / 100n + (currentAmount - maxLiq);
              const canLiquidate = position.liquidationPrice < currentPrice;
              if (position.isLiquidated) return null;
              return (
                <tr key={`Liquidation-index-${position.index}`}>
                  <th>{allPositions - tableIndex - 1}</th>
                  <td>
                    {parseFloat(
                      formatEther(position.growAmount || 0n)
                    ).toLocaleString(undefined, { maximumFractionDigits: 6 })}
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
