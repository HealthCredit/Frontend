import Nav from "./components/Nav";
import styles from "../styles/LYS.module.css";
import { useState } from "react";
import abi from "./abi/LYSabi.json";

function LYS() {
  const [id, setId] = useState();
  const [isEligible, setIsEligible] = useState(true); //it is used as a flag whether current logged in user is owner of the id he entered or not.
  const issueLYS = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    // const link=`https://testnets.opensea.io/assets/mumbai/0xFcD3C90F4B8F4E07454f4E67579809b718EbeDF7/${id}`;
    const accounts = await provider.listAccounts();
    let currentUserAddress = accounts[0];
    currentUserAddress = currentUserAddress.toLowerCase();
    console.log(currentUserAddress);
    const contractAddress = "0xFcD3C90F4B8F4E07454f4E67579809b718EbeDF7";
    const contractAbi = abi.abi;

    const signer = provider.getSigner();
    const contract = await new ethers.Contract(
      contractAddress,
      contractAbi,
      signer
    );
    const ownerOfProposalId = await contract.getProposalAddress(id);
    if (currentUserAddress !== ownerOfProposalId) {
      setIsEligible(false);
      console.log(
        "You are not the owner of this proposal id so you cant mint LYS for it"
      );
      return;
    }
    let proposalArr = await contract.getAllProposal();
    proposalArr = await proposal.toArray();
    const amount = proposalArr[id - 1].LYStokenAmount.toNumber();
    setIsEligible(true);
    const res = await contract.mint(id, amount);

    //here you write logic for setUri()....id will be same but uri will come from backend/database
  };

  return (
    <>
      <Nav />
      <div className={styles.container}>
        <h3>Enter Id of proposal you want to issue LYS of :-</h3>
        <input type="number" onChange={(e) => setId(+e.target.value)} />
        <button onClick={issueLYS}>Issue</button>
        <p>
          <span>Note :- </span>
          Make sure your proposal is approved by impact holders and you are the
          owner of the entered proposal Id
        </p>
        {!isEligible && <p>You are not the owner of this proposal</p>}
      </div>
    </>
  );
}

export default LYS;
