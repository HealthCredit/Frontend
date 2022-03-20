import  {ethers}  from "ethers";


const getContract=async()=>{
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer=provider.getSigner();
    const contract=new ethers.Contract(contractAddress,contractAbi,provider);
    return contract;
}
let contract=getContract();
export default contract;