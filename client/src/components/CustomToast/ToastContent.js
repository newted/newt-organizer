import React, { Fragment } from "react";
// Components
import Button from "../Button";
// Styling
import styles from "./ToastContent.module.css";

const ToastContent = ({ message, error, displayRetry = true, onRetry }) => (
  <Fragment>
    <div className={styles.message}>{message}</div>
    <div className={styles.message}>{`Error: ${error}`}</div>

    {displayRetry && (
      <div className={styles.center}>
        <Button additionalClass={styles.retryBtn} onClick={onRetry}>
          Retry
        </Button>
      </div>
    )}
  </Fragment>
);

export default ToastContent;
