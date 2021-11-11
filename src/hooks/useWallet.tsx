import { useCallback, useEffect, useState } from "react";
import Web3 from "web3";

let web3: any;

export const useWallet = () => {
  const [state, setState] = useState({
    balance: 0,
    account: "",
    errorAccount: "",
    isInitialized: false,
  });
  // @ts-ignore: Unreachable code error
  const provider = window.ethereum;
  web3 = new Web3(provider);

  const getOwnBalance = async (address: string) => {
    try {
      web3.eth.getBalance(address, (err: any, balance: any) => {
        if (err) {
          setState({
            ...state,
            errorAccount: "Something is wrong with MetaMask",
          });
        } else {
          const balanceUpdated = web3.utils.fromWei(balance, "ether");
          setState({ ...state, balance: balanceUpdated });
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  const sendTransaction = async (to: string, amount: string) => {
    try {
      web3.eth
        .sendTransaction({
          from: state.account,
          to,
          value: web3.utils.toWei(amount, "ether"),
          gasLimit: 21000,
          gasPrice: 20000000000,
        })
        .then((receipt: any) => {
          if (receipt) getOwnBalance(state.account);
        });
    } catch (error) {
      setState({ ...state, errorAccount: "Check the destination address" });
    }
  };

  const init = useCallback(async () => {
    if (typeof provider !== "undefined") {
      provider
        .request({ method: "eth_requestAccounts" })
        .then((accounts: any) => {
          return setState({
            ...state,
            account: accounts[0],
            isInitialized: true,
          });
        })
        .catch((err: any) => {
          if (err)
            setState({
              ...state,
              errorAccount: "Please connect with MetaMask",
            });
        });
    }
    return setState({ ...state, isInitialized: false });
  }, [provider, state]);

  useEffect(() => {
    init();
  }, [init]);

  return [getOwnBalance, state, sendTransaction];
};
