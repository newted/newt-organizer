import React from "react";
import { Link } from "react-router-dom";
// Styling
import styles from "./LearnContentCard.module.css";

const LearnContentCard = ({ userContent }) => (
  <Link to={`/learn/${userContent._id}`}>
    <div className={styles.card}>{userContent.name}</div>
  </Link>
);

export default LearnContentCard;
