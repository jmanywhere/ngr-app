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
import compact from "lodash/compact";
import { useMemo } from "react";

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
      {
        ...ngrGrowConfig,
        functionName: "currentPositionToLiquidate",
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
    currentPositionToLiquidate,
  } = {
    currentPrice: (liquidationInfo?.[0].result || 0n) as bigint,
    currentPositionToLiquidate: (liquidationInfo?.[5].result || 0n) as bigint,
    queuePosition: (liquidationInfo?.[1].result || 0n) as bigint,
    liquidatorAmount: (liquidationInfo?.[2].result || 0n) as bigint,
    totalAmount: (liquidationInfo?.[3].result || 0n) as bigint,
    totalPaidToLiquidators: (liquidationInfo?.[4].result || 0n) as bigint,
  };

  const { data: positions } = useContractRead({
    ...ngrGrowConfig,
    functionName: "getPositions",
    args: [1n, queuePosition - 1n],
    enabled: (queuePosition > 0n) as boolean,
    watch: true,
  });

  const {
    data: liquidateData,
    write: liquidate,
    isLoading: loadingTxLiquidate,
  } = useContractWrite({
    ...ngrGrowConfig,
    functionName: "liquidatePositions",
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

  const descPositions = compact(
    (positions?.map((position, index) => {
      if (position.liquidationPrice > currentPrice || position.isLiquidated)
        return null;
      return {
        ...position,
        index: index + 1,
      };
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
    }>) || []
  );
  const positionToLiquidate = useMemo(() => {
    if (!positions) return NaN;
    for (let i = 0; i < positions.length; i++) {
      if (
        positions[i].liquidationPrice >= currentPrice &&
        !positions[i].isLiquidated
      )
        return i;
    }
  }, [positions, currentPrice]);
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
            <tr>
              <th>Position ID</th>
              <th>GROW Amount</th>
              <th>Liquidation Price</th>
              <th>Profit To Earn</th>
              <th>Can Liquidate</th>
              <th />
            </tr>
          </thead>
          <tbody className="text-white/70">
            {descPositions.length > 0 ? (
              descPositions?.map((position, tableIndex) => {
                const currentAmount =
                  ((position.growAmount as bigint) * currentPrice * 96n) /
                  parseEther("100");
                const maxLiq = (position.amountDeposited * 105n) / 100n;
                const split = ((currentAmount - maxLiq) * 4n) / 10n;
                const canLiquidate = position.liquidationPrice < currentPrice;
                if (position.isLiquidated) return null;
                return (
                  <tr key={`Liquidation-index-${position.index}`}>
                    <th>{position.index}</th>
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
                      {canLiquidate &&
                      !position.isLiquidated &&
                      (tableIndex == 0 ||
                        selectedIds.includes(
                          descPositions[tableIndex - 1].index
                        )) ? (
                        <input
                          type="checkbox"
                          className="checkbox checkbox-primary"
                          checked={selectedIds.indexOf(position.index) > -1}
                          onChange={() =>
                            setSelectedIds((draft) => {
                              const idIndex = draft.indexOf(position.index);
                              const length = draft.length;
                              if (idIndex > -1) {
                                draft.splice(idIndex, length - idIndex);
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
              })
            ) : (
              <tr>
                <td colSpan={6} className="text-center whitespace-pre-wrap">
                  No positions to liquidate
                  {"\n"}
                  Next Liquidation at:{" "}
                  {parseFloat(
                    formatEther(
                      (positionToLiquidate ?? -1) > -1
                        ? positions?.[positionToLiquidate ?? 0]
                            .liquidationPrice || 0n
                        : 0n
                    )
                  ).toLocaleString(undefined, { maximumFractionDigits: 6 })}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
