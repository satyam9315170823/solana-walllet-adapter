import { Buffer } from "buffer";
if (!window.Buffer) window.Buffer = Buffer;

import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { useState, useEffect } from "react";

const Airdrop = () => {
  const wallet = useWallet();
  const { connection } = useConnection();
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
      <Trans />
    </div>
  );
};

export default Airdrop;
