import React from "react";
// Styling
import styles from "./PrevWeekCard.module.css";

// Returns a background colour (for the circle) based on the percent of
// assignments that have been completed
const setBackgroundColor = (numCompleted, total) => {
  let colour = "#ccc";
  const percent = numCompleted / total;

  if (percent >= 0.8) {
    colour = "rgb(51,206,87,.8)"; // Light-green
  } else if (percent >= 0.6) {
    colour = "rgb(247,202,24)";   // Yellow
  } else if (percent >= 0.4) {
    colour = "rgb(255,166,49)";   // Orange
  } else if (percent >= 0) {
    colour = "rgb(220,53,69, .8)"; // Red
  }

  return colour;
};

const PrevWeekCard = ({ numCompleted, percentCompleted, total }) => (
  <div className={styles.card}>
    <div className={styles.cardVisual}>
      <div
        className={styles.circle}
        style={{ backgroundColor: setBackgroundColor(numCompleted, total) }}
      >
        {percentCompleted}
      </div>
    </div>
    <div className={styles.cardBody}>
      {`${numCompleted} / ${total} completed`}
    </div>
  </div>
);

export default PrevWeekCard;
