"use client";

import { WagmiConfig } from "wagmi";
import { bscTestnet, bsc } from "viem/chains";

import { createWeb3Modal, defaultWagmiConfig } from "@web3modal/wagmi/react";

const chains = [bscTestnet];
const projectId = "5b3561f6a7c0319d2fcf6a9d20d6b1e8";

const metadata = {
  name: "NextGen ROI",
  description: "THE FIRST EVER FULLY COLLATERALIZED ACCELERATED ROI PLATFORM.",
  url: "https://nextgenroi.com/",
};

const wagmiConfig = defaultWagmiConfig({
  chains,
  projectId,
  metadata,
});

createWeb3Modal({
  wagmiConfig,
  projectId,
  chains,
  themeVariables: {
    "--w3m-color-mix": "#04BF55",
    "--w3m-color-mix-strength": 20,
  },
});

export function Providers({ children }: { children: React.ReactNode }) {
  return <WagmiConfig config={wagmiConfig}>{children}</WagmiConfig>;
}
