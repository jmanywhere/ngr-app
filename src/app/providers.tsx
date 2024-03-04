"use client";

import { WagmiConfig, createConfig } from "wagmi";
import { bsc, bscTestnet, pulsechain } from "viem/chains";
import {
  ConnectKitProvider,
  ConnectKitButton,
  getDefaultConfig,
} from "connectkit";

const chains = [bsc, pulsechain];
const projectId = "0499684465a8ff62ec58d6f0e7bb2d66";

const metadata = {
  appName: "NextGen ROI",
  appDescription:
    "THE FIRST EVER FULLY COLLATERALIZED ACCELERATED ROI PLATFORM.",
  appUrl: "https://nextgenroi.com/",
  appIcon: "https://nextgenroi.com/Logo.png",
};

const wagmiConfig = createConfig(
  getDefaultConfig({
    chains,
    walletConnectProjectId: projectId,
    ...metadata,
  })
);

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <WagmiConfig config={wagmiConfig}>
      <ConnectKitProvider
        customTheme={{
          "--ck-connectbutton-background": "#04BF55",
          "--ck-connectbutton-color": "#000000",
          "--ck-connectbutton-hover-background": "#5eead4",
        }}
      >
        {children}
      </ConnectKitProvider>
    </WagmiConfig>
  );
}
