import React from "react";
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

const AssignmentCard = ({
  assignment: { _id, name, courseName, completed },
  handleClick,
  active
}) => (
  <div
    className={setCardClass(active, completed)}
    onClick={() => handleClick(_id)}
  >
    <div className={setCardClass(active, completed, true)}>
      <FiFileText size={30} color="#666" />
    </div>
    <div className={styles.cardBody}>
      <h4>{name}</h4>
      <div className={styles.subtitle}>{courseName}</div>
    </div>
  </div>
);

export default AssignmentCard;
