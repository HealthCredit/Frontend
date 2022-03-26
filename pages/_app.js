import "../styles/globals.css";
import { AppWrapper } from "../components/AppContext";
import { useState } from "react";
// require("dotenv").config();

function MyApp({ Component, pageProps }) {
  const [isConnected, setIsConnected] = useState(false);
  const [currentAccount, setCurrentAccount] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const [userHasImpact, setUerHasImpact] = useState(false);
  const [projects, setProjects] = useState([]);

  return (
    <AppWrapper.Provider
      value={{
        state: {
          isConnected,
          currentAccount,
          accessToken,
          userHasImpact,
          projects,
        },
        setIsConnected,
        setCurrentAccount,
        setAccessToken,
        setUerHasImpact,
        setProjects,
      }}
    >
      <Component {...pageProps} />
    </AppWrapper.Provider>
  );
}

export default MyApp;
