"use client";

import { Web3Button } from "@web3modal/react";
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
import NgrAbi from "@/abi/NGR2";
import { useCallback, useEffect, useMemo, useState } from "react";
import { formatEther, parseEther, zeroAddress } from "viem";
import classNames from "classnames";
import intervalToDuration from "date-fns/intervalToDuration";
import formatDuration from "date-fns/formatDuration";

const ngrContract = "0xdF74201FA9a6CbCa27ef5cD4c95C617A38A4DF20";
const TEST_USDT_ADDRESS = "0xb6d07d107ff8e26a21e497bf64c3239101fed3cf";
const USDT_ADDRESS = "0x55d398326f99059fF775485246999027B3197955";

const ngrConfig = {
  address: ngrContract,
  abi: NgrAbi,
} as const;

const usdtConfig = {
  address: TEST_USDT_ADDRESS,
  abi: erc20ABI,
} as const;

export const StatsCard = () => {
  const { address } = useAccount();
  const { data: ngrData, refetch: ngrDataRefetch } = useContractReads({
    contracts: [
      {
        ...usdtConfig,
        functionName: "balanceOf",
        args: [ngrContract],
      },
      // {
      //   ...ngrConfig,
      //   functionName: "TCV",
      // },
      {
        ...ngrConfig,
        functionName: "cycleCounter",
      },
      {
        ...ngrConfig,
        functionName: "helixPrice",
        // functionName: "currentHelixPrice",
      },
      {
        ...ngrConfig,
        functionName: "liquidationsCounter",
        // functionName: "liquidationCounter",
      },
      {
        ...ngrConfig,
        functionName: "depositCounter",
        // functionName: "totalPositions",
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
        ...ngrConfig,
        functionName: "getUserPositions",
        args: [address || zeroAddress],
      },
      {
        ...ngrConfig,
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
    ],
  });

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
      userStats: (ngrData?.[8].result as bigint[]) || new Array(7).fill(0n),
      totalDeposits: (ngrData?.[9].result as bigint) || 0n,
      totalLiquidations: (ngrData?.[10].result as bigint) || 0n,
    };
  }, [ngrData]);
  console.log({ ...statsData });

  const { data: positionData, refetch: positionRefetch } = useContractRead({
    ...ngrConfig,
    functionName: "positions",
    args: [statsData.userStats[6] || 0n],
  });

  const [selectedPage, setSelectedPage] = useState(0);

  const {
    data: positionsData,
    fetchNextPage,
    refetch: positionsRefetch,
    isLoading: positionsLoading,
  } = useContractInfiniteReads({
    cacheKey: "user_positions_1",
    ...paginatedIndexesConfig(
      (index: number) => {
        if (index >= statsData.totalUserPositions.length)
          return [] as readonly any[];
        const positionToGet =
          statsData.totalUserPositions[parseInt(index.toString())];
        return [
          {
            ...ngrConfig,
            functionName: "positions",
            args: [positionToGet],
          },
        ];
      },
      {
        start: statsData.totalUserPositions.length - 1,
        perPage: 10,
        direction: "decrement",
      }
    ),
  });

  const fullRefetch = useCallback(() => {
    ngrDataRefetch();
    positionRefetch();
    positionsRefetch();
  }, [ngrDataRefetch, positionRefetch, positionsRefetch]);

  useEffect(() => {
    const interval = setInterval(() => {
      fullRefetch();
    }, 10000);
    return () => clearInterval(interval);
  }, [fullRefetch]);

  console.log({ positionsData });
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
            <p className="stat-desc text-slate-500">Total Made USDT</p>
          </div>
          <div className="stat">
            <p className="stat-title text-slate-400">Payouts</p>
            <p className="stat-value">
              {parseFloat(
                formatEther(statsData.totalLiquidations)
              ).toLocaleString()}
            </p>
            <p className="stat-desc text-slate-500">
              Total Principal + Interest USDT
            </p>
          </div>
          <div className="stat">
            <p className="stat-title text-slate-400">Liquidations</p>
            <p className="stat-value">
              {statsData.liquidations.toLocaleString()}
            </p>
            <p className="stat-desc text-slate-500">Total Liquidations Made</p>
          </div>
        </div>
        <div className="stats stats-vertical md:stats-horizontal shadow text-primary bg-slate-900 ">
          <div className="stat">
            <p className="stat-title text-slate-400">Helix Price</p>
            <p className="stat-value">
              {parseFloat(formatEther(statsData.helixPrice)).toLocaleString()}
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
          <div className="stat">
            <p className="stat-title text-slate-400">Cycle</p>
            <p className="stat-value">
              {statsData.cycleCounter.toLocaleString()}
            </p>
            <div className="stat-desc text-slate-500">
              Times Price has reset
            </div>
          </div>
        </div>
      </section>
      <ActionsCard refetchOther={fullRefetch} />
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
            <p className="stat-title text-slate-300">Last Liq.</p>
            <p className="stat-value">
              {parseFloat(
                formatEther(((positionData?.[1] || 0n) * 106n) / 100n)
              ).toLocaleString()}
            </p>
            <div className="stat-desc text-slate-400">USDT</div>
          </div>
        </div>
        <div className="stats stats-vertical md:stats-horizontal shadow text-accent bg-emerald-800 ">
          <div className="stat">
            <p className="stat-title text-slate-300">Total</p>
            <p className="stat-value">
              {statsData.userStats[3].toLocaleString()}
            </p>
            <div className="stat-desc text-slate-400">Total deposits</div>
          </div>
          {/* <div className="stat">
            <p className="stat-title text-slate-300">Active</p>
            <p className="stat-value">
              {(
                statsData.userStats[3] -
                statsData.userStats[4] -
                statsData.userStats[5]
              ).toLocaleString()}
            </p>
            <div className="stat-desc text-slate-400">Deposits Pending</div>
          </div> */}
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
        </div>
      </section>
      <section className="flex flex-col">
        <h2 className="w-full font-bold text-3xl drop-shadow text-secondary text-center">
          Positions
        </h2>
        <h3 className="w-full font-bold text-lg drop-shadow text-secondary text-center">
          Next to Liquidate:{" "}
          {statsData.currentUserPendingLiquidation.toLocaleString()}
        </h3>
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
              {positionsData?.pages?.[selectedPage]?.map(
                (positionInfo, positionIndex) => {
                  const totalLength = statsData.totalUserPositions.length;
                  if (totalLength == 0)
                    return (
                      <tr>
                        <td className="text-center" colSpan={4}>
                          No positions
                        </td>
                      </tr>
                    );
                  const parsedInfo = {
                    deposit: (positionInfo?.result as bigint[])?.[1] || 0n,
                    depositTime: new Date(
                      parseInt(
                        (
                          (positionInfo?.result as bigint[])?.[2] || 0n
                        ).toString()
                      )
                    ),
                    liquidatedTime: new Date(
                      parseInt(
                        (
                          (positionInfo?.result as bigint[])?.[3] || 0n
                        ).toString()
                      )
                    ),
                    isLiquidated: (positionInfo?.result as bigint[])?.[3] > 1n,
                    early: (positionInfo?.result as bigint[])?.[3] === 1n,
                  };
                  const posId =
                    statsData.totalUserPositions[
                      totalLength - 1 - positionIndex - selectedPage * 10
                    ];
                  const posIndex =
                    totalLength - 1 - positionIndex - selectedPage * 10;

                  console.log({ positionInfo });
                  return (
                    <PositionRow
                      key={`position-${posId}-page-${selectedPage}`}
                      positionId={posId}
                      positionIndex={posIndex}
                      depositAmount={parsedInfo.deposit}
                      isEarlyWithdraw={parsedInfo.early}
                      isLiquidated={parsedInfo.isLiquidated}
                      liqDuration={
                        parsedInfo.isLiquidated
                          ? formatDuration(
                              intervalToDuration({
                                start: parsedInfo.depositTime,
                                end: parsedInfo.liquidatedTime,
                              }),
                              { format: ["y", "M", "d", "h", "m", "s"] }
                            )
                          : null
                      }
                    />
                  );
                }
              )}
            </tbody>
          </table>
          {statsData.totalUserPositions.length > 10 && (
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
                    console.log("here");
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
          )}
        </div>
      </section>
    </>
  );
};

const PositionRow = (props: {
  positionId: bigint;
  positionIndex: number;
  depositAmount: bigint;
  isLiquidated: boolean;
  isEarlyWithdraw: boolean;
  liqDuration?: string | null;
}) => {
  const {
    positionId: posId,
    positionIndex,
    depositAmount,
    isLiquidated,
    isEarlyWithdraw,
    liqDuration,
  } = props;

  // const { config: prepExitConfig, error: prepExitError } =
  //   usePrepareContractWrite({
  //     ...ngrConfig,
  //     functionName: "earlyWithdraw",
  //     enabled: !isLiquidated,
  //   });

  // const { write: exit, data: exitData } = useContractWrite(
  //   prepExitConfig || null
  // );
  // const { isLoading: exitLoading } = useWaitForTransaction({
  //   hash: exitData?.hash,
  //   confirmations: 15,
  // });

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
          isEarlyWithdraw ? "text-error" : "",
          isEarlyWithdraw || isLiquidated ? "" : "text-primary text-xs"
        )}
      >
        {isEarlyWithdraw
          ? parseFloat(
              formatEther((depositAmount * 94n) / 100n)
            ).toLocaleString()
          : isLiquidated
          ? parseFloat(
              formatEther((depositAmount * 106n) / 100n)
            ).toLocaleString()
          : "Pending"}
      </td>
      <td className={classNames("text-center")}>
        {liqDuration || "-"}
        {/* {isLiquidated || !isLast || Boolean(prepExitError) ? (
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
        )} */}
      </td>
    </tr>
  );
};

export const ActionsCard = (props: { refetchOther: () => void }) => {
  const { refetchOther } = props;
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
        args: [address || zeroAddress, ngrContract],
      },
      {
        ...ngrConfig,
        functionName: "canLiquidate",
      },
    ],
  });

  const [depositAmount, setDepositAmount] = useState(0);

  const { config: prepApproveConfig } = usePrepareContractWrite({
    address: TEST_USDT_ADDRESS,
    abi: erc20ABI,
    functionName: "approve",
    args: [ngrContract, parseEther(`${1_000_000}`)],
    onSuccess: refetchOther,
  });

  const { config: depositConfig, error: prepDepositError } =
    usePrepareContractWrite({
      ...ngrConfig,
      functionName: "deposit",
      args: [parseEther(`${depositAmount}`)],
      onSuccess: refetchOther,
    });
  const { config: upkeepConfig, error: upkeepError } = usePrepareContractWrite({
    ...ngrConfig,
    functionName: "liquidate",
    onSuccess: refetchOther,
  });

  const { write: deposit, data: depositData } = useContractWrite(
    depositConfig || null
  );
  const { write: approve, data: approveData } = useContractWrite(
    prepApproveConfig || null
  );
  const { write: upkeep, data: upkeepData } = useContractWrite(
    upkeepConfig || null
  );
  const { isLoading: depositLoading } = useWaitForTransaction({
    hash: depositData?.hash,
    confirmations: 5,
  });
  const { isLoading: approveLoading } = useWaitForTransaction({
    hash: approveData?.hash,
    confirmations: 5,
  });
  const { isLoading: upkeepLoading } = useWaitForTransaction({
    hash: upkeepData?.hash,
    confirmations: 5,
  });

  const userUSDTBalance = (usdtBalance?.[0]?.result as bigint) || 0n;
  const approvedAmount = (usdtBalance?.[1]?.result as bigint) || 0n;
  const isApproved =
    approvedAmount >= parseEther(`${depositAmount}`) &&
    !(approvedAmount === 0n);

  console.log(prepDepositError);

  useEffect(() => {
    const interval = setInterval(usdtRefetch, 10000);
    return () => clearInterval(interval);
  }, [usdtRefetch, address]);

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
            {/* <div className="form-control join-item ">
              <label className="label cursor-pointer border-y-primary border-y-[1px] py-[11px]">
                <input type="checkbox" className="checkbox checkbox-primary" />
              </label>
            </div> */}
            <button
              className="btn btn-primary rounded-l-none"
              onClick={() => {
                if (userUSDTBalance > parseEther("500")) setDepositAmount(500);
                else setDepositAmount(parseFloat(formatEther(userUSDTBalance)));
              }}
            >
              Max
            </button>
          </div>
          {((depositAmount < 100 || (depositAmount > 500 && isApproved)) && (
            <>
              <span className="text-sm text-error">Min Deposit: 100 USDT</span>
              <span className="text-sm text-error">Max Deposit: 500 USDT</span>
            </>
          )) ||
            null}
          <button
            className={classNames(
              "btn w-full md:max-w-[300px]",
              isApproved ? "btn-primary" : "btn-secondary",
              isApproved && prepDepositError ? "btn-disabled" : "",
              depositLoading || approveLoading ? "btn-loading loading-ring" : ""
            )}
            onClick={() => {
              isApproved ? deposit?.() : approve?.();
            }}
          >
            {isApproved ? "deposit" : "approve"}
          </button>
        </div>
        <div className="flex flex-col items-center justify-center py-5 max-w-xs">
          <p className="text-xs whitespace-pre-line text-justify text-slate-400">
            Deposits are automatically liquidated (principal and interest) when
            the 6% profit target is met.{"\n"}Exiting before this automatic
            liquidation incurs a 6% penalty.
          </p>
        </div>
        <button
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
        </button>
      </div>
    </>
  );
};
