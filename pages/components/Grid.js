import React from "react";
import Proposal from "../Proposal";
import styles from "./Grid.module.css";

function Grid({ obj }) {
  return (
    <div className={styles.container}>
      <div>
        <p>{obj.id}</p>
      </div>
      <div>
        <p>{obj.link}</p>
      </div>
      <div>
        <p>{obj.status}</p>
      </div>
    </div>
  );
}

export default Grid;
