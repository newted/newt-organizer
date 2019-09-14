import React from "react";
import moment from "moment";
// Styling
import styles from "./ContentCard.module.css";

const ContentCard = ({ content }) => (
  <div className={styles.card}>
    <h4>{content.name}</h4>
    <p>{`Due ${moment(content.dateDue).format("DD MMM")}`}</p>
  </div>
);

export default ContentCard;
