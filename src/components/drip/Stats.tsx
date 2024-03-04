"use client";
import { dripGrowConfig, dripNGR, growConfig, pDrip, pGrowToken } from "@/data/contracts";
import { formatTokens } from "@/utils/stringify";
import { formatEther, parseEther, zeroAddress } from "viem";
import { useAccount, useChainId, useContractReads } from "wagmi";
import intervalToDuration from "date-fns/intervalToDuration";
import { useEffect, useState } from "react";

export default function DripStats() {
  const { data: statData } = useContractReads({
    contracts: [
      {
        ...dripGrowConfig,
        functionName: "totalDeposits",
        chainId: 56,
      },
      {
        ...dripGrowConfig,
        functionName: "totalClaimed",
        chainId: 56,
      },
      {
        ...dripGrowConfig,
        functionName: "activeDeposits",
        chainId: 56,
      },
      {
        ...growConfig,
        functionName: "balanceOf",
        args: [dripNGR],
        chainId: 56,
      },
      {
        ...dripGrowConfig,
        address: pDrip,
        functionName: "totalDeposits",
        chainId: 369,
      },
      {
        ...dripGrowConfig,
        address: pDrip,
        functionName: "totalClaimed",
        chainId: 369,
      },
      {
        ...dripGrowConfig,
        address: pDrip,
        functionName: "activeDeposits",
        chainId: 369,
      },
      {
        ...growConfig,
        address: pGrowToken,
        functionName: "balanceOf",
        args: [pDrip],
        chainId: 369,
      },
    ],
    watch: true,
  });
  const statsData = {
    deposits: (statData?.[0].result as bigint | undefined || 0n) + (statData?.[4].result as bigint | undefined || 0n),
    claimed: (statData?.[1].result as bigint | undefined || 0n) + (statData?.[5].result as bigint | undefined || 0n),
    activeDeposits: (statData?.[2].result as bigint | undefined || 0n) + (statData?.[6].result as bigint | undefined || 0n),
    growInDrip: (statData?.[3].result as bigint | undefined || 0n) + (statData?.[7].result as bigint | undefined || 0n),
  };
  return (
    <div className="stats stats-vertical md:stats-horizontal shadow text-accent">
      <div className="stat">
        <p className="stat-title">Total Deposits</p>
        <p className="stat-value">{formatTokens(statsData.deposits)}</p>
        <p className="stat-desc">USD</p>
      </div>
      <div className="stat">
        <p className="stat-title">Daily Payouts</p>
        <p className="stat-value">
          {formatTokens(((statsData.activeDeposits || 0n) * 5n) / 100_0n, 2)}
        </p>
        <p className="stat-desc">USD</p>
      </div>
      <div className="stat">
        <p className="stat-title">Total Claimed</p>
        <p className="stat-value">{formatTokens(statsData.claimed, 4)}</p>
        <p className="stat-desc">USD</p>
      </div>
      <div className="stat">
        <p className="stat-title">Total</p>
        <p className="stat-value">{formatTokens(statsData.growInDrip, 4)}</p>
        <p className="stat-desc">GROW</p>
      </div>
    </div>
  );
}

export function DripUserStats() {
  const [currentTime, setCurrentTime] = useState(new Date().getTime());
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date().getTime());
    }, 1000);
    return () => clearInterval(interval);
  }, [setCurrentTime]);
  const { address } = useAccount();
  const chainId = useChainId();
  const { data: userInfo } = useContractReads({
    contracts: [
      {
        ...dripGrowConfig,
        address: chainId === 56 ? dripGrowConfig.address : pDrip,
        functionName: "users",
        args: [address || zeroAddress],
      },
      {
        ...dripGrowConfig,
        address: chainId === 56 ? dripGrowConfig.address : pDrip,
        functionName: "liquidatorEarnings",
        args: [address || zeroAddress],
      },
      {
        ...growConfig,
        address: chainId === 56 ? growConfig.address : pGrowToken,
        functionName: "calculatePrice",
      },
    ],
    watch: true,
  });

  const {
    deposits,
    claimed,
    liquidatorEarnings,
    price,
    growAmount,
    lastAction,
  } = {
    //@ts-ignore
    deposits: userInfo?.[0].result?.[0] as bigint | undefined,
    //@ts-ignore
    claimed: userInfo?.[0].result?.[3] as bigint | undefined,
    liquidatorEarnings: userInfo?.[1].result as bigint | undefined,
    price: userInfo?.[2].result as bigint | undefined,
    //@ts-ignore
    growAmount: userInfo?.[0].result?.[1] as bigint | undefined,
    //@ts-ignore
    lastAction: userInfo?.[0].result?.[2] as bigint | undefined,
  };

  const maxUSDTClaimable = ((deposits || 0n) * 5n) / 1000n;
  const growUsedPerMaxClaim =
    ((deposits || 0n) * 5n * parseEther("1") * 100n) /
    (1000n * 95n * (price || 1n));

  const timeUntilMaxClaim = intervalToDuration({
    start: currentTime,
    end: parseInt(((lastAction || 0n) + 86400n).toString()) * 1000,
  });
  return (
    <>
      <div className="stats stats-vertical md:stats-horizontal shadow text-primary ">
        <div className="stat">
          <p className="stat-title text-slate-300">Grow Price</p>
          <p className="stat-value">{formatTokens(price, 6)}</p>
          <p className="stat-desc">USDT</p>
        </div>
        <div className="stat">
          <p className="stat-title text-slate-300">User Grow</p>
          <p className="stat-value text-blue-400">
            {formatTokens(growAmount, 2)}
          </p>
          <p className="stat-desc">GROW</p>
        </div>
      </div>
      <div className="stats stats-vertical md:stats-horizontal shadow text-accent bg-emerald-900">
        <div className="stat">
          <p className="stat-title text-slate-300">Deposits</p>
          <p className="stat-value">{formatTokens(deposits)}</p>
          <p className="stat-desc">USDT</p>
        </div>
        <div className="stat">
          <p className="stat-title text-slate-300">Claimed</p>
          <p className="stat-value">{formatTokens(claimed, 6)}</p>
          <p className="stat-desc">USDT</p>
        </div>
        <div className="stat">
          <p className="stat-title text-slate-300">Liq. Rewards</p>
          <p className="stat-value">{formatTokens(liquidatorEarnings, 3)}</p>
          <p className="stat-desc">USDT</p>
        </div>
      </div>
      <div className="stats stats-vertical md:stats-horizontal shadow text-accent bg-fuchsia-900">
        <div className="stat">
          <p className="stat-title text-slate-300">Quit Value</p>
          <p className="stat-value text-rose-400">
            {formatTokens(
              ((growAmount || 0n) * (price || 0n) * 85n) / parseEther("100"),
              2
            )}
          </p>
          <p className="stat-desc text-slate-300">USDT</p>
        </div>
        <div className="stat">
          <p className="stat-title text-slate-300">Max Daily</p>
          <p className="stat-value">
            {formatTokens(((deposits || 0n) * 5n) / 1000n, 2)}
          </p>
          <p className="stat-desc">USDT</p>
        </div>
        <div className="stat">
          <p className="stat-title text-slate-300">Current Max Value</p>
          <p className="stat-value">
            {formatTokens(
              ((growAmount || 0n) * maxUSDTClaimable) /
                (growUsedPerMaxClaim || 1n),
              10
            )}
          </p>
          <p className="stat-desc">USDT</p>
        </div>
      </div>
      <div>
        <h4>Time until max claimable: </h4>
        <div className="stats bg-transparent text-black">
          <div className="stat">
            <p className="stat-value countdown">
              <span
                style={
                  {
                    "--value": timeUntilMaxClaim.hours,
                  } as any
                }
              />
            </p>
            <p className="stat-desc text-black">Hours</p>
          </div>
          <div className="stat">
            <p className="stat-value countdown">
              <span
                style={
                  {
                    "--value": timeUntilMaxClaim.minutes,
                  } as any
                }
              />
            </p>
            <p className="stat-desc text-black">Minutes</p>
          </div>
          <div className="stat">
            <p className="stat-value countdown">
              <span
                style={
                  {
                    "--value": timeUntilMaxClaim.seconds,
                  } as any
                }
              />
            </p>
            <p className="stat-desc text-black">Seconds</p>
          </div>
        </div>
      </div>
    </>
  );
}
