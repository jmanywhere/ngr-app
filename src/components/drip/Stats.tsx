"use client";
import { dripGrowConfig, growConfig, testGrowConfig } from "@/data/contracts";
import { formatTokens } from "@/utils/stringify";
import { formatEther, parseEther, zeroAddress } from "viem";
import { useAccount, useContractReads } from "wagmi";

export default function DripStats() {
  const { data: statData } = useContractReads({
    contracts: [
      {
        ...dripGrowConfig,
        functionName: "totalDeposits",
      },
      {
        ...dripGrowConfig,
        functionName: "totalClaimed",
      },
      {
        ...dripGrowConfig,
        functionName: "activeDeposits",
      },
    ],
    watch: true,
  });
  const statsData = {
    deposits: statData?.[0].result as bigint | undefined,
    claimed: statData?.[1].result as bigint | undefined,
    activeDeposits: statData?.[2].result as bigint | undefined,
  };
  return (
    <div className="stats stats-vertical md:stats-horizontal shadow text-accent">
      <div className="stat">
        <p className="stat-title">Total Deposits</p>
        <p className="stat-value">{formatTokens(statsData.deposits)}</p>
        <p className="stat-desc">USDT</p>
      </div>
      <div className="stat">
        <p className="stat-title">Daily Payouts</p>
        <p className="stat-value">
          {formatTokens(((statsData.activeDeposits || 0n) * 5n) / 100_0n, 2)}
        </p>
        <p className="stat-desc">USDT</p>
      </div>
      <div className="stat">
        <p className="stat-title">Total Claimed</p>
        <p className="stat-value">{formatTokens(statsData.claimed, 4)}</p>
        <p className="stat-desc">USDT</p>
      </div>
    </div>
  );
}

export function DripUserStats() {
  const { address } = useAccount();
  const { data: userInfo } = useContractReads({
    contracts: [
      {
        ...dripGrowConfig,
        functionName: "users",
        args: [address || zeroAddress],
      },
      {
        ...dripGrowConfig,
        functionName: "liquidatorEarnings",
        args: [address || zeroAddress],
      },
      {
        ...testGrowConfig,
        functionName: "calculatePrice",
      },
    ],
    watch: true,
  });

  const { deposits, claimed, liquidatorEarnings, price, growAmount } = {
    //@ts-ignore
    deposits: userInfo?.[0].result?.[0] as bigint | undefined,
    //@ts-ignore
    claimed: userInfo?.[0].result?.[3] as bigint | undefined,
    liquidatorEarnings: userInfo?.[1].result as bigint | undefined,
    price: userInfo?.[2].result as bigint | undefined,
    //@ts-ignore
    growAmount: userInfo?.[0].result?.[1] as bigint | undefined,
  };

  console.log({ userInfo });
  const maxUSDTClaimable = ((deposits || 0n) * 5n) / 1000n;
  const growUsedPerMaxClaim =
    ((deposits || 0n) * 5n * parseEther("1") * 100n) /
    (1000n * 95n * (price || 1n));
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
          <p className="stat-value">{formatTokens(liquidatorEarnings)}</p>
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
          <p className="stat-title text-slate-300">Daily Claim</p>
          <p className="stat-value">
            {formatTokens(((deposits || 0n) * 5n) / 1000n, 2)}
          </p>
          <p className="stat-desc">USDT</p>
        </div>
        <div className="stat">
          <p className="stat-title text-slate-300">Max Claimable</p>
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
    </>
  );
}
