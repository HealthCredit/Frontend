import React, { useContext, useState } from "react";
import { ethers } from "ethers";
import Web3Modal from "web3modal";
import abi from "../pages/abi/LYS.json";
import Link from "next/link";
import styles from "./Grid.module.css";
import AppContext from "./AppContext";
import axios from "axios";
import { Backdrop, CircularProgress } from "@mui/material";

function Grid({ obj, hasImpact }) {
  const [isLoading, setIsLoading] = useState(false);
  const value = useContext(AppContext);
  const { accessToken } = value.state;

  async function approveProject(projectId) {
    setIsLoading(true);
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();

    const accounts = await provider.listAccounts();
    let currentUserAddress = accounts[0];
    currentUserAddress = currentUserAddress.toLowerCase();
    const contractAddress = process.env.NEXT_PUBLIC_LYS_TOKEN_ADDRESS;
    const contractAbi = abi.abi;

    const contract = new ethers.Contract(contractAddress, contractAbi, signer);
    let approveProposal = await contract.approoveProposal(projectId, true);

    await approveApi(projectId);
    setIsLoading(false);
  }

  async function approveApi(projectId) {
    const json = JSON.parse(JSON.stringify({ projectId }));

    await axios.post(
      "https://healthcreditb.herokuapp.com/api/data/approveProject",
      json,
      {
        headers: accessToken,
      }
    );

    // console.log(json);
  }

  // ToDo: Make approve page refresh/refetch data after a project is approved.

  return (
    <div className={styles.container}>
      <div>
        <p> {obj.id} </p>
      </div>
      {
        <div>
          {obj.link.map((item, index) => {
            return (
              <Link key={index} href={item}>
                <a>{index ? ", " : ""}Download</a>
              </Link>
            );
          })}
        </div>
      }
      {hasImpact ? (
        <div>
          <button onClick={() => approveProject(obj.projectId)}>Approve</button>
        </div>
      ) : (
        <div>
          <button disabled>Approve</button>
        </div>
      )}
      {isLoading && (
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={open}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      )}
    </div>
  );
}

export default Grid;
