import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { useState, useEffect } from "react";

const Airdrop = () => {
  const wallet = useWallet();
  const { connection } = useConnection();
  const [amount, setAmount] = useState("");
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

      // Wait a bit and refresh balance
      setTimeout(fetchBalance, 5000);
    } catch (error) {
      console.error("Airdrop failed:", error);
      alert("Airdrop failed! Check console for details.");
    }
  }

  return (
    <div>
      <p>Hi Mr. {publicKey ? publicKey.toString() : "Not connected"}</p>
      <p>Balance: {balance !== null ? `${balance} SOL` : "Fetching..."}</p>
      <input
        type="number"
        placeholder="Amount in SOL"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <button onClick={send}>Airdrop</button>
    </div>
  );
};

export default Airdrop;
