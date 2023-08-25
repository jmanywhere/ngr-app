"use client";

import { Web3Button } from "@web3modal/react";
import {
  erc20ABI,
  useAccount,
  useContractInfiniteReads,
  useContractRead,
  useContractReads,
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from "wagmi";
import NgrAbi from "@/abi/NGR";
import { useEffect, useMemo, useState } from "react";
import { formatEther, parseEther, zeroAddress } from "viem";
import classNames from "classnames";

const ngrContract = "0x431c3A01A4D5d22c18c721A8F8254910fAF9760d";

const ngrConfig = {
  address: ngrContract,
  abi: NgrAbi,
} as const;

export const StatsCard = () => {
  const { address } = useAccount();
  const { data: ngrData, refetch: ngrDataRefetch } = useContractReads({
    contracts: [
      {
        ...ngrConfig,
        functionName: "TCV",
      },
      {
        ...ngrConfig,
        functionName: "cycleCounter",
      },
      {
        ...ngrConfig,
        functionName: "currentHelixPrice",
      },
      {
        ...ngrConfig,
        functionName: "liquidationCounter",
      },
      {
        ...ngrConfig,
        functionName: "totalPositions",
      },
      {
        ...ngrConfig,
        functionName: "currentUserPendingLiquidation",
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
    ],
  });
  const [selectedPosition, setSelectedPosition] = useState(0);

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
    };
  }, [ngrData]);

  const positionSelected =
    statsData.totalUserPositions.length > 0
      ? statsData.totalUserPositions[selectedPosition]
      : 0n;

  const { data: positionData } = useContractRead({
    ...ngrConfig,
    functionName: "positions",
    args: [positionSelected],
  });

  useEffect(() => {
    const interval = setInterval(ngrDataRefetch, 10000);
    return () => clearInterval(interval);
  }, [ngrDataRefetch]);

  return (
    <div className="text-black p-4 rounded-lg border-4 border-black flex flex-col items-center bg-slate-300/80 mb-6 md:mb-7 max-w-sm lg:max-w-md md:max-w-[600px] lg:max-w-[580px] w-full">
      <div className="relative w-full flex flex-col items-center">
        <h2 className="font-bold text-2xl py-1 w-full text-center pb-3 uppercase">
          Stats
        </h2>
        <div className="lg:absolute right-0 top-0 pb-3">
          <Web3Button />
        </div>
      </div>
      <div className="w-full px-6 pb-4">
        <div className="flex justify-between">
          <p className="font-bold">Helix Price</p>
          <p>
            {parseFloat(formatEther(statsData.helixPrice)).toLocaleString()}
          </p>
        </div>
        <div className="flex justify-between">
          <p className="font-bold">TCV</p>
          <p>{parseFloat(formatEther(statsData.tcv)).toLocaleString()}</p>
        </div>
        <div className="flex justify-between">
          <p className="font-bold">Cycle</p>
          <p>{statsData.cycleCounter.toLocaleString()}</p>
        </div>
        <div className="flex justify-between">
          <p className="font-bold">Next Position Liquidated</p>
          <p>{statsData.currentUserPendingLiquidation.toLocaleString()}</p>
        </div>
        <div className="flex justify-between">
          <p className="font-bold">Total Liquidated</p>
          <p>{statsData.liquidations.toLocaleString()}</p>
        </div>
        <div className="flex justify-between">
          <p className="font-bold">Total Active Deposits</p>
          <p>
            {(
              statsData.totalPositions - statsData.liquidations
            ).toLocaleString()}
          </p>
        </div>
      </div>
      <div className="w-full px-6 pb-4 border-b-4 border-secondary mb-4">
        <div className="flex justify-between">
          <p className="font-bold">Enough TCV</p>
          <p className="uppercase">
            {statsData.tcv > parseEther("5000") ? "true" : "false"}
          </p>
        </div>
        <div className="flex justify-between">
          <p className="font-bold">Gaps OK</p>
          <p className="uppercase">
            {statsData.deposits - statsData.liquidations > 20}
          </p>
        </div>
      </div>
      <div className="pb-5 w-full px-6">
        <h3 className="text-xl font-bold">Your Stats</h3>
        <div className="flex justify-between">
          <p className="font-bold">Positions:</p>
          <p>{statsData.totalUserPositions.length.toLocaleString()}</p>
        </div>
        <div className="flex flex-row items-center justify-center pt-2 gap-x-2">
          <button
            onClick={() => setSelectedPosition((p) => (p == 0 ? 0 : p - 1))}
            className={classNames(
              "btn btn-circle btn-outline btn-sm btn-secondary",
              selectedPosition == 0 ? "btn-disabled" : ""
            )}
          >
            {"<"}
          </button>
          <p className="px-3">Position: {positionSelected.toLocaleString()}</p>
          <button
            onClick={() =>
              setSelectedPosition((p) => {
                if (statsData.totalUserPositions.length === 0) return 0;
                else
                  return p === statsData.totalUserPositions.length - 1
                    ? p
                    : p + 1;
              })
            }
            className={classNames(
              "btn btn-circle btn-secondary btn-outline btn-sm",
              statsData.totalUserPositions.length == 0 ||
                selectedPosition == statsData.totalUserPositions.length - 1
                ? "btn-disabled"
                : ""
            )}
          >
            {">"}
          </button>
        </div>
      </div>
      <div className="border-[#333] border-4 rounded-lg w-full py-3 px-6">
        <div className="flex justify-between pb-1">
          <p className="font-bold">Deposit Amount:</p>
          <p>
            {parseFloat(formatEther(positionData?.[1] || 0n)).toLocaleString()}
          </p>
        </div>
        <div className="flex justify-between pb-1">
          <p className="font-bold">Liquidation Amount:</p>
          <p>
            {parseFloat(
              formatEther(((positionData?.[1] || 0n) * 106n) / 100n)
            ).toLocaleString()}
          </p>
        </div>
        <div className="flex justify-between pb-1">
          <p className="font-bold">Is Liquidated:</p>
          <p>{positionData?.[7] ? "TRUE" : "FALSE"}</p>
        </div>
      </div>
    </div>
  );
};

const TEST_USDT_ADDRESS = "0xb6d07d107ff8e26a21e497bf64c3239101fed3cf";
const USDT_ADDRESS = "0x55d398326f99059fF775485246999027B3197955";

export const ActionsCard = () => {
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
    ],
  });

  const [depositAmount, setDepositAmount] = useState(0);
  const [enableRedeposit, setEnableRedeposit] = useState(false);

  const { config: prepApproveConfig } = usePrepareContractWrite({
    address: TEST_USDT_ADDRESS,
    abi: erc20ABI,
    functionName: "approve",
    args: [ngrContract, parseEther(`${1_000_000}`)],
  });

  const { config: depositConfig, error: prepDepositError } =
    usePrepareContractWrite({
      ...ngrConfig,
      functionName: "deposit",
      args: [parseEther(`${depositAmount}`), enableRedeposit],
    });

  const { write: deposit, data: depositData } = useContractWrite(
    depositConfig || null
  );
  const { write: approve, data: approveData } = useContractWrite(
    prepApproveConfig || null
  );
  const { isLoading: depositLoading } = useWaitForTransaction({
    hash: depositData?.hash,
  });
  const { isLoading: approveLoading } = useWaitForTransaction({
    hash: approveData?.hash,
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

  return (
    <>
      <div className="text-black pt-7 pb-4 px-4 rounded-lg border-4 border-black flex flex-col items-center bg-slate-300/80 mb-4 md:max-w-[600px] lg:max-w-[300px] w-full">
        <h2 className="font-bold text-2xl pb-4">Actions</h2>
        <div className="py-3 w-full flex flex-col items-center">
          <div className="join">
            <div className="form-control w-full join-item">
              <input
                className="input rounded-r-none input-primary w-full border-r-0"
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
                <span className="label-text-alt text-black font-semibold">
                  Wallet USDT
                </span>
                <span className="label-text-alt text-black">
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
                if (userUSDTBalance > parseEther("1000"))
                  setDepositAmount(1000);
                else setDepositAmount(parseFloat(formatEther(userUSDTBalance)));
              }}
            >
              Max
            </button>
          </div>
          <div className="form-control">
            <label className="label cursor-pointer">
              <span className="label-text text-black pr-4">Redeposit</span>
              <input
                type="checkbox"
                checked={enableRedeposit}
                className="checkbox checkbox-primary"
                onChange={(e) => setEnableRedeposit((p) => !p)}
              />
            </label>
          </div>
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
          {(depositAmount === 0 && isApproved && (
            <span className="text-sm text-error">Min Deposit: 5 USDT</span>
          )) ||
            null}
        </div>
        <div className="flex flex-col items-center py-5">
          <p className="text-sm">DISCLAIMER PENDING!!!</p>
        </div>
      </div>
    </>
  );
};
