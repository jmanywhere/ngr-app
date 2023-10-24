import NgrAbi from "@/abi/NGR2";
import GrowNGR from "@/abi/NGR_Grow";
import GrowToken from "@/abi/Grow";
import {erc20ABI} from "wagmi";

export const ngrContract = "0x0aC58925A4C668AB30d29fdBEC267A795d9f7891";
export const TEST_USDT_ADDRESS = "0xb6d07d107ff8e26a21e497bf64c3239101fed3cf";
export const USDT_ADDRESS = "0x55d398326f99059fF775485246999027B3197955";

export const growNGR = "0x6e9FE75AB684C2D6F9BA2529A94cc0b928a5d634";
export const growToken = "0xF38c9E79463DFebECA756aB4026E5298dbB88147";

export const ngrConfig = {
  address: ngrContract,
  abi: NgrAbi,
} as const;

export const usdtConfig = {
  address: TEST_USDT_ADDRESS,
  abi: erc20ABI,
} as const;

export const ngrGrowConfig = {
  address: growNGR,
  abi: GrowNGR,
} as const;

export const growConfig = {
  address: growToken,
  abi: GrowToken,
} as const;