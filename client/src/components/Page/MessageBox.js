import React from "react";
import { Link } from "react-router-dom";
import styles from "./MessageBox.module.css";

export const MessageLink = ({ children, to }) => (
  <Link to={to} className={styles.messageLink}>
    {children}
  </Link>
);

export const MessageBox = ({ children }) => (
  <div className={styles.messageBox}>{children}</div>
);

export default MessageBox;
