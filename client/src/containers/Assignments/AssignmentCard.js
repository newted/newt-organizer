import React from "react";
import { Link } from "react-router-dom";
// Styling
import styles from "./AssignmentCard.module.css";
import { FiFileText } from "react-icons/fi";

// This feels like a lot of code just to set the card class, and there's
// probably a better way to do this, but this function essentially chooses the
// CSS classes from a combination of two states: active and completed. Two areas
// where this is used is the card as a whole, and the card visual (the little
// box on the left side of the card).
function setCardClass(active, completed, cardVisual = false) {
  let cardStyle = [styles.card];
  let cardVisualStyle = [styles.cardVisual];

  if (completed) {
    if (!cardVisual) {
      cardStyle.push(styles.completedCard);
    } else {
      cardVisualStyle.push(styles.completedCardVisual);
    }
  }

  if (active) {
    if (!cardVisual) {
      cardStyle.push(styles.activeCard);
    } else {
      cardVisualStyle.push(styles.activeCardVisual);
    }
  }

  return cardVisual ? cardVisualStyle.join(" ") : cardStyle.join(" ");
}

const AssignmentCard = ({ assignment, handleClick, active }) => (
  <Link to={{ pathname: `/assignments/${assignment._id}` }}>
    <div
      className={setCardClass(active, assignment.completed)}
      onClick={() => handleClick(assignment)}
    >
      <div className={setCardClass(active, assignment.completed, true)}>
        <FiFileText size={30} color="#666" />
      </div>
      <div className={styles.cardBody}>
        <h5>{assignment.name}</h5>
        <div className={styles.subtitle}>{assignment.courseName}</div>
      </div>
    </div>
  </Link>
);

export default AssignmentCard;
