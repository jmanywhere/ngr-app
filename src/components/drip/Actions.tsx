"use client";
import { dripNGR, dripGrowConfig, usdtConfig, DAI, pDrip } from "@/data/contracts";
import { formatTokens } from "@/utils/stringify";
import classNames from "classnames";
import { useState } from "react";
import {
  BaseError,
  formatEther,
  maxUint256,
  parseEther,
  zeroAddress,
} from "viem";
import {
  useAccount,
  useChainId,
  useContractReads,
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from "wagmi";

export default function DripActions() {
  const { address } = useAccount();
  const [depositAmount, setDepositAmount] = useState("");
  const chainId = useChainId();
  const { data: userInfo } = useContractReads({
    contracts: [
      {
        ...usdtConfig,
        functionName: "balanceOf",
        args: [address || zeroAddress],
        address: chainId ===56 ? usdtConfig.address : DAI,
      },
      {
        ...usdtConfig,
        functionName: "allowance",
        args: [address || zeroAddress, 
          chainId ===56 ? dripGrowConfig.address : pDrip,
        ],
        address: chainId ===56 ? usdtConfig.address : DAI,
      },
      {
        ...dripGrowConfig,
        functionName: "claimable",
        args: [address || zeroAddress],
        address: chainId ===56 ? dripGrowConfig.address : pDrip,
      },
      {
        ...dripGrowConfig,
        functionName: "users",
        args: [address || zeroAddress],
        address: chainId ===56 ? dripGrowConfig.address : pDrip,
      },
    ],
    watch: true,
  });

  const { config: approveConfig } = usePrepareContractWrite({
    ...usdtConfig,
    functionName: "approve",
    args: [
      chainId ===56 ? dripNGR : pDrip,
      maxUint256
    ],
    address: chainId ===56 ? usdtConfig.address : DAI,
  });

  const { config: depositConfig, error: depositError } =
    usePrepareContractWrite({
      ...dripGrowConfig,
      functionName: "deposit",
      args: [parseEther(depositAmount) || 0n],
      address: chainId ===56 ? dripNGR : pDrip,
    });

  const { config: claimConfig } = usePrepareContractWrite({
    ...dripGrowConfig,
    functionName: "claim",
    address: chainId ===56 ? dripNGR : pDrip,
  });
  const { config: quitConfig, error: quitConfigError } =
    usePrepareContractWrite({
      ...dripGrowConfig,
      functionName: "quit",
      address: chainId ===56 ? dripNGR : pDrip,
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
    write: quitWrite,
    isLoading: quitLoading,
    data: quitData,
  } = useContractWrite(quitConfig);

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
  const { isLoading: quitTxLoading } = useWaitForTransaction({
    hash: quitData?.hash,
    confirmations: 5,
  });

  const action1Loading =
    approveLoading || approveTxLoading || depositLoading || depositTxLoading;

  const userInfoParsed = {
    //@ts-ignore
    usdtBalance: userInfo?.[0].result as bigint | undefined,
    //@ts-ignore
    allowance: userInfo?.[1].result as bigint | undefined,
    //@ts-ignore
    claimable: userInfo?.[2].result?.[0] as bigint | undefined,
    user: {
      //@ts-ignore
      deposits: userInfo?.[3].result?.[0] || (0n as bigint),
    },
  };
  const hasAllowance =
    userInfoParsed.user.deposits > 0n
      ? (userInfoParsed.allowance || 0n) >= parseEther(depositAmount || "0")
      : (userInfoParsed.allowance || 0n) >= parseEther("100");

  const usedTokenSymbol = chainId === 56 ? "USDT" : "DAI";

  return (
    <div className="text-white/90 px-4 py-4 rounded-lg border-2 border-black flex flex-col items-center bg-slate-800/80 mb-4 max-w-[90vw]">
      <div className="flex flex-col md:flex-row items-center md:items-start gap-4">
        <div className="flex flex-col items-center">
          <h3 className="text-2xl font-bold text-center pb-2 text-primary">
            Deposit
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
                    parseInt(
                      formatEther(userInfoParsed.usdtBalance || 0n)
                    ).toString()
                  )
                }
              >
                Max
              </button>
            </div>
            <label className="label">
              <span className="label-text-alt">Wallet:</span>
              <span className="label-text-alt">
                {formatTokens(userInfoParsed.usdtBalance)} {usedTokenSymbol}
              </span>
            </label>
          </div>
          <p className="text-slate-400 text-xs">
            Minimum Init Deposit: 100 USDT
          </p>
          <hr className="my-4 w-full" />
          <button
            className={classNames(
              "btn  min-w-[200px] rounded-xl",
              hasAllowance ? "btn-primary" : "btn-secondary"
            )}
            disabled={
              action1Loading ||
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
            {action1Loading ? (
              <span className="loading loading-spinner" />
            ) : hasAllowance ? (
              "Deposit"
            ) : (
              "Approve"
            )}
          </button>
          <p className="text-error text-xs max-w-[250px] whitespace-pre-wrap text-center">
            {depositAmount.length > 0 &&
              (depositError as BaseError | undefined)?.shortMessage}
          </p>
        </div>
        <div className="min-w-[260px] flex flex-col items-center">
          <h3 className="text-2xl font-bold text-center pb-2 text-blue-400">
            Claim
          </h3>
          <div className="stat">
            <p className="stat-title text-center">Claimable</p>
            <p className="stat-value text-center">
              {formatTokens(userInfoParsed.claimable, 4)}
            </p>
            <p className="stat-desc text-center">{usedTokenSymbol}</p>
          </div>
          <hr className="mt-0 mb-4 w-full" />
          <button
            className="btn btn-secondary min-w-[200px] rounded-xl"
            disabled={
              userInfoParsed.user.deposits == 0n ||
              claimLoading ||
              claimTxLoading
            }
            onClick={() => claimWrite?.()}
          >
            {claimLoading || claimTxLoading ? (
              <span className="loading loading-spinner" />
            ) : (
              "Claim"
            )}
          </button>
        </div>
      </div>
      {userInfoParsed.user.deposits > 0n ? (
        <div className="collapse collapse-arrow max-w-[280px]">
          <input type="checkbox" name="quit-collapse" id="quit-collapse" />
          <div className="text-lg font-bold text-error collapse-title block">
            Quit
          </div>
          <div className="collapse-content flex flex-col items-center">
            <p className="text-xs max-w-[250px] text-justify pb-4">
              Quitting means you will retrieve all your current GROW as {usedTokenSymbol}.
              You will be charged a 5% sell fee and a 10% handler fee. Make sure
              you are 100% certain before quitting.
            </p>
            <button
              className="btn btn-error"
              disabled={quitLoading || quitTxLoading || !!quitConfigError}
              onClick={() => quitWrite?.()}
            >
              {quitLoading || quitTxLoading ? (
                <span className="loading loading-spinner" />
              ) : (
                "Quit"
              )}
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
