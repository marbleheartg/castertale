"use client"

import { farcasterFrame as miniAppConnector } from "@farcaster/frame-wagmi-connector"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { http } from "viem"
import { mainnet } from "viem/chains"
import { createConfig, WagmiProvider } from "wagmi"

const wagmiConfig = createConfig({
  chains: [mainnet],
  transports: {
    [mainnet.id]: http(),
  },
  connectors: [miniAppConnector()],
})

const tanstackQueryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 30,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    },
  },
})

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={tanstackQueryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  )
}
