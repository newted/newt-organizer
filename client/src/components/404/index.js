import React from "react";
import { Link } from "react-router-dom";
// Components
import Button from "../Button";
// Styling
import styles from "./FourOhFour.module.css";

const FourOhFour = () => (
  <div className={styles.container}>
    <div className={styles.message}>
      <h1 className={styles.errorCode}>404</h1>
      <h2 className={styles.errorMessage}>
        We couldn't find the page you were looking for.
      </h2>
      <Link to="/dashboard" style={{ marginBottom: '1rem' }}>
        <Button additionalClass={styles.linkBtn}>Go to Dashboard</Button>
      </Link>
      <Link to="/">
        <Button additionalClass={styles.linkBtn}>Go to Homepage</Button>
      </Link>
    </div>
  </div>
);

export default FourOhFour;
