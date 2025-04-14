import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";

import {
  
  WalletDisconnectButton,
  WalletModalProvider,
  WalletMultiButton
} from '@solana/wallet-adapter-react-ui';

import "@solana/wallet-adapter-react-ui/styles.css";

import Airdrop from "./Airdrop";

const App = () => {
  return (<div className="flex items-center justify-center h-screen" >
    <ConnectionProvider endpoint={"https://api.devnet.solana.com"}>
      <WalletProvider wallets={[]} autoConnect>
        <WalletModalProvider>
          <div className="flex flex-col items-center space-y-5 p-6 bg-gray-100 rounded-lg shadow-lg">
            <h1 className="font-mono font-bold text-4xl  mb-6 text-gray-700 ">DappNation</h1>
          <WalletMultiButton>
            Connect to wallet
          </WalletMultiButton>
            <Airdrop />
            <WalletDisconnectButton>disconnect wallet</WalletDisconnectButton>
          </div>
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
</div>
  );
};

export default App;
