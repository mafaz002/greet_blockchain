import { useState, useEffect } from "react";
import { ethers } from "ethers";
import Greet from "./artifacts/contracts/Greet.sol/Greet.json";

const CONTRACT_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

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
      const contract = new ethers.Contract(CONTRACT_ADDRESS, Greet.abi, signer);
      try {
        const tx = await contract.update(msg);
        await tx.wait();
        fetchGreeting();
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
