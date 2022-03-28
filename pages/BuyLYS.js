import React, { useState } from "react";
import Nav from "../components/Nav";
import styles from "../styles/BuyLYS.module.css";
import { ethers } from "ethers";
import abi from "./abi/LYS.json";

function BuyLYS() {
  const [id, setId] = useState(0);
  const [LYSexist, setLYSexist] = useState(0);

  const getContract = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const accounts = await provider.listAccounts();
    let currentUserAddress = accounts[0];
    // console.log(currentUserAddress);
    currentUserAddress = currentUserAddress.toLowerCase();
    // console.log(currentUserAddress);
    const contractAddress = "0x8c8d06991646A9701266794a385Db4b576E2678D";
    const contractAbi = abi.abi;

    const signer = provider.getSigner();
    const contract = await new ethers.Contract(
      contractAddress,
      contractAbi,
      signer
    );
    // console.log(contract);
    return contract;
  };
  const checkLYSexist = async () => {
    const contract = await getContract();
    // console.log(contract);
    const uri = await contract.uri(id);
    if (uri.length === 0) {
      // console.log("LYS of this token id does not exist");
      setLYSexist(1);
    } else {
      // console.log("LYS of this token id exist");
      setLYSexist(2);
    }
  };

  return (
    <div>
      <Nav />
      <div className={styles.container}>
        <h3>Enter Id of LYS token you want to buy</h3>
        <div>
          <input
            type="number"
            onChange={(e) => {
              setId(e.target.value);
            }}
          />
          <button onClick={checkLYSexist}>Check availibility</button>
        </div>
        {LYSexist === 2 && (
          <>
            <h4>LYS of this Id is available</h4>
            <button>
              <a
                href={`https://testnets.opensea.io/assets/0x8c8d06991646A9701266794a385Db4b576E2678D/${id}`}
              >
                Buy
              </a>
            </button>
          </>
        )}
        {LYSexist === 1 && <h4>LYS of this Id does not exist</h4>}
      </div>
    </div>
  );
}

export default BuyLYS;
