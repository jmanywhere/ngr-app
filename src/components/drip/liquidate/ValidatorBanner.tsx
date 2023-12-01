"use client";

import { dripGrowConfig } from "@/data/contracts";
import Link from "next/link";
import { zeroAddress } from "viem";
import { useAccount, useContractRead } from "wagmi";

export default function ValidatorBanner() {
  const { address } = useAccount();

  const { data: user } = useContractRead({
    ...dripGrowConfig,
    functionName: "users",
    args: [address || zeroAddress],
  });
  if ((user?.[0] || 0n) > 0n)
    return (
      <div className="flex flex-col items-center">
        <h2 className="text-xl text-emerald-900 font-bold">Valid Liquidator</h2>
      </div>
    );
  return (
    <div className="flex flex-col items-center">
      <h2 className="text-xl text-rose-900 font-bold">Invalid Liquidator</h2>
      <p className="bg-slate-900/80 text-error pt-6 pb-4 px-5 rounded-xl text-sm whitespace-pre-wrap text-center">
        Please deposit into the NGR Drip contract to become a liquidator.{"\n"}
        <Link href="/invest/drip" className="btn btn-link btn-primary">
          Deposit Here
        </Link>
      </p>
    </div>
  );
}
