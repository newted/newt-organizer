import React from "react";
// Styling
import styles from "./ContentCard.module.css";

const ContentCard = ({ content }) => (
  <div className={styles.card}>{content.name}</div>
);

export default ContentCard;
