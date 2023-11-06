import React, { useState, useEffect } from "react";
import Web3Modal from "web3modal";
import { ethers } from "ethers";
import axios from "axios";
import { useRouter } from "next/router";
import {
  TokenAddress,
  StakeAddress,
  NFTAddress,
  NFTAbi,
  StakeAbi,
  TokenAbi,
} from "../constants";

const ContractContext = React.createContext();
export function ContractProvider({ children }) {
  const router = useRouter();
  const [currentAccount, setCurrentAccount] = useState("");

  const checkIfWalletIsConnected = async () => {
    const { ethereum } = window;

    if (!ethereum) {
      return;
    }
    try {
      await ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: "0x61" }],
      });
    } catch (switchError) {
      if (switchError.code === 4902) {
        await ethereum.request({
          method: "wallet_addEthereumChain",
          params: [
            {
              chainId: "0x61",
              chainName: "BSC Testnet",
              nativeCurrency: {
                name: "BNB",
                symbol: "BNB",
                decimals: 18,
              },
              rpcUrls: ["https://data-seed-prebsc-1-s1.binance.org:8545/"],
              blockExplorerUrls: ["https://testnet.bscscan.com/"],
            },
          ],
        });
      }
    }

    const accounts = await ethereum.request({ method: "eth_accounts" });

    if (accounts.length !== 0) {
      const account = accounts[0];

      setCurrentAccount(account);
    }
  };
  useEffect(() => {
    checkIfWalletIsConnected();
  }, [currentAccount]);

  const connectWallet = async () => {
    const { ethereum } = window;

    if (!ethereum) {
      return;
    }
    await ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: "0x61" }],
    });
    const accounts = await ethereum.request({ method: "eth_accounts" });
    setCurrentAccount(accounts[0]);
    window.location.reload();
  };

  return (
    <ContractContext.Provider
      value={{
        currentAccount,
        connectWallet,
      }}
    >
      {children}
    </ContractContext.Provider>
  );
}
