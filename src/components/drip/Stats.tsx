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
    ],
    watch: true,
  });
  return (
    <div className="stats stats-vertical md:stats-horizontal shadow text-accent">
      <div className="stat">
        <p className="stat-title">Total Deposits</p>
        <p className="stat-value">{formatTokens(statData?.[0].result)}</p>
        <p className="stat-desc">USDT</p>
      </div>
      <div className="stat">
        <p className="stat-title">Daily Payouts</p>
        <p className="stat-value">
          {formatTokens(((statData?.[0].result || 0n) * 5n) / 100_0n, 2)}
        </p>
        <p className="stat-desc">USDT</p>
      </div>
      <div className="stat">
        <p className="stat-title">Total Claimed</p>
        <p className="stat-value">
          {formatTokens(statData?.[1].result || 0n, 4)}
        </p>
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
  return (
    <div className="stats stats-vertical md:stats-horizontal shadow text-accent bg-emerald-900">
      <div className="stat">
        <p className="stat-title text-slate-300">Deposits</p>
        <p className="stat-value">{formatTokens(userInfo?.[0].result?.[0])}</p>
        <p className="stat-desc">USDT</p>
      </div>
      <div className="stat">
        <p className="stat-title text-slate-300">Claimed</p>
        <p className="stat-value">
          {formatTokens(userInfo?.[0].result?.[3], 6)}
        </p>
        <p className="stat-desc">USDT</p>
      </div>
      <div className="stat">
        <p className="stat-title text-slate-300">Liq. Rewards</p>
        <p className="stat-value">{formatTokens(userInfo?.[1].result)}</p>
        <p className="stat-desc">USDT</p>
      </div>
      <div className="stat">
        <p className="stat-title text-slate-300">Daily Claim</p>
        <p className="stat-value">
          {formatTokens(((userInfo?.[0].result?.[0] || 0n) * 5n) / 1000n, 2)}
        </p>
        <p className="stat-desc">USDT</p>
      </div>
      <div className="stat">
        <p className="stat-title text-slate-300">Total Claimable</p>
        <p className="stat-value">
          {formatTokens(
            ((userInfo?.[0].result?.[1] || 0n) * (userInfo?.[2].result || 0n)) /
              parseEther("1")
          )}
        </p>
        <p className="stat-desc">USDT</p>
      </div>
    </div>
  );
}
