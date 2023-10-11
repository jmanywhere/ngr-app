import NgrAbi from "@/abi/NGR2";
import GrowNGR from "@/abi/NGR_Grow";
import GrowToken from "@/abi/Grow";
import erc20ABI from "wagmi";

export const ngrContract = "0x0aC58925A4C668AB30d29fdBEC267A795d9f7891";
export const TEST_USDT_ADDRESS = "0xb6d07d107ff8e26a21e497bf64c3239101fed3cf";
export const USDT_ADDRESS = "0x55d398326f99059fF775485246999027B3197955";

export const growNGR = "0xf5CDF704219B6aa677cFBabD38c7989219A62828";
export const growToken = "0x93cbD7a800eC3bBFC8466e3D0799A107aA2a10E2";

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