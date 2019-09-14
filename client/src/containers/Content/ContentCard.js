import React from "react";
import moment from "moment";
import { Link } from "react-router-dom";
// Styling
import styles from "./ContentCard.module.css";

const ContentCard = ({ content }) => (
  <Link to={`/content/${content._id}`} className={styles.card}>
    <h4>{content.name}</h4>
    <p>{`Due ${moment(content.dateDue).format("DD MMM")}`}</p>
  </Link>
);

export default ContentCard;
