import { useState, useEffect } from "react";
import { ethers } from "ethers";
import Greet from "./artifacts/contracts/Greet.sol/Greet.json";

const HARDHAT_CONTRACT_ADDRESS = "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0";

function App() {
  const [message, setMessage] = useState("");
  const [msg, setMsg] = useState("");

  useEffect(() => {
    fetchGreeting();
  }, []);

  const fetchGreeting = async () => {
    if (typeof window.ethereum !== "undefined") {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(
        CONTRACT_ADDRESS,
        Greet.abi,
        provider
      );
      try {
        const message = await contract.greet();
        setMessage(message);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const requestAccount = async () => {
    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      console.log(accounts);
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdate = async () => {
    if (msg && typeof window.ethereum !== "undefined") {
      requestAccount();
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        HARDHAT_CONTRACT_ADDRESS,
        Greet.abi,
        signer
      );
      try {
        const tx = await contract.update(msg);
        await tx.wait();
        fetchGreeting();
        setMsg("");
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <>
      <div>{message}</div>
      <input value={msg} onChange={(event) => setMsg(event.target.value)} />
      <button onClick={handleUpdate}>update</button>
    </>
  );
}

export default App;
