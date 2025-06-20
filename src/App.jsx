import { useState } from "react";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import {
  WalletDisconnectButton,
  WalletModalProvider,
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";

import "@solana/wallet-adapter-react-ui/styles.css";
import Airdrop from "./Airdrop";
import Trans from "./Trans";

const App = () => {
  const [network, setNetwork] = useState("devnet");

  const endpoints = {
    devnet: "https://api.devnet.solana.com",
    mainnet: "https://mainnet.helius-rpc.com/?api-key=24bcf8c7-31a4-4819-b518-75e192353eee",
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-inter">
      <header className="flex items-center justify-between px-6 py-4 border-b border-slate-700">
       <h1 className="text-3xl sm:text-4xl font-extrabold text-orange-500 tracking-wide mb-4">
  ⚡ DappNation
</h1>
        <div className="flex items-center gap-2">
          <label className="text-sm">Network:</label>
          <select
            value={network}
            onChange={(e) => setNetwork(e.target.value)}
            className="bg-slate-700 border border-slate-600 text-white px-3 py-1 rounded-md focus:ring-2 focus:ring-blue-500"
          >
            <option value="devnet">Devnet</option>
            <option value="mainnet">Mainnet</option>
          </select>
        </div>
      </header>

      <ConnectionProvider endpoint={endpoints[network]}>
        <WalletProvider wallets={[]} autoConnect>
          <WalletModalProvider>
            <main className="max-w-2xl mx-auto px-4 py-6 space-y-6">
             <WalletMultiButton
  className="!bg-gradient-to-r !from-orange-500 !to-orange-400 !text-white !font-semibold 
  !px-6 !py-2 !rounded-full !shadow-md hover:!brightness-110 transition-all duration-200"
/>

              
              {network === "devnet" && <Airdrop />}
              {network === "mainnet" && <Trans />}

              <WalletDisconnectButton
  className="!bg-slate-700 hover:!bg-red-600 !text-white !px-6 !py-2 !rounded-full 
  !font-semibold !shadow-inner transition-all"
/>

            </main>
          </WalletModalProvider>
        </WalletProvider>
      </ConnectionProvider>
    </div>
  );
};

export default App;
