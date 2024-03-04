"use client";

import {
  growConfig,
  growToken,
  usdtConfig,
  ngrGrowConfig,
  growNGR,
  pGrowToken,
  DAI,
  pNGR,
} from "@/data/contracts";
import { formatTokens } from "@/utils/stringify";
import { useChainId, useContractReads } from "wagmi";

export default function GrowStats() {
  const chainId = useChainId();
  const { data: growData } = useContractReads({
    contracts: [
      {
        ...growConfig,
        functionName: "totalSupply",
        address: growToken,
        chainId: 56,
      },
      {
        ...usdtConfig,
        functionName: "balanceOf",
        args: [growToken],
        chainId: 56,
      },
      {
        ...growConfig,
        functionName: "calculatePrice",
        address: growToken,
        chainId: 56
        
      },
      {
        ...growConfig,
        functionName: "calculatePrice",
        address: pGrowToken,
        chainId: 369
      },
      {
        ...usdtConfig,
        functionName: "balanceOf",
        args: [pGrowToken],
        address: DAI,
        chainId: 369,
      },
      {
        ...growConfig,
        functionName: "totalSupply",
        address: pGrowToken,
        chainId: 369,
      },
    ],
    watch: true,
  });
  const { price, usdt, supply, pricePLS, pSupply } = {
    pricePLS: growData?.[3].result as bigint | undefined,
    price: growData?.[2].result as bigint | undefined,
    usdt: ((growData?.[1].result as bigint | undefined) || 0n) + ((growData?.[4].result as bigint | undefined) || 0n),
    supply: growData?.[0].result as bigint | undefined,
    pSupply: growData?.[5].result as bigint | undefined,
  };
  console.log({usdt, ...growData})
  return (
    <div className="stats stats-vertical md:stats-horizontal shadow text-primary">
      <div className="stat">
        <p className="stat-title">Price BSC</p>
        <p className="stat-value">{formatTokens(price, 10)}</p>
        <p className="stat-desc">USD</p>
      </div>
      <div className="stat">
        <p className="stat-title">Price PLS</p>
        <p className="stat-value">{formatTokens(pricePLS, 10)}</p>
        <p className="stat-desc">USD</p>
      </div>
      <div className="stat">
        <p className="stat-title">TVL</p>
        <p className="stat-value">{formatTokens(usdt, 2)}</p>
        <p className="stat-desc">USD</p>
      </div>
      <div className="stat">
        <p className="stat-title">Supply</p>
        <p className="stat-value">{formatTokens(supply, 2)}</p>
        <p className="stat-desc">BSC Grow</p>
      </div>
      <div className="stat">
        <p className="stat-title">Supply</p>
        <p className="stat-value">{formatTokens(pSupply, 2)}</p>
        <p className="stat-desc">PLS Grow</p>
      </div>
    </div>
  );
}

export function FixedNGRStats(props: { liquidationDeposits: string }) {
  const chainId = useChainId();
  const { data: ngrData } = useContractReads({
    contracts: [
      {
        ...ngrGrowConfig,
        functionName: "totalDeposits",
        address: growNGR,
        chainId: 56
      },
      {
        ...ngrGrowConfig,
        functionName: "totalLiquidations",
        address: growNGR,
        chainId: 56
      },
      {
        ...growConfig,
        functionName: "balanceOf",
        args: [growNGR],
        address: growToken,
        chainId: 56
      },
      {
        ...ngrGrowConfig,
        functionName: "totalDeposits",
        address: pNGR,
        chainId: 369
      },
      {
        ...ngrGrowConfig,
        functionName: "totalLiquidations",
        address: pNGR,
        chainId: 369
      },
      {
        ...growConfig,
        functionName: "balanceOf",
        args: [pNGR],
        address: pGrowToken,
        chainId: 369
      },
    ],
    watch: true,
  });
  const { deposits, liquidations, supply } = {
    deposits: ((ngrData?.[0].result as bigint | undefined) || 0n) + ((ngrData?.[3].result as bigint | undefined) || 0n),
    liquidations: (ngrData?.[1].result as bigint | undefined || 0n) + (ngrData?.[4].result as bigint | undefined || 0n),
    supply: ((ngrData?.[2].result as bigint | undefined || 0n) + (ngrData?.[5].result as bigint | undefined || 0n)) ,
  };
  return (
    <div className="stats stats-vertical md:stats-horizontal shadow text-blue-400">
      <div className="stat">
        <p className="stat-title">Investments</p>
        <p className="stat-value">
          {formatTokens(deposits + BigInt(props.liquidationDeposits), 10)}
        </p>
        <p className="stat-desc">USD</p>
      </div>
      <div className="stat">
        <p className="stat-title">Liquidations</p>
        <p className="stat-value">{formatTokens(liquidations, 2)}</p>
        <p className="stat-desc">USD</p>
      </div>
      <div className="stat">
        <p className="stat-title">Total</p>
        <p className="stat-value">{formatTokens(supply, 2)}</p>
        <p className="stat-desc">GROW</p>
      </div>
    </div>
  );
}
