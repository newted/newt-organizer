import React from "react";
import styles from "./ContentContainer.module.css";

const ContentContainer = ({ children, className }) => (
  <div
    className={
      className
        ? `${styles.contentContainer} ${className}`
        : styles.contentContainer
    }
  >
    {children}
  </div>
);

export default ContentContainer;
