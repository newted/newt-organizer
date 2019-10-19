import React from "react";
// Styling
import styles from "./ProgressBar.module.css";

const ProgressBar = ({ percentComplete }) => (
  <div className={styles.progressBar} style={{ width: `${percentComplete}%` }}>
    <span className={styles.progressLabel}>{`${percentComplete}%`}</span>
  </div>
);

export default ProgressBar;
