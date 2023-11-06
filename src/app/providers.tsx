"use client";

import { WagmiConfig } from "wagmi";
import { bsc } from "viem/chains";

import { createWeb3Modal, defaultWagmiConfig } from "@web3modal/wagmi/react";

const chains = [bsc];
const projectId = "0499684465a8ff62ec58d6f0e7bb2d66";

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
