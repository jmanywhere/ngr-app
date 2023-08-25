"use client";

import { EthereumClient } from "@web3modal/ethereum";
import { Web3Modal } from "@web3modal/react";
import * as React from "react";
import { WagmiConfig } from "wagmi";

import { chains, config, walletConnectProjectId } from "../wagmiConfig";

const ethereumClient = new EthereumClient(config, chains);

export function Providers({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);
  return (
    <WagmiConfig config={config}>
      {mounted && children}
      <Web3Modal
        projectId={walletConnectProjectId}
        ethereumClient={ethereumClient}
        themeVariables={{
          "--w3m-accent-color": "#04BE54",
          "--w3m-background-color": "#04BF55",
          "--w3m-accent-fill-color": "#000000",
        }}
      />
    </WagmiConfig>
  );
}
