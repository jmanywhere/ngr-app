"use client";

import {
  growConfig,
  growToken,
  usdtConfig,
  testGrowConfig,
  testUSDTConfig,
  growTestToken,
  ngrGrowConfig,
  ngrContract,
  growNGR,
} from "@/data/contracts";
import { formatTokens } from "@/utils/stringify";
import { useContractReads } from "wagmi";

export default function GrowStats() {
  const { data: growData } = useContractReads({
    contracts: [
      {
        ...testGrowConfig,
        functionName: "totalSupply",
      },
      {
        ...testUSDTConfig,
        functionName: "balanceOf",
        args: [growTestToken],
      },
      {
        ...testGrowConfig,
        functionName: "calculatePrice",
      },
    ],
    watch: true,
  });
  const { price, usdt, supply } = {
    price: growData?.[2].result as bigint | undefined,
    usdt: growData?.[1].result as bigint | undefined,
    supply: growData?.[0].result as bigint | undefined,
  };
  return (
    <div className="stats stats-vertical md:stats-horizontal shadow text-primary">
      <div className="stat">
        <p className="stat-title">Price</p>
        <p className="stat-value">{formatTokens(price, 10)}</p>
        <p className="stat-desc">USDT</p>
      </div>
      <div className="stat">
        <p className="stat-title">TVL</p>
        <p className="stat-value">{formatTokens(usdt, 2)}</p>
        <p className="stat-desc">USDT</p>
      </div>
      <div className="stat">
        <p className="stat-title">Supply</p>
        <p className="stat-value">{formatTokens(supply, 2)}</p>
        <p className="stat-desc">Grow</p>
      </div>
    </div>
  );
}

export function FixedNGRStats(props: { liquidationDeposits: string }) {
  const { data: ngrData } = useContractReads({
    contracts: [
      {
        ...ngrGrowConfig,
        functionName: "totalDeposits",
      },
      {
        ...ngrGrowConfig,
        functionName: "totalLiquidations",
      },
      {
        ...growConfig,
        functionName: "balanceOf",
        args: [growNGR],
      },
    ],
    watch: true,
  });
  const { deposits, liquidations, supply } = {
    deposits: (ngrData?.[0].result || 0n) as bigint,
    liquidations: ngrData?.[1].result as bigint | undefined,
    supply: ngrData?.[2].result as bigint | undefined,
  };
  return (
    <div className="stats stats-vertical md:stats-horizontal shadow text-blue-400">
      <div className="stat">
        <p className="stat-title">Investments</p>
        <p className="stat-value">
          {formatTokens(deposits + BigInt(props.liquidationDeposits), 10)}
        </p>
        <p className="stat-desc">USDT</p>
      </div>
      <div className="stat">
        <p className="stat-title">Liquidations</p>
        <p className="stat-value">{formatTokens(liquidations, 2)}</p>
        <p className="stat-desc">USDT</p>
      </div>
      <div className="stat">
        <p className="stat-title">Total</p>
        <p className="stat-value">{formatTokens(supply, 2)}</p>
        <p className="stat-desc">GROW</p>
      </div>
    </div>
  );
}
