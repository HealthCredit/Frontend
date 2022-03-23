import React, { useState, useEffect } from "react";
import Grid from "./components/Grid";
import styles from "../styles/Approove.module.css";
import Nav from "./components/Nav";
import abi from "./abi/IMPACTabi.json";
import { ethers } from "ethers";

function Approve() {
  const [userHasImpact, setUerHasImpact] = useState(false);

  let arr = [
    {
      id: 1,
      link: "http://google.com",
      status: "pending",
    },
    {
      id: 2,
      link: "http://google.com",
      status: "pending",
    },
    {
      id: 2,
      link: "http://google.com",
      status: "pending",
    },
    {
      id: 3,
      link: "http://google.com",
      status: "pending",
    },
    {
      id: 4,
      link: "http://google.com",
      status: "pending",
    },
  ];
  const renderProposalForImpactHolder = () => {
    return arr.map((element, index) => {
      return <Grid key={index} obj={element} hasImpact={true} />;
    });
  };
  const renderProposalForNonImpactHolder = () => {
    return arr.map((element, index) => {
      return <Grid key={index} obj={element} hasImpact={false} />;
    });
  };

  const verifyImpact = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const accounts = await provider.listAccounts();
    let currentUserAddress = accounts[0];
    console.log(currentUserAddress);
    currentUserAddress = currentUserAddress.toLowerCase();
    console.log(currentUserAddress);
    const contractAddress = "0x028E2a8C28AC1f5C6af8A8c5B32B08760a806f12";
    const contractAbi = abi.abi;

    const signer = provider.getSigner();
    const contract = await new ethers.Contract(
      contractAddress,
      contractAbi,
      signer
    );
    let tx = await contract.balanceOf(currentUserAddress);
    if (tx > 0) {
      setUerHasImpact(true);
      console.log("User has impact");
    } else {
      setUerHasImpact(false);
      console.log("User not have impacts");
    }
  };
  useEffect(() => {
    verifyImpact();
  }, []);

  return (
    <>
      <Nav />
      <div className={styles.container}>
        <h1>Projects pending for approvals</h1>
        {userHasImpact && (
          <div className={styles.table}>{renderProposalForImpactHolder()}</div>
        )}
        {!userHasImpact && (
          <div className={styles.table}>
            {renderProposalForNonImpactHolder()}
          </div>
        )}
      </div>
    </>
  );
}

export default Approve;
