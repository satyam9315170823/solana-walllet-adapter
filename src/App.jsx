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
  return (
    <ConnectionProvider endpoint={"https://api.devnet.solana.com"}>
      <WalletProvider wallets={[]} autoConnect>
        <WalletModalProvider>
          <WalletMultiButton>
            Connect to wallet
          </WalletMultiButton>
            <Airdrop />
            <WalletDisconnectButton>disconnect wallet</WalletDisconnectButton>
          
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
};

export default App;
