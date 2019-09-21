import React from "react";
import { Link } from "react-router-dom";
// Styling
import styles from "./LearnContentCard.module.css";
import { FiFileText } from "react-icons/fi";

const LearnContentCard = ({ userContent, isActive }) => {
  const setCardClass = (isActive, isComplete, cardVisual = false) => {
    let cardStyle = [styles.card];
    let cardVisualStyle = [styles.cardVisual];

    if (isComplete) {
      if (!cardVisual) {
        cardStyle.push(styles.completedCard);
      } else {
        cardVisualStyle.push(styles.completedCardVisual);
      }
    }

    if (isActive) {
      if (!cardVisual) {
        cardStyle.push(styles.activeCard);
      } else {
        cardVisualStyle.push(styles.activeCardVisual);
      }
    }

    return cardVisual ? cardVisualStyle.join(" ") : cardStyle.join(" ");
  };

  return (
    <Link to={`/learn/${userContent._id}`}>
      <div className={setCardClass(isActive, userContent.isComplete)}>
        <div className={setCardClass(isActive, userContent.isComplete, true)}>
          <FiFileText size={30} color="#666" />
        </div>
        <div className={styles.cardBody}>
          <h5>{userContent.name}</h5>
          <div className={styles.subtitle}>{userContent.courseName}</div>
        </div>
      </div>
    </Link>
  );
};

export default LearnContentCard;
