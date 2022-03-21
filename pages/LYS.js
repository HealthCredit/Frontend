import Nav from "./components/Nav";
import styles from "../styles/LYS.module.css";

function LYS() {
  return (
    <>
      <Nav />
      <div className={styles.container}>
        <h3>Enter Id of LYS you want to buy :-</h3>
        <input type="number" />
        <button>buy</button>
      </div>
    </>
  );
}

export default LYS;
