import styles from "./Nav.module.css";
import Link from "next/link";
import { ethers } from "ethers";
import { useState, useEffect } from "react";
// import { ConnectWallet } from "./ConnectWallet";

const Nav = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [currentAccount, setCurrentAccount] = useState("");
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
      const provider = new ethers.providers.Web3Provider(ethereum);
      const Id = await provider.getNetwork();
      if (Id.chainId !== 80001) {
        console.log("connect to mumbai testnet");
        alert("Connect to mumbai network");
        throw new error("Connect to mumbai network");
      }

      if (accounts.length !== 0) {
        const account = accounts[0];
        console.log(account);

        if (Id.chainId === 80001) {
          setCurrentAccount(account);
          setIsConnected(true);
        }
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
        console.log("Logging in..");
        const provider = new ethers.providers.Web3Provider(ethereum);
        const Id = await provider.getNetwork();
        console.log(Id.chainId);
        // const provider = new ethers.providers.getDefaultProvider(ethereum);
        // const { chainId } = provider.
        // console.log(chainId);
        if (Id.chainId !== 80001) {
          console.log("connect to mumbai testnet");
          alert("Connect to mumbai network");
          throw new error("Connect to mumbai network");
        }
        if (Id.chainId === 80001) {
          setCurrentAccount(account);
          setIsConnected(true);
        }
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
          {isConnected && (
            <>
              <li className={styles.navBtn}>
                <Link href="/Proposal">Propose project</Link>
              </li>
              <li className={styles.navBtn}>
                <Link href="/Approve">Approve project</Link>
              </li>
              <li className={styles.navBtn}>
                <Link href="/MintLYS">Mint LYS</Link>
              </li>

              <li className={styles.navBtn}>
                <Link href="/BuyLYS">Buy LYS</Link>
              </li>
              <li className={styles.navBtn}>
                <Link href="/Impact">Get Impact</Link>
              </li>
            </>
          )}
        </ul>
        <div className={styles.loginBtn}>
          {!isConnected && (
            <button onClick={connectWallet}>Wallet login</button>
          )}
          {isConnected && (
            <div>
              <p className={styles.logIn}>
                Logged in(
                <span>
                  {currentAccount.slice(0, 4)}....{currentAccount.slice(-4)}
                </span>
                )
              </p>
            </div>
          )}
        </div>
      </nav>
    </>
  );
};
export default Nav;
