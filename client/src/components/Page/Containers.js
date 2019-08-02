import React from "react";
import styles from "./Containers.module.css";

export const MainContainer = ({ children }) => (
  <div className={styles.mainContainer}>{children}</div>
);

export const HeaderContainer = ({ children, className }) => (
  <div
    className={
      className
        ? `${styles.headerContainer} ${className}`
        : styles.headerContainer
    }
  >
    {children}
  </div>
);
