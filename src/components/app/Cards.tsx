"use client";

import {
  erc20ABI,
  paginatedIndexesConfig,
  useAccount,
  useContractInfiniteReads,
  useContractRead,
  useContractReads,
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from "wagmi";
import { useCallback, useEffect, useMemo, useState } from "react";
import { formatEther, parseEther, zeroAddress } from "viem";
import classNames from "classnames";
import intervalToDuration from "date-fns/intervalToDuration";
import formatDuration from "date-fns/formatDuration";

import {
  TEST_USDT_ADDRESS,
  growNGR,
  growToken,
  ngrConfig,
  ngrGrowConfig,
  growConfig,
  usdtConfig,
} from "@/data/contracts";

export const StatsCard = () => {
  const { address } = useAccount();
  const { data: ngrData, refetch: ngrDataRefetch } = useContractReads({
    contracts: [
      {
        ...usdtConfig,
        functionName: "balanceOf",
        args: [growToken],
      },
      {
        ...ngrConfig,
        functionName: "cycleCounter",
      },
      {
        ...growConfig,
        functionName: "calculatePrice",
      },
      {
        ...ngrGrowConfig,
        functionName: "totalLiquidations",
      },
      {
        ...ngrGrowConfig,
        functionName: "totalDeposits",
      },
      {
        ...ngrConfig,
        // functionName: "currentUserPendingLiquidation",
        functionName: "userToLiquidate",
      },
      {
        ...ngrConfig,
        functionName: "depositCounter",
      },
      {
        ...ngrGrowConfig,
        functionName: "getUserPositions",
        args: [address || zeroAddress],
      },
      {
        ...ngrGrowConfig,
        functionName: "userStats",
        args: [address || zeroAddress],
      },
      {
        ...ngrConfig,
        functionName: "totalDeposits",
      },
      {
        ...ngrConfig,
        functionName: "totalLiquidations",
      },
      {
        ...ngrGrowConfig,
        functionName: "getUserPositionsInfo",
        args: [address || zeroAddress],
      },
    ],
  });

  console.log(ngrData);

  const statsData = useMemo(() => {
    return {
      tcv: (ngrData?.[0].result as bigint) || 0n, // uint256 == bigint 1 ether == 1000000000000000000
      cycleCounter: (ngrData?.[1].result as bigint) || 0n,
      helixPrice: (ngrData?.[2].result as bigint) || 0n,
      liquidations: (ngrData?.[3].result as bigint) || 0n,
      totalPositions: (ngrData?.[4].result as bigint) || 0n,
      currentUserPendingLiquidation: (ngrData?.[5].result as bigint) || 0n,
      deposits: (ngrData?.[6].result as bigint) || 0n,
      totalUserPositions: (ngrData?.[7].result as bigint[]) || [],
      userStats: (ngrData?.[8].result || new Array(4).fill(0n)) as [
        bigint,
        bigint,
        bigint,
        bigint
      ],
      totalDeposits: (ngrData?.[4].result as bigint) || 0n,
      totalLiquidations: (ngrData?.[10].result as bigint) || 0n,
      userPositionsInfo: (ngrData?.[11].result || []) as readonly {
        owner: `0x${string}`;
        depositTime: bigint;
        liqTime: bigint;
        amountDeposited: bigint;
        growAmount: bigint;
        liquidationPrice: bigint;
        isLiquidated: boolean;
        early: boolean;
      }[],
    };
  }, [ngrData]);

  // const { data: positionData, refetch: positionRefetch } = useContractRead({
  //   ...ngrConfig,
  //   functionName: "positions",
  //   args: [statsData.userStats[6] || 0n],
  // });

  // const [selectedPage, setSelectedPage] = useState(0);

  console.log(statsData.totalUserPositions);

  // const {
  //   data: positionsData,
  //   fetchNextPage,
  //   refetch: positionsRefetch,
  //   isLoading: positionsLoading,
  // } = useContractInfiniteReads({
  //   cacheKey: "user_positions_1",
  //   ...paginatedIndexesConfig(
  //     (index: number) => {
  //       if (index >= statsData.totalUserPositions.length)
  //         return [] as readonly any[];
  //       const positionToGet =
  //         statsData.totalUserPositions[parseInt(index.toString())];
  //       return [
  //         {
  //           ...ngrGrowConfig,
  //           functionName: "positions",
  //           args: [positionToGet],
  //         },
  //       ];
  //     },
  //     {
  //       start: statsData.totalUserPositions.length - 1,
  //       perPage: 10,
  //       direction: "decrement",
  //     }
  //   ),
  // });

  const fullRefetch = useCallback(() => {
    ngrDataRefetch();
    // positionRefetch();
    // positionsRefetch();
  }, [ngrDataRefetch]);

  useEffect(() => {
    const interval = setInterval(() => {
      fullRefetch();
    }, 10000);
    return () => clearInterval(interval);
  }, [fullRefetch]);

  const totalPages = Math.ceil(statsData.totalUserPositions.length / 10);

  return (
    <>
      <section className="flex flex-col gap-y-4">
        <h2 className="w-full font-bold text-3xl drop-shadow text-secondary text-center">
          Global Stats
        </h2>
        <div className="stats stats-vertical md:stats-horizontal shadow text-accent ">
          <div className="stat">
            <p className="stat-title text-slate-400">Investments</p>
            <p className="stat-value">
              {parseFloat(
                formatEther(statsData.totalDeposits)
              ).toLocaleString()}
            </p>
            <p className="stat-desc text-slate-500">Total in USDT</p>
          </div>
          {/* <div className="stat">
            <p className="stat-title text-slate-400">Payouts</p>
            <p className="stat-value">
              {parseFloat(
                formatEther(statsData.totalLiquidations)
              ).toLocaleString()}
            </p>
            <p className="stat-desc text-slate-500">
              Total Principal + Interest USDT
            </p>
          </div> */}
          <div className="stat">
            <p className="stat-title text-slate-400">Liquidations</p>
            <p className="stat-value">
              {parseFloat(formatEther(statsData.liquidations)).toLocaleString(
                undefined,
                { maximumFractionDigits: 2 }
              )}
            </p>
            <p className="stat-desc text-slate-500">Total Liquidations Made</p>
          </div>
        </div>
        <div className="stats stats-vertical md:stats-horizontal shadow text-primary bg-slate-900 ">
          <div className="stat">
            <p className="stat-title text-slate-400">GROW Price</p>
            <p className="stat-value">
              {parseFloat(formatEther(statsData.helixPrice)).toLocaleString(
                undefined,
                { maximumFractionDigits: 6 }
              )}
            </p>
            <div className="stat-desc text-slate-500">USD</div>
          </div>
          <div className="stat">
            <p className="stat-title text-slate-400">TCV</p>
            <p className="stat-value">
              {parseFloat(formatEther(statsData.tcv)).toLocaleString()}
            </p>
            <div className="stat-desc text-slate-500">Total Value USDT</div>
          </div>
          {/* <div className="stat">
            <p className="stat-title text-slate-400">Cycle</p>
            <p className="stat-value">
              {statsData.cycleCounter.toLocaleString()}
            </p>
            <div className="stat-desc text-slate-500">
              Times Price has reset
            </div>
          </div> */}
        </div>
      </section>
      <ActionsCard refetchOther={fullRefetch} tcv={statsData.tcv} />
      <section className="flex flex-col gap-4">
        <h2 className="w-full font-bold text-3xl drop-shadow text-secondary text-center">
          Personal Stats
        </h2>
        <div className="stats stats-vertical md:stats-horizontal shadow text-slate-100 bg-emerald-900 ">
          <div className="stat">
            <p className="stat-title text-slate-300">Deposited</p>
            <p className="stat-value">
              {parseFloat(formatEther(statsData.userStats[0])).toLocaleString()}
            </p>
            <div className="stat-desc text-slate-400">USDT</div>
          </div>
          <div className="stat">
            <p className="stat-title text-slate-300">Liquidations</p>
            <p className="stat-value">
              {parseFloat(formatEther(statsData.userStats[1])).toLocaleString()}
            </p>
            <div className="stat-desc text-slate-400">USDT</div>
          </div>
          <div className="stat">
            <p className="stat-title text-slate-300">Other Profits</p>
            <p className="stat-value">
              {parseFloat(formatEther(statsData.userStats[3])).toLocaleString()}
            </p>
            <div className="stat-desc text-slate-400">USDT</div>
          </div>
        </div>
        {/* <div className="stats stats-vertical md:stats-horizontal shadow text-accent bg-emerald-800 ">
          <div className="stat">
            <p className="stat-title text-slate-300">Total</p>
            <p className="stat-value">
              {statsData.userStats[3].toLocaleString()}
            </p>
            <div className="stat-desc text-slate-400">Total deposits</div>
          </div>
          <div className="stat">
            <p className="stat-title text-slate-300">Liquidations</p>
            <p className="stat-value">
              {statsData.userStats[4].toLocaleString()}
            </p>
            <div className="stat-desc text-slate-400">Total Liquidations</div>
          </div>
          <div className="stat">
            <p className="stat-title text-slate-300">Last ID</p>
            <p className="stat-value">
              {statsData.userStats[6].toLocaleString()}
            </p>
            <div className="stat-desc text-slate-400">Position Liquidated</div>
          </div>
        </div> */}
      </section>
      <section className="flex flex-col">
        <h2 className="w-full font-bold text-3xl drop-shadow text-secondary text-center">
          My Positions
        </h2>
        <div className="shadow text-slate-200 bg-slate-800 rounded-xl p-1 max-w-[100vw] overflow-x-auto">
          <table className="table table-zebra">
            <thead>
              <tr>
                <th>Position ID</th>
                <th>Deposit</th>
                <th>Liquidation</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {statsData.userPositionsInfo?.map((positionInfo, index) => {
                return (
                  <PositionRow
                    key={`position-${index}-page-${positionInfo.owner}`}
                    positionId={statsData.totalUserPositions[index]}
                    positionIndex={index}
                    depositAmount={positionInfo.amountDeposited}
                    isEarlyWithdraw={positionInfo.early}
                    liquidatePrice={positionInfo.liquidationPrice}
                    isLiquidated={positionInfo.isLiquidated}
                    canLiquidate={
                      positionInfo.liquidationPrice < statsData.helixPrice
                    }
                    liqDuration={
                      positionInfo.isLiquidated
                        ? formatDuration(
                            intervalToDuration({
                              start:
                                parseInt(positionInfo.depositTime.toString()) *
                                1000,
                              end:
                                parseInt(positionInfo.liqTime.toString()) *
                                1000,
                            }),
                            {
                              format: ["days", "hours", "minutes", "seconds"],
                            }
                          ).replace(/days|hours|minutes|seconds/gi, (m) =>
                            m.substring(0, 1)
                          )
                        : null
                    }
                  />
                );
              })}
            </tbody>
          </table>
          {/* {statsData.totalUserPositions.length > 10 && (
            <div className="flex flex-row items-center justify-between">
              <button
                className={classNames(
                  "btn  btn-circle btn-secondary",
                  selectedPage === totalPages - 1 ? "btn-disabled" : ""
                )}
                onClick={() => {
                  if (
                    selectedPage + 1 >
                    (positionsData?.pages?.length || 0) - 1
                  ) {
                    fetchNextPage();
                  }
                  setSelectedPage((p) => p + 1);
                }}
              >
                {"<"}
              </button>
              <div className="font-semibold">
                {positionsLoading ? (
                  <span className="loading loading-spinner text-white w-10 h-10" />
                ) : (
                  Math.ceil(statsData.totalUserPositions.length / 10) -
                  selectedPage
                )}{" "}
                / {Math.ceil(statsData.totalUserPositions.length / 10)}
              </div>
              <button
                className={classNames(
                  "btn  btn-circle btn-secondary",
                  selectedPage === 0 ? "btn-disabled" : ""
                )}
                onClick={() => setSelectedPage((p) => p - 1)}
              >
                {">"}
              </button>
            </div>
          )} */}
        </div>
      </section>
    </>
  );
};

const PositionRow = (props: {
  positionId: bigint;
  positionIndex: number;
  depositAmount: bigint;
  liquidatePrice: bigint;
  isLiquidated: boolean;
  isEarlyWithdraw: boolean;
  liqDuration?: string | null;
  canLiquidate?: boolean;
}) => {
  const {
    positionId: posId,
    positionIndex,
    depositAmount,
    isLiquidated,
    isEarlyWithdraw,
    liqDuration,
    liquidatePrice,
    canLiquidate,
  } = props;

  const { config: prepExitConfig, error: prepExitError } =
    usePrepareContractWrite({
      ...ngrGrowConfig,
      functionName: "earlyExit",
      args: [posId],
      enabled: !isLiquidated,
    });

  const { config: prepSelfLiqConfig, error: prepSelfLiqError } =
    usePrepareContractWrite({
      ...ngrGrowConfig,
      functionName: "liquidateSelf",
      args: [posId],
      enabled: !isLiquidated && canLiquidate,
    });

  const { write: exit, data: exitData } = useContractWrite(
    prepExitConfig || null
  );
  const { write: selfLiquidate, data: selfLiqData } = useContractWrite(
    prepSelfLiqConfig || null
  );
  const { isLoading: exitLoading } = useWaitForTransaction({
    hash: exitData?.hash,
    confirmations: 5,
  });
  const { isLoading: selfLiqLoading } = useWaitForTransaction({
    hash: selfLiqData?.hash,
    confirmations: 5,
  });

  return (
    <tr>
      <td className="text-center font-bold">
        {posId?.toLocaleString() || "-"}
      </td>
      <td className="text-right">
        {parseFloat(formatEther(depositAmount)).toLocaleString()}
      </td>
      <td
        className={classNames(
          "text-right",
          isEarlyWithdraw
            ? "text-error"
            : isLiquidated
            ? "text-primary text-xs"
            : "text-white/80"
        )}
      >
        {isEarlyWithdraw ? (
          parseFloat(formatEther((depositAmount * 92n) / 100n)).toLocaleString()
        ) : isLiquidated ? (
          parseFloat(
            formatEther((depositAmount * 106n) / 100n)
          ).toLocaleString()
        ) : canLiquidate ? (
          <button
            className={classNames(
              "btn btn-secondary btn-xs",
              selfLiqLoading ? "loading loading-spinner" : ""
            )}
            onClick={selfLiquidate}
            disabled={selfLiqLoading}
          >
            Profit
          </button>
        ) : (
          parseFloat(formatEther(liquidatePrice)).toLocaleString()
        )}
      </td>
      <td className={classNames("text-center")}>
        {liqDuration ? (
          "-"
        ) : (
          <button
            className={classNames(
              "btn btn-accent btn-xs",
              exitLoading ? "loading loading-spinner" : ""
            )}
            onClick={exit}
            disabled={exitLoading}
          >
            exit
          </button>
        )}
      </td>
    </tr>
  );
};

export const ActionsCard = (props: {
  refetchOther: () => void;
  tcv: bigint;
}) => {
  const { refetchOther, tcv } = props;
  const { address } = useAccount();
  const { data: usdtBalance, refetch: usdtRefetch } = useContractReads({
    contracts: [
      {
        address: TEST_USDT_ADDRESS,
        abi: erc20ABI,
        functionName: "balanceOf",
        args: [address || zeroAddress],
      },
      {
        address: TEST_USDT_ADDRESS,
        abi: erc20ABI,
        functionName: "allowance",
        args: [address || zeroAddress, growNGR],
      },
    ],
  });

  const [depositAmount, setDepositAmount] = useState(0);
  const [liquidateProfit, setLiquidateProfit] = useState(4);
  const [autoReinvest, setAutoReinvest] = useState(false);

  const { config: prepApproveConfig } = usePrepareContractWrite({
    address: TEST_USDT_ADDRESS,
    abi: erc20ABI,
    functionName: "approve",
    args: [growNGR, parseEther(`${1000000}`)],
    onSuccess: refetchOther,
  });

  const { config: depositConfig, error: prepDepositError } =
    usePrepareContractWrite({
      ...ngrGrowConfig,
      functionName: "deposit",
      args: [parseEther(`${depositAmount}`), liquidateProfit, autoReinvest],
      onSuccess: refetchOther,
    });

  const { write: deposit, data: depositData } = useContractWrite(
    depositConfig || null
  );
  const { write: approve, data: approveData } = useContractWrite(
    prepApproveConfig || null
  );
  const { isLoading: depositLoading } = useWaitForTransaction({
    hash: depositData?.hash,
    confirmations: 5,
  });
  const { isLoading: approveLoading } = useWaitForTransaction({
    hash: approveData?.hash,
    confirmations: 5,
  });

  const userUSDTBalance = (usdtBalance?.[0]?.result as bigint) || 0n;
  const approvedAmount = (usdtBalance?.[1]?.result as bigint) || 0n;
  const isApproved =
    approvedAmount >= parseEther(`${depositAmount}`) &&
    !(approvedAmount === 0n);

  useEffect(() => {
    const interval = setInterval(usdtRefetch, 10000);
    return () => clearInterval(interval);
  }, [usdtRefetch, address]);

  const maxDeposit =
    tcv < parseEther("1000")
      ? 100
      : parseInt(formatEther(tcv / 10n)) -
        (parseInt(formatEther(tcv / 10n)) % 10);

  return (
    <>
      <div className="text-white/90 px-4 pt-4 pb-2 rounded-lg border-2 border-black flex flex-col items-center bg-slate-800/80 mb-4">
        <div className="py-3 w-full flex flex-col items-center">
          <div className="join">
            <div className="form-control w-full join-item">
              <input
                className="input rounded-r-none input-primary w-full border-r-0 text-white"
                placeholder="Type Number"
                type="number"
                value={depositAmount}
                onChange={(e) => {
                  if (isNaN(e.target.valueAsNumber)) setDepositAmount(0);
                  else setDepositAmount(e.target.valueAsNumber);
                }}
                onFocus={(e) => e.target.select()}
                step={10}
              />
              <label className="label">
                <span className="label-text-alt  font-semibold">
                  Wallet USDT
                </span>
                <span className="label-text-alt ">
                  {parseFloat(formatEther(userUSDTBalance)).toLocaleString()}
                </span>
              </label>
            </div>
            <button
              className="btn btn-primary rounded-l-none"
              onClick={() => {
                setDepositAmount(maxDeposit);
              }}
            >
              Max
            </button>
          </div>
          <label className="label cursor-pointer">
            <span className="label-text pr-2 font-bold text-white/90">
              Auto reinvest
            </span>
            <input
              type="radio"
              name="reinvest"
              className="radio radio-primary radio-sm"
              checked={autoReinvest}
              onChange={() => setAutoReinvest((p) => !p)}
            />
          </label>
          <div className="w-full h-[1px] bg-white/80 my-2" />
          <div className="flex flex-row items-center gap-4 py-2">
            <div className="flex flex-col items-center">
              <input
                type="radio"
                name="profit"
                className="radio radio-primary radio-sm"
                checked={liquidateProfit == 4}
                onChange={() => setLiquidateProfit(4)}
              />
              <label className="label label-text">4%</label>
            </div>
            <div className="flex flex-col items-center">
              <input
                type="radio"
                name="profit"
                className="radio radio-primary radio-sm"
                checked={liquidateProfit == 5}
                onChange={() => setLiquidateProfit(5)}
              />
              <label className="label label-text">5%</label>
            </div>
            <div className="flex flex-col items-center">
              <input
                type="radio"
                name="profit"
                className="radio radio-primary radio-sm"
                checked={liquidateProfit == 6}
                onChange={() => setLiquidateProfit(6)}
              />
              <label className="label label-text">6%</label>
            </div>
            <div className="flex flex-col items-center">
              <input
                type="radio"
                name="profit"
                className="radio radio-primary radio-sm"
                checked={liquidateProfit == 7}
                onChange={() => setLiquidateProfit(7)}
              />
              <label className="label label-text">7%</label>
            </div>
            <div className="flex flex-col items-center">
              <input
                type="radio"
                name="profit"
                className="radio radio-primary radio-sm"
                checked={liquidateProfit == 8}
                onChange={() => setLiquidateProfit(8)}
              />
              <label className="label label-text">8%</label>
            </div>
          </div>
          {((depositAmount < 10 ||
            (depositAmount > maxDeposit && isApproved)) && (
            <>
              <span className="text-sm text-error">Min Deposit: 10 USDT</span>
              <span className="text-sm text-error">
                Only multiples of 10 with a max of{" "}
                {maxDeposit.toLocaleString(undefined, {
                  maximumFractionDigits: 0,
                })}{" "}
                USDT
              </span>
            </>
          )) ||
            null}

          <button
            className={classNames(
              "btn w-full md:max-w-[300px]",
              isApproved ? "btn-primary" : "btn-secondary",
              (isApproved && prepDepositError) ||
                depositLoading ||
                approveLoading
                ? "btn-disabled"
                : ""
            )}
            onClick={() => {
              isApproved ? deposit?.() : approve?.();
            }}
          >
            {depositLoading || approveLoading ? (
              <span className="loading loading-ring" />
            ) : isApproved ? (
              "deposit"
            ) : (
              "approve"
            )}
          </button>
        </div>
        <div className="flex flex-col items-center justify-center py-5 max-w-xs">
          <p className="text-xs whitespace-pre-line text-justify text-slate-400">
            Deposits are automatically liquidated (principal and interest) when
            the 6% profit target is met.{"\n"}Exiting before this automatic
            liquidation incurs a 6% penalty.
          </p>
        </div>
        {/* <button
          className={classNames(
            "btn w-full md:max-w-[300px] btn-accent",
            upkeepError ? "btn-disabled" : "",
            upkeepLoading ? "btn-loading loading-ring" : ""
          )}
          onClick={() => {
            upkeep?.();
          }}
        >
          Upkeep
        </button> */}
      </div>
    </>
  );
};
