import NgrAbi from "@/abi/NGR2";
import GrowNGR from "@/abi/NGR_Grow";
import GrowToken from "@/abi/Grow";
import DripABI from "@/abi/GrowDrip";
import MinerABI from "@/abi/Miner";
import {erc20ABI} from "wagmi";

export const ngrContract = "0x0aC58925A4C668AB30d29fdBEC267A795d9f7891";
export const TEST_USDT_ADDRESS = "0xb6d07d107ff8e26a21e497bf64c3239101fed3cf";
export const USDT_ADDRESS = "0x55d398326f99059fF775485246999027B3197955";

export const growNGR = "0xCFaFe72b956b19D044722395B2564f8997941Af3";
export const growToken = "0xA72f53ea4f3Cf19f1F6359E87E58221Bd0a7068b";

export const dripNGR = "0xCCFec1fe10127E8b28B5c1CF5AecCbFa3155435b";

const TEST_GROW = "0x2E0347eC54BF7c3758bAb1faB409Bc758f2765B9";
const TEST_MINER = "0x958662BE83cbCe9aa453D50E89e99A02bCa37B22";
const MINER = "0x92675a293b64F87955997F856242880D6A459A89";

export const pGrowToken = "0x1bd86894a52D78071f14b06BaeD48E9b32fC15aE";
export const pNGR = "0xDb389472Ebc2b6aE8a9D9E72a70d65E9307b5c65"
export const pDrip ="0x5c86bf497cA0EfdF4b3F4f998713E56a8701377d"
export const pMiner = "0x32d404b6297a5983eB11fA92dd8Bf390dA481Fd3"
export const DAI = "0xefD766cCb38EaF1dfd701853BFCe31359239F305"

export const ngrConfig = {
  address: ngrContract,
  abi: NgrAbi,
} as const;

export const usdtConfig = {
  address: process.env.NEXT_PUBLIC_TEST_CONTRACTS === "0"? USDT_ADDRESS : TEST_USDT_ADDRESS,
  abi: erc20ABI,
} as const;

export const ngrGrowConfig = {
  address: growNGR,
  abi: GrowNGR,
} as const;

export const growConfig = {
  address: process.env.NEXT_PUBLIC_TEST_CONTRACTS === "0"? growToken : TEST_GROW,
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

export const minerConfig = {
  address: process.env.NEXT_PUBLIC_TEST_CONTRACTS === "0"? MINER : TEST_MINER,
  abi: MinerABI,
} as const;
