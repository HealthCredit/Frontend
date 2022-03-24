import React, { useState } from "react";
import Nav from "./components/Nav";
import styles from "../styles/MintLYS.module.css";
import { ethers } from "ethers";
import abi from "../pages/abi/LYSabi.json";

function MintLYS() {
  const [id, setId] = useState(0);
  const [uri, setUri] = useState("");

  const getContract = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const accounts = await provider.listAccounts();
    let currentUserAddress = accounts[0];
    // console.log(currentUserAddress);
    currentUserAddress = currentUserAddress.toLowerCase();
    // console.log(currentUserAddress);
    const contractAddress = "0xb35BaF35DfD02Ad4fac9430981cEE413698cC242";
    const contractAbi = abi.abi;

    const signer = provider.getSigner();
    const contract = await new ethers.Contract(
      contractAddress,
      contractAbi,
      signer
    );
  };
  const mint = async () => {
    const contract = await getContract();
    //get the uri for metadata from backend and call the mint func of contract with the id entered
  };
  return (
    <>
      <Nav />
      <div className={styles.container}>
        <h3>Enter proposal Id of which you want to mint LYS token:</h3>
        <div>
          <input
            type="number"
            onChange={(e) => {
              setId(e.target.value);
            }}
          />
          <button onClick={mint}>Mint</button>
          <p>Make sure you are the owner of this proposal Id.</p>
        </div>
      </div>
    </>
  );
}

export default MintLYS;
