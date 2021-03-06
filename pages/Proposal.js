import styles from "../styles/Proposal.module.css";
import Nav from "../components/Nav";
import { ethers } from "ethers";
import Web3Modal from "web3modal";
import { useState, useContext } from "react";
import abi from "../pages/abi/LYS.json";
import { Web3Storage } from "web3.storage";
import AppContext from "../components/AppContext";
import axios from "axios";
import { Backdrop, CircularProgress } from "@mui/material";

function Proposal() {
  const value = useContext(AppContext);
  const { currentAccount, accessToken } = value.state;
  const [userRegistration, setUserRegistration] = useState({
    orgName: "",
    countryName: "",
    description: "",
    LYSamount: 0,
  });
  const [formIsSubmitted, setFormIsSubmitted] = useState(false);
  const [projectId, setProjectId] = useState(); //if form is submitted we display "you proposal is submitted"
  const [isLoading, setIsLoading] = useState(false);
  const handleInput = (e) => {
    const name = e.target.name;
    const value = name === "LYSamount" ? +e.target.value : e.target.value;
    setUserRegistration({ ...userRegistration, [name]: value });
  };
  const formIsValid = () => {
    if (
      userRegistration.orgName.length !== 0 &&
      userRegistration.countryName.length !== 0 &&
      userRegistration.orgName.description !== 0 &&
      userRegistration.LYSamount > 0
    ) {
      return true;
    } else {
      return false;
    }
  };

  async function getContract() {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();

    const accounts = await provider.listAccounts();
    let currentUserAddress = accounts[0];
    // console.log(currentUserAddress);
    currentUserAddress = currentUserAddress.toLowerCase();
    const contractAddress = process.env.NEXT_PUBLIC_LYS_TOKEN_ADDRESS;
    const contractAbi = abi.abi;
    const contract = new ethers.Contract(contractAddress, contractAbi, signer);

    return contract;
  }

  // <!----------------------------------------------------START FILE UPLOAD LOGIC-------------------------------------------------------->
  // get access token from env
  function getAccessToken() {
    return process.env.NEXT_PUBLIC_WEB3STORAGE_TOKEN;
  }

  // start web3storage instance
  function makeStorageClient() {
    return new Web3Storage({ token: getAccessToken() });
  }

  // get files from user file inputs
  async function getFiles() {
    const fileInput = document.querySelectorAll('input[type="file"]');
    const tempFiles = [];
    const files = [];
    for (let i = 0; i < fileInput.length; i++) {
      tempFiles.push(fileInput[i].files);
    }

    for (let i = 0; i < tempFiles.length; i++) {
      files.push(tempFiles[i][0]);
    }
    files.push(await makeFileObjects());

    return files;
  }

  // create metadata.json
  async function makeFileObjects() {
    const obj = await generateMetadata();
    // * This is actually good, the json file would have the details arranged properly
    const blob = new Blob([JSON.stringify(obj)], {
      type: "application/json",
    });

    const file = new File([blob], "metadata.json");
    return file;
  }

  // upload files to web3storage
  async function storeFiles(files) {
    const client = makeStorageClient();
    const cid = await client.put(files);
    return cid;
  }

  // get image link to be added to imageUri in metadata.json
  async function getImageLink() {
    const fileInput = document.querySelector('input[type="file"]');

    // upload image
    const client = makeStorageClient();
    const cid = await client.put(fileInput.files);

    const imageUri = `https://${cid}.ipfs.dweb.link/${fileInput.files[0].name}`;

    return imageUri;
  }

  // generate metadata from user inputs
  async function generateMetadata() {
    const imageUri = await getImageLink();

    const metadata = {
      name: userRegistration.orgName,
      description: userRegistration.description,
      image: imageUri,
      attributes: [{ country: userRegistration.countryName }],
    };

    return metadata;
  }

  // submit form, save cid to database and make smart contract calls
  const submitForm = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (!formIsValid) {
      return;
    }
    // Here you write your upload logic or whatever you want

    // save cid to databse
    const cid = await storeFiles(await getFiles());
    const json = JSON.parse(
      JSON.stringify({ cid, walletAddress: currentAccount })
    );
    const cidLink = `https://${cid}.ipfs.dweb.link`;
    axios.post("https://healthcreditb.herokuapp.com/api/data/updateCid", json, {
      headers: accessToken,
    });

    // // make smart contract calls
    await createProposal(cidLink);
    // console.log(await getProposalId(cidLink));

    setFormIsSubmitted(true);
    setIsLoading(false);
  };

  const submittedForm = async (e) => {
    e.preventDefault();

    await getId();
  };

  // make proposal and get proposalId
  async function createProposal(detailUri) {
    const contract = await getContract();

    let proposalId = await contract.propose(
      detailUri,
      userRegistration.LYSamount
    );

    proposalId.wait();

    saveProposal();
  }

  // save proposal to database
  async function saveProposal() {
    const json = JSON.parse(
      JSON.stringify({
        walletAddress: currentAccount,
        lysamount: userRegistration.LYSamount,
      })
    );

    await axios.post(
      "https://healthcreditb.herokuapp.com/api/data/saveProject",
      json,
      {
        headers: accessToken,
      }
    );

    console.log(json);
  }

  // get proposal id
  async function getId() {
    const contract = await getContract();

    const getId = await contract.getProposalId(currentAccount);
    const convertedId = Number(getId._hex);

    const json = JSON.parse(
      JSON.stringify({ walletAddress: currentAccount, projectId: convertedId })
    );

    setProjectId(convertedId);

    await axios.post(
      "https://healthcreditb.herokuapp.com/api/data/saveProjectId",
      json,
      {
        headers: accessToken,
      }
    );

    console.log(json);
  }
  return (
    <>
      <Nav />
      <div className={styles.container}>
        <div>
          <h1>Submit proposal for approval</h1>
        </div>
        {!formIsSubmitted ? (
          <form action="" className={styles.form} onSubmit={submitForm}>
            <div className={styles.formBox}>
              <div className={styles.box}>
                <input
                  type="text"
                  placeholder="Enter name of org"
                  value={userRegistration.orgName}
                  onChange={handleInput}
                  name="orgName"
                />
              </div>
              <div className={styles.box}>
                <input
                  type="text"
                  placeholder="Enter name of country"
                  value={userRegistration.countryName}
                  onChange={handleInput}
                  name="countryName"
                />
              </div>
              <div className={styles.box}>
                <input
                  type="text"
                  placeholder="Short description"
                  value={userRegistration.description}
                  onChange={handleInput}
                  name="description"
                />
              </div>
              <div className={styles.box}>
                <input
                  type="number"
                  placeholder="Number of LYS token"
                  value={userRegistration.LYSamount}
                  onChange={handleInput}
                  name="LYSamount"
                />
              </div>
              <div className={styles.upload}>
                <span>Image</span>
                <input type="file" name="img" />
              </div>
              <div className={styles.upload}>
                <span>beneficieries list</span>
                <input type="file" name="file" />
              </div>
              <div className={styles.upload}>
                <span>Impact record</span>
                <input type="file" name="file" />
              </div>
              <div className={styles.submitBtn}>
                <button type="submit">Submit</button>
              </div>
            </div>
          </form>
        ) : (
          <div>
            <form action="" className={styles.form} onSubmit={submittedForm}>
              <h3>Your proposal Id is :- {projectId}</h3>
              <div className={styles.submitBtn}>
                <button type="submit">Get ProjectId</button>
              </div>
            </form>
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
    </>
  );
}

export default Proposal;
