import { Buffer } from "buffer";
if (!window.Buffer) window.Buffer = Buffer;
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { PublicKey, SystemProgram, Transaction } from "@solana/web3.js";
import { useState, useEffect } from "react";



const Airdrop = () => {
  const wallet = useWallet();
  const { connection } = useConnection();
   const [transactionAmount, setTransactionAmount] = useState("");
  const [transactionPublicKey, setTransactionPublicKey] = useState("");
  const [amount, setAmount] = useState("");
  const [balance, setBalance] = useState(null);
  const publicKey = wallet.publicKey;

  const fetchBalance = async () => {
    if (!publicKey || !connection) return;
    try {
      const lamports = await connection.getBalance(publicKey);
      setBalance(lamports / 1_000_000_000);
    } catch (error) {
      console.error("Failed to fetch balance:", error);
    }
  };

  useEffect(() => {
    fetchBalance();
  }, [publicKey, connection]);

 async function sendTransaction() {
    try {
      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: publicKey,
          toPubkey: new PublicKey(transactionPublicKey),
          lamports: transactionAmount * 1_000_000_000,
        })
      );
      await wallet.sendTransaction(transaction, connection);
      alert(`Sent ${transactionAmount} SOL to ${transactionPublicKey}`);
      setTransactionAmount("");
      setTransactionPublicKey("");
      setTimeout(fetchBalance, 5000);
    } catch (error) {
      console.error("Transfer failed", error);
      alert("Transfer failed");
    }
  }


  const send = async () => {
    if (!publicKey || !connection) {
      alert("Wallet not connected!");
      return;
    }

    try {
      const lamports = parseFloat(amount) * 1_000_000_000;
      const tx = await connection.requestAirdrop(publicKey, lamports);
      alert(`Airdrop requested! TX: ${tx}`);
      setAmount("");
      setTimeout(fetchBalance, 5000);
    } catch (error) {
      alert("Airdrop failed. See console.");
      console.error(error);
      setAmount("");
    }
  };

  return (
    <div className="bg-slate-800/70 p-6 rounded-lg border border-slate-700 shadow-lg backdrop-blur-sm space-y-4">
      <h2 className="text-xl font-bold text-orange-400">🔸 Devnet Airdrop</h2>
      <div className="space-y-1">
        <p className="text-sm text-slate-300">Wallet Address:</p>
        <p className="text-xs text-blue-400 break-words">{publicKey?.toString() || "Not connected"}</p>
        <p className="text-slate-300 text-base leading-relaxed">
  Balance: <span className="text-blue-400 font-mono">{balance} SOL</span>
</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <input
          type="number"
          placeholder="Amount in SOL"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="flex-1 bg-slate-700 text-white px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={send}
          className="bg-orange-500 hover:bg-orange-600 px-4 py-2 rounded text-white font-semibold"
        >
          Airdrop
        </button>
      </div>
      {/* ttrabs */}
      <div className="bg-slate-800/70 p-6 rounded-lg border border-slate-700 shadow-lg backdrop-blur-sm space-y-4">
      <h2 className="text-xl font-bold text-blue-400">🔹 Transfer SOL</h2>
      <div className="space-y-1">
       
      </div>

      <div className="flex flex-col gap-3">
        <input
          type="text"
          placeholder="Recipient's Public Key"
          value={transactionPublicKey}
          onChange={(e) => setTransactionPublicKey(e.target.value)}
          className="bg-slate-700 text-white px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="number"
          placeholder="Amount in SOL"
          value={transactionAmount}
          onChange={(e) => setTransactionAmount(e.target.value)}
          className="bg-slate-700 text-white px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={sendTransaction}
          className="bg-orange-500 hover:bg-orange-600 px-4 py-2 rounded text-white font-semibold"
        >
          Send
        </button>
      </div>
    </div>
      {/* tran end */}
    </div>
  );
};

export default Airdrop;
