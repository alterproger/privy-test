'use client';

import { PrivyProvider } from "@privy-io/react-auth";
import { useRouter } from "next/navigation";
import {bsc, bscTestnet, goerli, mainnet, polygon, polygonMumbai, sepolia} from "viem/chains";


export default function PrivyProviderWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  return (
    <PrivyProvider
      appId={process.env.NEXT_PUBLIC_PRIVY_APP_ID || ""}
      config={{
        embeddedWallets: {
          createOnLogin: 'users-without-wallets'

        },
          fiatOnRamp: {
              useSandbox: true,
          },
          supportedChains:[mainnet, goerli, sepolia, bsc, bscTestnet, polygon, polygonMumbai],
      }}
      onSuccess={() => router.push("/dashboard")}
    >
      {children}
    </PrivyProvider>
  );
}
