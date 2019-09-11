import React from "react";
import styles from "./CustomNav.module.css";

export const CustomNavItem = ({ children }) => (
  <div className={styles.navItem}>{children}</div>
);

export const CustomNavLink = ({ children, ...props }) => (
  <a {...props} className={styles.navLink}>
    {children}
  </a>
);
