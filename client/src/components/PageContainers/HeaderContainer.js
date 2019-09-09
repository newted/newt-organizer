import React from "react";
import styles from "./HeaderContainer.module.css";

const HeaderContainer = ({ children, className }) => (
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

export default HeaderContainer;
