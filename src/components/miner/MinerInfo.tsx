"use client";

import {
  dripGrowConfig,
  growConfig,
  minerConfig,
  ngrGrowConfig,
  usdtConfig,
} from "@/data/contracts";
import shortAddress, { formatTokens } from "@/utils/stringify";
import classNames from "classnames";
import { useSearchParams } from "next/navigation";
import { use, useState } from "react";
import {
  Address,
  formatEther,
  isAddress,
  maxUint256,
  parseEther,
  zeroAddress,
} from "viem";
import {
  useAccount,
  useContractReads,
  usePrepareContractWrite,
  useContractWrite,
  useWaitForTransaction,
} from "wagmi";

export default function MinerInfo() {
  const { address } = useAccount();
  const [depositAmount, setDepositAmount] = useState("");
  const params = useSearchParams();
  const referralAddress = params.get("ref");
  const { data: minerData } = useContractReads({
    contracts: [
      {
        ...minerConfig,
        functionName: "user",
        args: [address || zeroAddress],
      },
      {
        ...growConfig,
        functionName: "calculatePrice",
      },
      {
        ...growConfig,
        functionName: "balanceOf",
        args: [minerConfig.address || zeroAddress],
      },
      {
        ...minerConfig,
        functionName: "getEggs",
        args: [address || zeroAddress],
      },
      {
        ...minerConfig,
        functionName: "marketEggs",
      },
      {
        ...usdtConfig,
        functionName: "balanceOf",
        args: [address || zeroAddress],
      },
      {
        ...usdtConfig,
        functionName: "allowance",
        args: [address || zeroAddress, minerConfig.address || zeroAddress],
      },
      {
        ...minerConfig,
        functionName: "getLiquidatableUsers",
      },
      {
        ...dripGrowConfig,
        functionName: "users",
        args: [address || zeroAddress],
      },
      {
        ...ngrGrowConfig,
        functionName: "userStats",
        args: [address || zeroAddress],
      },
    ],
    watch: true,
  });

  const {
    price,
    minerGrow,
    miners,
    usdtBalance,
    usdtAllowance,
    eggs,
    marketEggs,
    refEggs,
    invested,
    claimed,
    lockedEggs,
    liquidUsers,
    userDripDeposits,
    userFixedDeposits,
  } = {
    price: (minerData?.[1].result || 0n) as bigint,
    minerGrow: (minerData?.[2].result || 0n) as bigint,
    miners: ((minerData?.[0].result as any)?.[0] || 0n) as bigint,
    usdtBalance: (minerData?.[5].result || 0n) as bigint,
    usdtAllowance: (minerData?.[6].result || 0n) as bigint,
    eggs: (minerData?.[3].result || 0n) as bigint,
    marketEggs: (minerData?.[4].result || 1n) as bigint,
    refEggs: ((minerData?.[0].result as any)?.[3] || 0n) as bigint,
    invested: ((minerData?.[0].result as any)?.[1] || 0n) as bigint,
    claimed: ((minerData?.[0].result as any)?.[2] || 0n) as bigint,
    lockedEggs: ((minerData?.[0].result as any)?.[4] || 0n) as bigint,
    liquidUsers: minerData?.[7].result as [Address[], bigint[]] | undefined,
    userDripDeposits: ((minerData?.[8].result as any)?.[0] || 0n) as bigint,
    userFixedDeposits: ((minerData?.[9].result as any)?.[0] || 0n) as bigint,
  };

  const claimable = (9n * eggs * minerGrow) / ((marketEggs + eggs) * 10n);
  const referralRewards = (9n * refEggs) / ((marketEggs + eggs) * 10n);

  const hasAllowance = usdtAllowance > parseEther("10");

  const { config: approveConfig } = usePrepareContractWrite({
    ...usdtConfig,
    functionName: "approve",
    args: [minerConfig.address, maxUint256],
  });

  const { config: depositConfig, error: depositError } =
    usePrepareContractWrite({
      ...minerConfig,
      functionName: "depositIntoMine",
      args: [
        parseEther(depositAmount) || 0n,
        referralAddress && isAddress(referralAddress)
          ? referralAddress
          : zeroAddress,
      ],
    });

  const { config: claimConfig } = usePrepareContractWrite({
    ...minerConfig,
    functionName: "claimFromMine",
  });
  const { config: compoundConfig, error: compoundConfigError } =
    usePrepareContractWrite({
      ...minerConfig,
      functionName: "compoundResources",
    });
  const { config: liquidationConfig, error: liquidationConfigError } =
    usePrepareContractWrite({
      ...minerConfig,
      functionName: "liquidateUsers",
      args: [liquidUsers?.[0] || []],
    });

  const {
    write: approveWrite,
    isLoading: approveLoading,
    data: approveData,
  } = useContractWrite(approveConfig);
  const {
    write: depositWrite,
    isLoading: depositLoading,
    data: depositData,
  } = useContractWrite({
    ...depositConfig,
    onSuccess: () => {
      setDepositAmount("");
    },
  });
  const {
    write: claimWrite,
    isLoading: claimLoading,
    data: claimData,
  } = useContractWrite(claimConfig);
  const {
    write: compoundWrite,
    isLoading: compoundLoading,
    data: compoundData,
  } = useContractWrite(compoundConfig);

  const {
    write: liquidationWrite,
    isLoading: liquidationLoading,
    data: liquidationData,
  } = useContractWrite(liquidationConfig);

  const { isLoading: approveTxLoading } = useWaitForTransaction({
    hash: approveData?.hash,
    confirmations: 5,
  });
  const { isLoading: depositTxLoading } = useWaitForTransaction({
    hash: depositData?.hash,
    confirmations: 5,
  });
  const { isLoading: claimTxLoading } = useWaitForTransaction({
    hash: claimData?.hash,
    confirmations: 5,
  });
  const { isLoading: compoundTxLoading } = useWaitForTransaction({
    hash: compoundData?.hash,
    confirmations: 5,
  });
  const { isLoading: liquidationTxLoading } = useWaitForTransaction({
    hash: liquidationData?.hash,
    confirmations: 5,
  });

  const actionsLoading =
    depositLoading ||
    depositTxLoading ||
    compoundLoading ||
    compoundTxLoading ||
    claimLoading ||
    claimTxLoading ||
    approveLoading ||
    approveTxLoading;

  return (
    <>
      <div className="stats stats-vertical md:stats-horizontal shadow text-primary ">
        <div className="stat">
          <p className="stat-title text-slate-300">Grow Price</p>
          <p className="stat-value">{formatTokens(price, 6)}</p>
          <p className="stat-desc">USDT</p>
        </div>
        <div className="stat">
          <p className="stat-title text-slate-300">TVL</p>
          <p className="stat-value">{formatTokens(minerGrow, 4)}</p>
          <p className="stat-desc">Grow in Miner</p>
        </div>
      </div>
      <div className="stats stats-vertical md:stats-horizontal shadow text-accent bg-emerald-900">
        <div className="stat min-w-[200px]">
          <p className="stat-title text-slate-300">Miners</p>
          <p className="stat-value">{miners?.toLocaleString()}</p>
          <p className="stat-desc">Working</p>
        </div>
        <div className="stat ">
          <p className="stat-title text-slate-300">Ref. Rewards</p>
          <p className="stat-value">{formatTokens(referralRewards, 6)}</p>
          <p className="stat-desc">GROW</p>
        </div>
        <div className="stat min-w-[200px]">
          <p className="stat-title text-slate-300">Claimable</p>
          <p className="stat-value">{formatTokens(claimable, 6)}</p>
          <p className="stat-desc">GROW</p>
        </div>
        <div className="stat min-w-[200px]">
          <p className="stat-title text-slate-300">Compound Amount</p>
          <p className="stat-value">
            {(
              parseInt((eggs + lockedEggs).toString()) / 2592000
            ).toLocaleString(undefined, { maximumFractionDigits: 2 })}
          </p>
          <p className="stat-desc">Miners</p>
        </div>
      </div>
      <div className="stats stats-vertical md:stats-horizontal shadow text-accent bg-fuchsia-900">
        <div className="stat">
          <p className="stat-title text-slate-300">Total Invested</p>
          <p className="stat-value text-rose-400">
            {formatTokens(invested, 2)}
          </p>
          <p className="stat-desc text-slate-300">Grow</p>
        </div>
        <div className="stat">
          <p className="stat-title text-slate-300">Total Redeemed</p>
          <p className="stat-value text-rose-400">{formatTokens(claimed, 2)}</p>
          <p className="stat-desc text-slate-300">USDT</p>
        </div>
      </div>
      <div className="text-white/90 px-4 py-4 rounded-lg border-2 border-black flex flex-col items-center bg-slate-800/80 mb-4 max-w-[90vw]">
        <h3 className="text-2xl font-bold text-center pb-2 text-primary">
          Add Miners
        </h3>
        <div className="form-control">
          <div className="join">
            <input
              className="input rounded-r-non input-primary join-item max-w-[50vw]"
              value={depositAmount}
              type="number"
              onChange={(e) => {
                if (isNaN(e.target.valueAsNumber)) setDepositAmount("");
                else setDepositAmount(parseInt(e.target.value).toString());
              }}
              onFocus={(e) => e.target.select()}
            />
            <button
              className="btn btn-primary join-item"
              onClick={() =>
                setDepositAmount(
                  parseInt(formatEther(usdtBalance || 0n)).toString()
                )
              }
            >
              Max
            </button>
          </div>
          <label className="label">
            <span className="label-text-alt">Wallet:</span>
            <span className="label-text-alt">
              {formatTokens(usdtBalance)} USDT
            </span>
          </label>
        </div>
        <button
          className={classNames(
            "btn min-w-[200px] rounded-xl mt-4",
            hasAllowance ? "btn-primary" : "btn-secondary"
          )}
          disabled={
            actionsLoading ||
            approveTxLoading ||
            (hasAllowance &&
              (depositAmount == "" ||
                parseInt(depositAmount) < 1 ||
                !!depositError))
          }
          onClick={() => {
            if (hasAllowance) depositWrite?.();
            else approveWrite?.();
          }}
        >
          {actionsLoading || approveTxLoading ? (
            <span className="loading loading-spinner" />
          ) : hasAllowance ? (
            "Deposit"
          ) : (
            "Approve"
          )}
        </button>
        <hr className="my-4 w-full" />
        <button
          className="btn btn-secondary min-w-[200px] rounded-xl"
          disabled={miners == 0n || claimLoading || claimTxLoading}
          onClick={() => claimWrite?.()}
        >
          {claimLoading || claimTxLoading ? (
            <span className="loading loading-spinner" />
          ) : (
            "Claim"
          )}
        </button>
        <hr className="my-4 w-full" />
        <button
          className="btn btn-secondary min-w-[200px] rounded-xl"
          disabled={miners == 0n || compoundLoading || compoundTxLoading}
          onClick={() => compoundWrite?.()}
        >
          {compoundLoading || compoundTxLoading ? (
            <span className="loading loading-spinner" />
          ) : (
            "Compound Miners"
          )}
        </button>
      </div>
      <div className="text-white/90 px-4 py-4 rounded-lg border-2 border-black flex flex-col items-center bg-slate-800/80 mb-4 max-w-[90vw]">
        Your referral link is:
        <a
          className="break-all btn btn-link btn-sm text-white/70 lowercase"
          target="_blank"
          rel="noreferrer"
          href={
            address && miners > 0n
              ? `https://nextgenroi.com/miner?ref=${address}`
              : "about:blank"
          }
        >
          {address && miners > 0n
            ? `https://nextgenroi.com/miner?ref=${address}`
            : "connect wallet and deposit into miner"}
        </a>
      </div>
      {userFixedDeposits + userDripDeposits > 0n && (
        <>
          <div className="w-full py-5 bg-slate-700 rounded-3xl">
            <h4 className="text-2xl font-bold text-center text-primary">
              Liquidations Table
            </h4>
          </div>
          <table className="table w-full bg-slate-700 text-white">
            <thead>
              <tr>
                <th>Address</th>
                <th>Approx. Grow Amount</th>
              </tr>
            </thead>
            <tbody>
              {(liquidUsers?.[0]?.length || 0) > 0 ? (
                liquidUsers?.[0].map((user, i) => (
                  <tr key={i}>
                    <td>{shortAddress(user)}</td>
                    <td>{formatTokens(liquidUsers?.[1][i] || 0n, 2)}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={2} className="text-center">
                    No users to liquidate
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          <div className="w-full py-2 flex flex-col items-center">
            <button
              className="btn btn-secondary"
              onClick={() => liquidationWrite?.()}
              disabled={
                liquidationTxLoading ||
                liquidationLoading ||
                !liquidUsers?.[0].length
              }
            >
              {liquidationTxLoading ? (
                <span className="loading loading-spinner" />
              ) : (
                "Liquidate Users"
              )}
            </button>
          </div>
        </>
      )}
    </>
  );
}
