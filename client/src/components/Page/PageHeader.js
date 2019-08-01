import React from "react";
import styles from "./PageHeader.module.css";

const PageHeader = ({ children }) => (
  <div className={styles.headerContainer}>
    <h2>{children}</h2>
  </div>
);

export default PageHeader;
