import { formatEther } from "viem";

export function formatTokens(amount?: bigint, maxDecimals?: number) {
  if(!amount) return "0";
  const parsedNumber =parseFloat(formatEther(amount))
  if(parsedNumber > 99.999999999999)
    return parsedNumber.toLocaleString(undefined, { maximumFractionDigits: 1 })
  return parsedNumber.toLocaleString(undefined, { maximumFractionDigits: maxDecimals || 0 }); 
}