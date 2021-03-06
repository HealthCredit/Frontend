import styles from "../styles/Impact.module.css";
import React, { useState } from "react";
import Nav from "../components/Nav";
import Web3Modal from "web3modal";
import { ethers } from "ethers";
import abi from "../pages/abi/IMPACT.json";
import { Backdrop, CircularProgress } from "@mui/material";

function Impact() {
  const [currentUser, setCurrentUser] = useState("");
  const [amount, setAmount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const getContract = async () => {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();

    const accounts = await provider.listAccounts();
    let currentUserAddress = accounts[0];
    currentUserAddress = currentUserAddress.toLowerCase();
    setCurrentUser(currentUserAddress);
    const contractAddress = process.env.NEXT_PUBLIC_IMPACT_TOKEN_ADDRESS;
    const contractAbi = abi;

    const contract = await new ethers.Contract(
      contractAddress,
      contractAbi,
      signer
    );
    // console.log(contract);
    return contract;
  };
  let amt;
  const getImpact = async () => {
    setIsLoading(true);

    const contract = await getContract();

    if (amount > 0 && amount <= 1000) {
      let tx = await contract.getImpact(amount);
      tx.wait();
    } else {
      console.log("Cannot but more than 1000 impact tokrns");
    }
    setIsLoading(false);
    // console.log(currentUser);
  };
  return (
    <>
      <Nav />

      {/* {isLoading ? (
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={open}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      ) : (
        <div className={styles.container}>
          <h3>Enter amount of Impact tokens :-</h3>
          <div>
            <input
              type="number"
              onChange={(e) => {
                setAmount(+e.target.value);
              }}
              max="1000"
            />
            <button onClick={getImpact}>Buy Impact</button>
            <p>You can buy maximum 1000 Impact tokens</p>
          </div>
        </div>
      )} */}
      <div className={styles.container}>
        <h3>Enter amount of Impact tokens :-</h3>
        <div>
          <input
            type="number"
            onChange={(e) => {
              setAmount(e.target.value);
            }}
            max="1000"
          />
          <button onClick={getImpact}>Buy Impact</button>
          <p>You can buy maximum 1000 Impact tokens</p>
        </div>
      </div>
      {isLoading && (
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={open}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      )}
    </>
  );
}

export default Impact;
