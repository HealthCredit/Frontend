import React from "react";
import Grid from "./components/Grid";
import styles from "../styles/Approove.module.css";
import Nav from "./components/Nav";

function Approove() {
  let arr = [
    {
      id: 1,
      link: "http://google.com",
      status: "pending",
    },
    {
      id: 2,
      link: "http://google.com",
      status: "pending",
    },
    {
      id: 2,
      link: "http://google.com",
      status: "pending",
    },
    {
      id: 3,
      link: "http://google.com",
      status: "pending",
    },
    {
      id: 4,
      link: "http://google.com",
      status: "pending",
    },
  ];
  const renderProposal = () => {
    return arr.map((element, index) => {
      return <Grid key={index} obj={element} />;
    });
  };
  return (
    <>
      <Nav />
      <div className={styles.container}>
        <h1>Projects pending for approvals</h1>
        <div className={styles.table}>{renderProposal()}</div>
      </div>
    </>
  );
}

export default Approove;
