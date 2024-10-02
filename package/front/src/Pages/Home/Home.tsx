import React from "react";
import styles from "./Home.module.scss";

function Home() {
  return (
    <div className={styles.home}>
      <p className={styles.homeText}>홈입니다.</p>
    </div>
  );
}

export default Home;
