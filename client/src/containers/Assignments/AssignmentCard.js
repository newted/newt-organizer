import React from "react";
// Styling
import styles from "./AssignmentCard.module.css";
import { FiFileText } from "react-icons/fi";

const AssignmentCard = ({ assignment: { name, courseName, completed } }) => (
  <div
    className={
      completed ? `${styles.card} ${styles.completedCard}` : styles.card
    }
  >
    <div
      className={
        completed
          ? `${styles.cardVisual} ${styles.completedCardVisual}`
          : styles.cardVisual
      }
    >
      <FiFileText size={30} color="#555" />
    </div>
    <div className={styles.cardBody}>
      <h4>{name}</h4>
      <div className={styles.subtitle}>{courseName}</div>
    </div>
  </div>
);

export default AssignmentCard;
