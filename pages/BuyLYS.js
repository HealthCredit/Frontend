import React, { useState } from "react";
import Nav from "./components/Nav";
import styles from "../styles/BuyLYS.module.css";

function BuyLYS() {
  const [id, setId] = useState(0);
  return (
    <>
      <Nav />
      <div className={styles.container}>
        <h3>Enter Id of LYS token you want to buy</h3>
        <div>
          <input type="number" onChange={(e) => setId(+e.target.value)}></input>
          {id !== 0 && (
            <button>
              <a
                href={`https://testnets.opensea.io/assets/mumbai/0xFcD3C90F4B8F4E07454f4E67579809b718EbeDF7/${id}`}
              >
                Buy
              </a>
            </button>
          )}
        </div>
      </div>
    </>
  );
}

export default BuyLYS;
