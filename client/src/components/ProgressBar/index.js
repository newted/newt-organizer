import React from "react";
// Styling
import styles from "./ProgressBar.module.css";

const ProgressBar = ({ percentComplete }) => (
  <div className={styles.progressBar} style={{ width: `${percentComplete}%` }}>
    <span
      className={
        percentComplete > 10
          ? `${styles.progressLabel} ${styles.whiteLabel}`
          : `${styles.progressLabel} ${styles.blackLabel}`
      }
    >{`${percentComplete}%`}</span>
  </div>
);

export default ProgressBar;
