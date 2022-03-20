import styles from "./Nav.module.css";
import Link from "next/link";
import { ethers } from "ethers";
import { useState, useEffect } from "react";

const Nav = () => {
  const [isConnected, setIsConnected] = useState(false);
  const isWalletConnect = async () => {
    try {
      const { ethereum } = window;
      if (!ethereum) {
        console.log("Make sure you have MetaMask!");
        return;
      } else {
        console.log("We have the ethereum object", ethereum);
      }
      const accounts = await ethereum.request({ method: "eth_accounts" });
      if (accounts.length !== 0) {
        const account = accounts[0];
        console.log(account);
        setIsConnected(account);
      } else {
        console.log("No account found");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const connectWallet = async () => {
    try {
      const { ethereum } = window;
      if (!ethereum) {
        console.log("Install metamask");
        return;
      }
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      if (accounts.length !== 0) {
        const account = accounts[0];
        console.log(account);
        const provider = new ethers.providers.Web3Provider();
        const { chainId } = provider.getNetwork();
        if (chainId !== 137) {
          alert("Connect to mumbai network");
          throw new error("Connect to mumbai network");
          return;
        }
        setIsConnected(true);
      } else {
        console.log("No account found");
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    isWalletConnect();
  }, []);
  return (
    <>
      <nav className={styles.navbar}>
        <ul className={styles.navbarLeft}>
          <li className={styles.navBtn}>
            <Link href="/">Home</Link>
          </li>
          <li className={styles.navBtn}>
            <Link href="/Impact">Buy Impact</Link>
          </li>
          <li className={styles.navBtn}>
            <Link href="/LYS">Buy LYS</Link>
          </li>
          <li className={styles.navBtn}>
            <Link href="/Proposal">Issue project</Link>
          </li>
          <li className={styles.navBtn}>
            <Link href="/Approove">Approve project</Link>
          </li>
        </ul>
        <div className={styles.loginBtn}>
          {!isConnected && (
            <button onClick={connectWallet}>Wallet login</button>
          )}
        </div>
      </nav>
    </>
  );
};
export default Nav;
