import NgrAbi from "@/abi/NGR2";
import GrowNGR from "@/abi/NGR_Grow";
import GrowToken from "@/abi/Grow";
import DripABI from "@/abi/GrowDrip";
import {erc20ABI} from "wagmi";

export const ngrContract = "0x0aC58925A4C668AB30d29fdBEC267A795d9f7891";
export const TEST_USDT_ADDRESS = "0xb6d07d107ff8e26a21e497bf64c3239101fed3cf";
export const USDT_ADDRESS = "0x55d398326f99059fF775485246999027B3197955";

export const growNGR = "0xCFaFe72b956b19D044722395B2564f8997941Af3";
export const growToken = "0xA72f53ea4f3Cf19f1F6359E87E58221Bd0a7068b";

export const dripNGR = "0xfFAb3C8b3b1CAc59e1b67A145F3cFB7D0Daa8bE2";
const growTestToken = "0x272cEF22C240BF4c5c145640b2F3d2E820d801a9"

export const ngrConfig = {
  address: ngrContract,
  abi: NgrAbi,
} as const;

export const usdtConfig = {
  address: USDT_ADDRESS,
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

export const dripGrowConfig = {
  address: dripNGR,
  abi: DripABI,
} as const;

export const testUSDTConfig = {
  address: TEST_USDT_ADDRESS,
  abi: erc20ABI,
} as const;

export const testGrowConfig = {
  address: growTestToken,
  abi: GrowToken,
} as const;