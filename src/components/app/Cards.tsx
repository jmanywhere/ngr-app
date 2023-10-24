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
import { Fragment, useCallback, useEffect, useMemo, useState } from "react";
import { formatEther, parseEther, zeroAddress } from "viem";
import classNames from "classnames";
import intervalToDuration from "date-fns/intervalToDuration";
import formatDuration from "date-fns/formatDuration";
import { BiSolidChevronDown } from "react-icons/bi";

import {
  TEST_USDT_ADDRESS,
  growNGR,
  growToken,
  ngrConfig,
  ngrGrowConfig,
  growConfig,
  usdtConfig,
} from "@/data/contracts";
import Link from "next/link";
import { useImmer } from "use-immer";

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
        ...ngrGrowConfig,
        functionName: "isLiquidator",
        args: [address || zeroAddress],
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
        ...ngrGrowConfig,
        functionName: "getUserMainPositions",
        args: [address || zeroAddress],
      },
      {
        ...ngrGrowConfig,
        functionName: "getUserPositionsInfo",
        args: [address || zeroAddress],
      },
      {
        ...ngrGrowConfig,
        functionName: "autoReinvest",
        args: [address || zeroAddress],
      },
    ],
  });

  console.log(ngrData);

  const statsData = useMemo(() => {
    return {
      tcv: (ngrData?.[0].result as bigint) || 0n, // uint256 == bigint 1 ether == 1000000000000000000
      isLiquidator: (ngrData?.[1].result || false) as boolean,
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
      isAutoReinvesting: (ngrData?.[12].result || false) as boolean,
      totalDeposits: (ngrData?.[4].result as bigint) || 0n,
      userMainPositions: ngrData?.[10].result || [],
      userPositionsInfo: (ngrData?.[11].result || []) as readonly {
        owner: `0x${string}`;
        depositTime: bigint;
        liqTime: bigint;
        amountDeposited: bigint;
        growAmount: bigint;
        liquidationPrice: bigint;
        liquidatedAmount: bigint;
        isLiquidated: boolean;
        early: boolean;
      }[],
    };
  }, [ngrData]);

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

  return (
    <>
      <div className="flex flex-col items-center">
        <div className="px-2 w-full">
          {statsData.isLiquidator ? (
            <div className="text-primary text-sm text-center bg-slate-600 px-2 py-1 rounded-t-2xl w-full uppercase">
              Valid Liquidator
            </div>
          ) : (
            <>
              <h4 className="text-center text-lg font-bold">
                Liquidator Progress
              </h4>
              <p className="text-center text-xs text-black">
                {parseInt(formatEther(statsData.userStats[0]))} / 50 USDT
              </p>
              <div className="main-progress h-6">
                <progress
                  className="w-full"
                  value={parseInt(formatEther(statsData.userStats[0]))}
                  max={50}
                />
              </div>
            </>
          )}
        </div>
        <div className="tabs tabs-boxed mb-2">
          <Link href="/app" className="tab bg-secondary text-white text-xl">
            Investor
          </Link>
          <Link
            href="/app/liquidators"
            className={classNames(
              "tab text-white text-xl",
              statsData.isLiquidator
                ? ""
                : "text-white/20 rounded-l-none px-1 pointer-events-none"
            )}
            onClick={(e) =>
              statsData.isLiquidator ? null : e.preventDefault()
            }
          >
            Liquidator
          </Link>
        </div>
      </div>
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
        </div>
      </section>
      <ActionsCard
        refetchOther={fullRefetch}
        tcv={statsData.tcv}
        isAutoReinvesting={statsData.isAutoReinvesting}
      />
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
      </section>
      <h2 className="w-full font-bold text-3xl drop-shadow text-secondary text-center">
        My Positions
      </h2>
      <section className="flex flex-col bg-slate-700/70 px-4 rounded-2xl py-4">
        {/* <div className="form-control flex flex-row items-center justify-center">
          <label className="label cursor-pointer">
            <span
              className={classNames(
                "label-text  text-lg pr-4 w-[90px]",
                showAll ? "text-white/20" : "text-white/80"
              )}
            >
              Pending
            </span>
            <input
              type="checkbox"
              className="toggle toggle-secondary"
              checked={showAll}
              onChange={() => setShowAll((p) => !p)}
            />
            <span
              className={classNames(
                "label-text pl-4 text-lg w-[90px]",
                showAll ? "text-white/80" : "text-white/20"
              )}
            >
              All
            </span>
          </label>
        </div> */}

        <div className="shadow text-slate-200 bg-slate-800 rounded-xl pt-1 max-w-[100vw] overflow-x-auto">
          <MainDepositCard />
        </div>
      </section>
    </>
  );
};

const PositionRow = (props: {
  positionId: bigint;
  depositAmount: bigint;
  growAmount: bigint;
  liquidatePrice: bigint;
  liquidateAmount: bigint;
  isLiquidated: boolean;
  isEarlyWithdraw: boolean;
  liqDuration?: string | null;
  canLiquidate?: boolean;
}) => {
  const {
    positionId: posId,
    depositAmount,
    growAmount,
    isLiquidated,
    isEarlyWithdraw,
    liqDuration,
    liquidatePrice,
    canLiquidate,
    liquidateAmount,
  } = props;

  const { config: prepExitConfig, error: prepExitError } =
    usePrepareContractWrite({
      ...ngrGrowConfig,
      functionName: "earlyExit",
      args: [posId],
      enabled: !isLiquidated,
    });

  const { write: exit, data: exitData } = useContractWrite(
    prepExitConfig || null
  );
  const { isLoading: exitLoading } = useWaitForTransaction({
    hash: exitData?.hash,
    confirmations: 5,
  });

  return (
    <tr>
      <td className="text-center font-bold">
        {posId?.toLocaleString() || "-"}
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
        {isEarlyWithdraw
          ? parseFloat(
              formatEther((depositAmount * 92n) / 100n)
            ).toLocaleString()
          : isLiquidated
          ? parseFloat(formatEther(liquidateAmount)).toLocaleString()
          : // canLiquidate ? (
            //   <button
            //     className={classNames(
            //       "btn btn-secondary btn-xs",
            //       selfLiqLoading ? "loading loading-spinner" : ""
            //     )}
            //     onClick={selfLiquidate}
            //     disabled={selfLiqLoading}
            //   >
            //     Profit
            //   </button>
            // ) :

            parseFloat(
              formatEther(
                (liquidatePrice * growAmount * 94n) / parseEther("100")
              )
            ).toLocaleString()}
      </td>
      <td className={classNames("text-center")}>
        {liqDuration || (
          <button
            className={classNames(
              "btn btn-warning btn-xs",
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
  isAutoReinvesting: boolean;
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
      args: [parseEther(`${depositAmount}`), autoReinvest],
      onSuccess: refetchOther,
    });
  const { config: reinvestConfig } = usePrepareContractWrite({
    ...ngrGrowConfig,
    functionName: "changeAutoReinvest",
    args: [!autoReinvest],
    onSuccess: refetchOther,
  });

  const { write: changeReinvest, data: reinvestData } = useContractWrite(
    reinvestConfig || null
  );
  const { write: deposit, data: depositData } = useContractWrite(
    depositConfig || null
  );

  const { write: approve, data: approveData } = useContractWrite(
    prepApproveConfig || null
  );
  const { isLoading: reinvestLoading } = useWaitForTransaction({
    hash: reinvestData?.hash,
    confirmations: 5,
  });
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

  const maxDeposit = 25;

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
          {((depositAmount < 10 ||
            (depositAmount > maxDeposit && isApproved)) && (
            <>
              <span className="text-sm text-error">Min Deposit: 10 USDT</span>
              <span className="text-sm text-error">
                Max of{" "}
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
              "btn w-full md:max-w-[300px] mt-2",
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
            Deposits are eligible for liquidation (principal and interest) when
            the 6% profit target is met.{"\n"}Exiting before this automatic
            liquidation incurs a 8% penalty.
          </p>
        </div>
        <div className="flex flex-col items-center">
          <h5>Is AutoReinvesting?</h5>
          <div>
            <input
              type="checkbox"
              className={classNames(
                "toggle toggle-primary",
                reinvestLoading ? "pointer-events-none" : ""
              )}
              checked={props.isAutoReinvesting}
              onChange={() => {
                changeReinvest?.();
              }}
            />
            <span
              className={reinvestLoading ? "loading loading-ring" : "hidden"}
            />
          </div>
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

const MainDepositCard = () => {
  const { address } = useAccount();
  const { data: userMainPositions } = useContractRead({
    ...ngrGrowConfig,
    functionName: "getUserMainPositions",
    args: [address || zeroAddress],
    watch: true,
  });
  const [selectedMainDeposit, setSelectedMainDeposit] = useImmer<Array<number>>(
    []
  );

  return (
    <table className="table table-zebra">
      <thead>
        <th>#</th>
        <th>Deposit</th>
        <th className="text-right">Liquidate Price</th>
        <td />
      </thead>
      <tbody>
        {userMainPositions?.map((position, index) => {
          const isOpen = selectedMainDeposit.includes(index);
          return (
            <Fragment key={`main-positions-${index}`}>
              <tr key={`main-positions-${index}`}>
                <td>
                  {(position.positionId + 1n).toLocaleString(undefined, {
                    maximumFractionDigits: 0,
                  })}
                </td>
                <td className="text-right">
                  {parseFloat(formatEther(position.mainDeposit)).toLocaleString(
                    undefined,
                    {
                      maximumFractionDigits: 0,
                    }
                  )}
                </td>
                <td className="text-right">
                  {parseFloat(
                    formatEther(position.liquidationStartPrice)
                  ).toLocaleString(undefined, {
                    maximumFractionDigits: 6,
                  })}
                </td>
                <td>
                  <button
                    className={classNames(
                      "btn btn-circle btn-sm transition-all duration-300",
                      isOpen ? "rotate-180" : ""
                    )}
                    onClick={() =>
                      setSelectedMainDeposit((draft) => {
                        const depositIndex = draft.indexOf(index);
                        if (depositIndex === -1) draft.push(index);
                        else draft.splice(depositIndex, 1);
                      })
                    }
                  >
                    <BiSolidChevronDown />
                  </button>
                </td>
              </tr>
              <tr className={"h-0 overflow-hidden"}>
                <td className="h-0 p-0 bg-slate-500" />
                <td
                  colSpan={4}
                  className={classNames(
                    "bg-slate-600 p-0 overflow-hidden",
                    isOpen ? "py-2" : ""
                  )}
                >
                  <table
                    className={classNames(
                      "table table-zebra",
                      isOpen ? "" : "hidden"
                    )}
                  >
                    <thead className="text-primary-focus">
                      <th>Position</th>
                      <th>End Liquidation</th>
                      <th />
                    </thead>
                    <PositionsTableBody
                      open={isOpen}
                      startPosition={position.positionId}
                      endPosition={position.positionId}
                    />
                  </table>
                </td>
              </tr>
              <tr />
            </Fragment>
          );
        })}
      </tbody>
    </table>
  );
};

const PositionsTableBody = (props: {
  open: boolean;
  startPosition: bigint;
  endPosition: bigint;
}) => {
  const { data: segmentedPositions, isLoading } = useContractRead({
    ...ngrGrowConfig,
    functionName: "getPositions",
    args: [props.startPosition, props.endPosition - props.startPosition + 1n],
    enabled: props.open,
    scopeKey: `positions-${props.startPosition.toString()}-${props.endPosition.toString()}`,
  });
  const { data: currentPrice } = useContractRead({
    ...growConfig,
    functionName: "calculatePrice",
    enabled: props.open,
  });

  console.log({ props, segmentedPositions });
  return (
    <tbody>
      {!open || isLoading ? (
        <tr>
          <td colSpan={4}>
            <div className="loading loading-bars loading-lg" />
          </td>
        </tr>
      ) : (
        segmentedPositions?.map((position, index) => {
          return (
            <PositionRow
              key={`position-row-info-${props.startPosition}-${index}`}
              positionId={props.startPosition + BigInt(index)}
              depositAmount={position.amountDeposited}
              growAmount={position.growAmount}
              isEarlyWithdraw={position.early}
              liquidatePrice={position.liquidationPrice}
              isLiquidated={position.isLiquidated}
              liquidateAmount={
                position.liquidatedAmount ||
                (position.growAmount * position.liquidationPrice * 96n) /
                  parseEther("100")
              }
              canLiquidate={
                position.liquidationPrice <
                (currentPrice || parseEther("1000000"))
              }
              liqDuration={
                position.isLiquidated
                  ? formatDuration(
                      intervalToDuration({
                        start: parseInt(position.depositTime.toString()) * 1000,
                        end: parseInt(position.liqTime.toString()) * 1000,
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
        })
      )}
    </tbody>
  );
};
