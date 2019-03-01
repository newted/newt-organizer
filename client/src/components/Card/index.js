import React from "react";
import { Link } from "react-router-dom";
// Styling
import styles from "./Card.module.css";

export default ({ path, icon, title, subtitle, additionalClass }) => (
  <Link to={{ pathname: path }} className={`${styles.card} ${additionalClass}`}>
    <div className={styles.cardBody}>
      {icon && <div className={styles.icon}>{icon}</div>}
      {title && <div className={styles.title}>{title}</div>}
      {subtitle && <div className={styles.subtitle}>{subtitle}</div>}
    </div>
  </Link>
);
