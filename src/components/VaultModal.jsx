import { useAbstraxionAccount, useAbstraxionSigningClient } from "@burnt-labs/abstraxion";
import { useEffect, useState, useCallback } from "react";
import { parseMantra, WBTC_Token, WBTC_Vault, WETH_Token, WETH_Vault } from "../constants";

const VAULT_CONFIG = {
  "WBTC Vault": { token: WBTC_Token, vault: WBTC_Vault, logo: "https://cryptologos.cc/logos/bitcoin-btc-logo.png" },
  "WETH Vault": { token: WETH_Token, vault: WETH_Vault, logo: "https://www.cdnlogo.com/logos/e/35/ethereum-blue.svg" },
};

export default function VaultModal({ isOpen, onClose, vault }) {
  const [amount, setAmount] = useState("");
  const [activeTab, setActiveTab] = useState("deposit");
  const [balance, setBalance] = useState(0);
  const [loading, setLoading] = useState(false);
  const { data: { bech32Address } } = useAbstraxionAccount();
  const { client } = useAbstraxionSigningClient();

  const fetchBalance = useCallback(async () => {
    if (!client || !bech32Address || !vault) return;

    const config = VAULT_CONFIG[vault.name];
    if (!config) return;

    const { token, vault: vaultAddress } = config;
    const contractAddress = activeTab === "deposit" ? token : vaultAddress;
    const balanceMsg = activeTab === "deposit" 
      ? { balance: { address: bech32Address } }
      : { get_balance_of: { address: bech32Address } };

    try {
      const balanceRes = await client.queryContractSmart(contractAddress, balanceMsg);
      setBalance(activeTab === "deposit" ? balanceRes.balance / 1e6 : balanceRes / 1e6);
    } catch (error) {
      console.error("Error fetching balance:", error);
    }
  }, [client, bech32Address, vault, activeTab]);

  useEffect(() => {
    if (isOpen) fetchBalance();
  }, [isOpen, activeTab, loading, fetchBalance]);

  const handleSubmit = async () => {
    if (!client || !bech32Address || !vault) return;

    const config = VAULT_CONFIG[vault.name];
    if (!config) return;

    const { token, vault: vaultAddress } = config;
    setLoading(true);

    try {
      if (activeTab === "deposit") {
        await executeDeposit(token, vaultAddress);
      } else {
        await executeWithdraw(vaultAddress);
      }
    } catch (error) {
      console.error("Transaction failed:", error);
    } finally {
      setLoading(false);
    }
  };

  const executeDeposit = async (token, vaultAddress) => {
    const allowanceMsg = {
      increase_allowance: {
        spender: vaultAddress,
        amount: parseMantra(amount).toString(),
      },
    };

    await executeTransaction(token, allowanceMsg);

    const depositMsg = {
      deposit: {
        amount: parseMantra(amount).toString(),
      },
    };

    await executeTransaction(vaultAddress, depositMsg);
  };

  const executeWithdraw = async (vaultAddress) => {
    const withdrawMsg = {
      withdraw: {
        share: parseMantra(amount).toString(),
      },
    };

    await executeTransaction(vaultAddress, withdrawMsg);
  };

  const executeTransaction = async (contractAddress, msg) => {
    await client.execute(
      bech32Address,
      contractAddress,
      msg,
      {
        amount: [{ amount: "0", denom: "uxion" }],
        gas: "500000",
        granter: "xion1h82c0efsxxq4pgua754u6xepfu6avglup20fl834gc2ah0ptgn5s2zffe9",
      },
      "",
      []
    );
  };

  if (!isOpen || !vault) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-gray-900 border border-gray-800 rounded-lg max-w-[425px] w-full">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-white">Manage {vault.name}</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-white">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="mb-4">
            <div className="flex border-b border-gray-700">
              {["deposit", "withdraw"].map((tab) => (
                <button
                  key={tab}
                  className={`py-2 px-4 ${
                    activeTab === tab
                      ? "text-purple-500 border-b-2 border-purple-500"
                      : "text-gray-400"
                  }`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="flex-grow p-2 bg-gray-800 border border-gray-700 rounded text-white"
              />
              <button
                onClick={() => setAmount(balance.toString())}
                className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded"
              >
                Max
              </button>
            </div>
            <div className="flex justify-between text-sm text-gray-400">
              <span>APY: {vault.apy}%</span>
              <span>TVL: {vault.tvl}k</span>
            </div>
            <div className="flex items-center gap-1 text-sm text-gray-400">
              {VAULT_CONFIG[vault.name] && (
                <img
                  src={VAULT_CONFIG[vault.name].logo}
                  alt={`${vault.name} logo`}
                  width={20}
                  height={4}
                />
              )}
              <span>Balance: {balance}</span>
            </div>
            <button
              className="w-full py-2 bg-purple-600 hover:bg-purple-700 text-white rounded"
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? "Processing..." : (activeTab === "deposit" ? "Deposit" : "Withdraw")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

