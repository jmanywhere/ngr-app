"use client";

import { dripGrowConfig } from "@/data/contracts";
import { formatTokens } from "@/utils/stringify";
import formatDuration from "date-fns/formatDuration";
import intervalToDuration from "date-fns/intervalToDuration";
import { useImmer } from "use-immer";
import {
  useContractRead,
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from "wagmi";

export default function DripLiquidatorTable() {
  const [selectedIds, setSelectedIds] = useImmer<
    Array<{ address: `0x${string}`; reward: bigint }>
  >([]);
  const { data: liquidationInfo } = useContractRead({
    ...dripGrowConfig,
    functionName: "usersPendingLiquidation",
    watch: true,
  });

  const { config: liquidateConfig, error: liquidateConfigError } =
    usePrepareContractWrite({
      ...dripGrowConfig,
      functionName: "liquidateUsers",
      args: [selectedIds.map((item) => item.address)],
    });
  const {
    write: liquidate,
    data: liquidateData,
    isLoading: liquidateLoading,
  } = useContractWrite({
    ...liquidateConfig,
    onSuccess: () => setSelectedIds(() => []),
  });
  const { isLoading: liquidateTxLoading } = useWaitForTransaction({
    hash: liquidateData?.hash,
  });

  const allUsers = (liquidationInfo?.[0] as Array<`0x${string}`>) || [];
  return (
    <div className="bg-slate-600 rounded-lg mb-12">
      <table className="table table-zebra">
        <thead>
          <th>User</th>
          <th>Time Since Max</th>
          <th>Reward</th>
          <th />
        </thead>
        <tbody className="text-white/70">
          {allUsers.length == 0 ? (
            <tr>
              <td
                colSpan={4}
                className="text-center text-white font-semibold tracking-widest"
              >
                No users to liquidate
              </td>
            </tr>
          ) : (
            allUsers.map((userAddress) => {
              return (
                <RowInfo
                  key={`to-liquidate-${userAddress}`}
                  address={userAddress}
                  selected={selectedIds.some(
                    (item) => item.address === userAddress
                  )}
                  updateSelection={(address, reward) => {
                    setSelectedIds((draft) => {
                      if (draft.some((item) => item.address === address)) {
                        draft.splice(
                          draft.findIndex((item) => item.address === address),
                          1
                        );
                      } else {
                        draft.push({ address, reward });
                      }
                    });
                  }}
                />
              );
            })
          )}
        </tbody>
      </table>
      <div className="mt-6 text-right px-4 pb-2 text-white/70 flex flex-row justify-between font-bold">
        <div>Approx Claim:</div>
        <div>
          {formatTokens(
            selectedIds.reduce((acc, item) => acc + item.reward, 0n),
            4
          )}
        </div>
      </div>
      <div className="flex flex-row items-center justify-center py-4">
        <button
          className="btn btn-secondary min-w-[200px]"
          disabled={
            liquidateLoading ||
            liquidateTxLoading ||
            allUsers.length == 0 ||
            selectedIds.length == 0 ||
            !!liquidateConfigError
          }
          onClick={() => liquidate?.()}
        >
          {liquidateLoading || liquidateTxLoading ? (
            <span className="loading loading-infinity" />
          ) : (
            "Liquidate"
          )}
        </button>
      </div>
    </div>
  );
}

function RowInfo(props: {
  address: `0x${string}`;
  selected?: boolean;
  updateSelection: (address: `0x${string}`, reward: bigint) => void;
}) {
  const { data: userInfo } = useContractRead({
    ...dripGrowConfig,
    functionName: "users",
    args: [props.address],
  });

  const rewardAmount = ((userInfo?.[0] || 0n) as bigint) / 1000n;

  return (
    <tr
      className={`${
        props.selected ? "bg-slate-700" : "bg-slate-600"
      } hover:bg-slate-700 cursor-pointer`}
      onClick={() => {
        props.updateSelection(props.address, rewardAmount);
      }}
    >
      <td>
        {props.address.split("").slice(0, 4).join("") +
          "..." +
          props.address.split("").slice(-4).join("")}
      </td>
      <td>
        {formatDuration(
          intervalToDuration({
            start: parseInt(
              (
                (((userInfo?.[2] || 0n) as bigint) + 24n * 3600n) *
                1000n
              ).toString()
            ),
            end: new Date().getTime(),
          }),
          {
            format: ["hours", "minutes"],
          }
        ).replace(/days|hours|minutes|seconds/gi, (m) => m.substring(0, 1))}
      </td>
      <td className="text-center">{formatTokens(rewardAmount, 4)}</td>
      <td>
        <input
          type="checkbox"
          checked={props.selected}
          className="checkbox checkbox-primary"
        />
      </td>
    </tr>
  );
}
