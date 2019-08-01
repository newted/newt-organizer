import React from "react";
import styles from "./PageHeader.module.css";

export const PageHeaderContainer = ({ children }) => (
  <div className={styles.headerContainer}>{children}</div>
);

export const PageHeader = ({ children }) => <h2>{children}</h2>;
