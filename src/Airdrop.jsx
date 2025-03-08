
import { Buffer } from "buffer";

if (!window.Buffer) {
  window.Buffer = Buffer;
}


import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { PublicKey, SystemProgram, Transaction } from "@solana/web3.js";
import { useState, useEffect } from "react";

const Airdrop = () => {
  const wallet = useWallet();
  const { connection } = useConnection();
  const [amount, setAmount] = useState("");
  const [transactionAmount, setTransactionAmount] = useState("");
  
  const [transactionPublicKey, setTransactionPublicKey] = useState("");

  const [balance, setBalance] = useState(null);

  const publicKey = wallet.publicKey ? wallet.publicKey : null;

  // Function to fetch balance
  const fetchBalance = async () => {
    if (!publicKey || !connection) return;
    try {
      const lamports = await connection.getBalance(publicKey);
      setBalance(lamports / 1_000_000_000); // Convert lamports to SOL
    } catch (error) {
      console.error("Failed to fetch balance:", error);
    }
  };

  

  // Fetch balance when wallet connects
  useEffect(() => {
    fetchBalance();
  }, [publicKey, connection]);

  // Function to request an airdrop
  async function send() {
    if (!publicKey || !connection) {
      alert("Wallet not connected!");
      return;
    }

    try {
      const lamports = parseFloat(amount) * 1_000_000_000; // Convert SOL to lamports
      const tx = await connection.requestAirdrop(publicKey, lamports);
      alert(`Airdrop requested! Transaction: ${tx}`);
      setAmount("");

      // Wait a bit and refresh balance
      setTimeout(fetchBalance, 5000);
    } catch (error) {
      console.error("Airdrop failed:", error);
      alert("Airdrop failed! Check console for details.");
      setAmount("");
    }
  }
  async function  sendTransaction() {
    const transaction= new Transaction();
    transaction.add(SystemProgram.transfer({
      fromPubkey:publicKey,
       toPubkey: new PublicKey (transactionPublicKey),
       lamports:transactionAmount *  1_000_000_000
    }));
    await wallet.sendTransaction(transaction,connection);
    alert(`sent ${transactionAmount} to ${transactionPublicKey} `)
  setTransactionAmount('');
  setTransactionPublicKey('')
  }

  return (
    <div className="flex flex-col w-full p-4">
      {/* Wallet Info - Full width on all screens */}
      <div className="w-full mb-4">
        <p className="font-semibold text-slate-800 font-mono break-all">
          Public key:- {publicKey ? publicKey.toString() : "Not connected"}
        </p>
        <p className="font-mono">
          Balance:- {balance !== null ? `${balance} SOL` : "Fetching..."}
        </p>
      </div>

      {/* Input/Button Section - Flex column on mobile, row on larger screens */}
      <div className="flex  flex-col md:flex-row justify-center items-center w-full gap-3">
        <input
          className="px-3 py-2 bg-slate-100 border rounded-md border-blue-500 w-full md:w-auto"
          type="number"
          placeholder="Amount in SOL"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <button
          className="p-2 bg-gray-300 rounded-md border border-gray-700 w-full md:w-auto"
          onClick={send}
        >
          Airdrop
        </button>

        <input
          className="px-3 py-2 mt-5 md:mt-0 bg-slate-100 border rounded-md border-blue-500 w-full md:w-auto"
          type="text"
          placeholder="Public key"
          value={transactionPublicKey}
          onChange={(e) => setTransactionPublicKey(e.target.value)}
        />
        
        <input
          className="px-3 py-2 bg-slate-100 border rounded-md border-blue-500 w-full md:w-auto"
          type="number"
          placeholder="Amount in SOL"
          value={transactionAmount}
          onChange={(e) => setTransactionAmount(e.target.value)}
        />
        
        <button
          className="p-2 bg-gray-300 rounded-md border border-gray-700 w-full md:w-auto"
          onClick={sendTransaction}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Airdrop;
