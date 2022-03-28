import { defineStore } from "pinia";
import { ref, computed } from "vue";
import axios from "axios";
import { ethers } from "ethers";
import Web3Modal from "web3modal";

// export const useCounterStore = defineStore({
//   id: 'counter',
//   state: () => ({
//     counter: 0
//   }),
//   getters: {
//     doubleCount: (state) => state.counter * 2
//   },
//   actions: {
//     increment() {
//       this.counter++
//     }
//   }
// })

export const useConnection = defineStore("connect", () => {
  const connect = ref({
    isConnected: false,
    currentAccount: "",
    accessTokens: "",
  });

  const connectWallet = async () => {
    try {
      const { ethereum } = window;
      if (!ethereum) console.log("Install Metamask");

      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      if (accounts.length !== 0) {
        const web3Modal = new Web3Modal();
        const connection = await web3Modal.connect();
        const provider = new ethers.providers.Web3Provider(connection);
        const id = await provider.getNetwork();

        const accounts = await provider.listAccounts();
        let currentUserAddress = accounts[0];
        if (id.chainId === 80001) {
          connect.value.currentAccount = currentUserAddress;
          connect.value.isConnected = !connect.value.isConnected;
          console.log("Hello: ", connect.value.currentAccount);

          await axios
            .post("http://localhost:3001/api/authenticate", {
              walletAddress: connect.value.currentAccount,
            })
            .then((res) => {
              connect.value.accessTokens = res.data.access_token;
              console.log("tokens", connect.value.accessTokens);
            })
            .catch((error) => {
              console.log(error);
            });
        } else {
          console.log("Wrong network, switch to polygon mumbai");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  return {
    connect,
    connectWallet,
  };
});
