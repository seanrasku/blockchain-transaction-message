import "./App.css";
import React, { useState, useRef, useEffect } from "react";
import WordList from "./components/wordlist";

const ethers = require("ethers");
const abi = require("./smart_contracts/abi.json");
const bin = require("./smart_contracts/bin.json");
function App() {
  const [clear, setClear] = useState(false);
  const [error, setError] = useState(null);
  const [wallet, setWallet] = useState("");
  const [accountNum, setAccountNum] = useState("0");
  const [connected, setConnected] = useState(false);
  const [balance, setBalance] = useState("0");
  const [message, setMessage] = useState({
    other: "",
    message: "",
  });
  useEffect(() => {
    async function retrieveBalance() {
      if (wallet.address && connected) {
        const b = await wallet.getBalance();
        setBalance(ethers.utils.formatEther(b));
      }
    }
    retrieveBalance();
  });

  const childRef = useRef();

  async function createWallet() {
    try {
      setError(null);
      setConnected(false);
      const list = childRef.current.getWordList();
      const mnemonic =
        list[1] +
        " " +
        list[2] +
        " " +
        list[3] +
        " " +
        list[4] +
        " " +
        list[5] +
        " " +
        list[6] +
        " " +
        list[7] +
        " " +
        list[8] +
        " " +
        list[9] +
        " " +
        list[10] +
        " " +
        list[11] +
        " " +
        list[12];
      const path = `m/44'/60'/0'/0/${accountNum}`;
      const w = ethers.Wallet.fromMnemonic(mnemonic, path);
      setWallet(w);
      setClear(true);
    } catch (err) {
      console.error(err);
      setError("Invalid Mnemonic, try again");
    }
  }
  function reset() {
    setWallet("");
    setConnected(false);
    setError(null);
    setClear(false);
    setAccountNum("0");
    setBalance("0");
    setMessage({
      other: "",
      message: "",
    });
  }
  function connectProvider() {
    console.log(wallet);
    const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL);
    if (provider !== null && provider !== undefined) {
      setWallet(wallet.connect(provider));
      setConnected(true);
    }
  }
  async function contractCreate() {
    if (wallet.address && connected) {
      const contractFactory = new ethers.ContractFactory(abi, bin, wallet);
      console.log("deploying...");
      const contract = await contractFactory.deploy(
        message.other,
        message.message
      );
      await contract.deployTransaction.wait(1);
      console.log(`Address: ${contract.address}`);
      const p1 = await contract.person1();
      console.log(`Person 1: ${p1.toString()}`);
      const p2 = await contract.person2();
      console.log(`Person 1: ${p2.toString()}`);
      const msg = await contract.getMessage();
      console.log(`Message: ${msg.toString()}`);
    }
  }
  return (
    <>
      <div>
        <h2>My Wallet Address: {error === null ? wallet.address : error} </h2>
        <WordList submit={clear} ref={childRef} />
        <input
          type="text"
          placeholder="What account number?"
          onInput={(e) => setAccountNum(e.target.value)}
        />
        <button onClick={() => createWallet()}>Import A Wallet</button>
        <button onClick={() => reset()}>Reset Wallet</button>
        <h2>Connect To Provider: </h2>
        <p>Connection Status: {connected ? "Connected!" : "None Found"} </p>
        <button onClick={() => connectProvider()}>Connect</button>
      </div>
      <div>
        <h1>Wallet Transaction Requests</h1>
        <h3>Get Balance</h3>
        <p>
          {wallet.address}'s balance: {balance} ETH
        </p>

        <h3>Create Message Connection</h3>
        <input
          type="text"
          placeholder="Other Account Hex"
          onInput={(e) =>
            setMessage((prev) => ({
              ...prev,
              other: e.target.value,
            }))
          }
        />
        <input
          type="text"
          placeholder="Message"
          onInput={(e) =>
            setMessage((prev) => ({
              ...prev,
              message: e.target.value,
            }))
          }
        />
        <button onClick={() => contractCreate()}>
          Create Message Connection
        </button>
      </div>
    </>
  );
}

export default App;
