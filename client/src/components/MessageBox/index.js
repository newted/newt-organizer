import React from "react";
import styles from "./MessageBox.module.css";

export const MessageBox = ({ children }) => (
  <div className={styles.messageBox}>{children}</div>
);

export default MessageBox;
