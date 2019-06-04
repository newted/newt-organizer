import React from "react";
import { Link } from "react-router-dom";
// Styling
import styles from "./TimelineCard.module.css";
import { FiFileText, FiCheckSquare } from "react-icons/fi";
// Helpers
import { shortenText } from "../../utils/containerHelpers";

const TimelineCard = ({
  assignment: {
    _id,
    name,
    courseId,
    programId,
    courseName,
    details,
    completed
  },
  onComplete,
  onIncomplete
}) => (
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
      <div className={styles.cardText}>
        <div className={styles.headers}>
          <h4 className={styles.title}>{name}</h4>
          <div style={{ color: "#bbb", marginRight: ".5rem" }}>&mdash;</div>
          <Link to={{ pathname: `/programs/${programId}/courses/${courseId}` }}>
            <h4 className={styles.subtitle}>{courseName}</h4>
          </Link>
        </div>
        <div className={styles.details}>
          {shortenText(details, 150)}
        </div>
      </div>
      <div className={styles.cardStatus}>
        <div
          style={{ height: "25px" }}
          onClick={() =>
            completed ? onIncomplete(courseId, _id) : onComplete(courseId, _id)
          }
        >
          <FiCheckSquare
            size={25}
            className={
              completed
                ? `${styles.check} ${styles.completedCheck}`
                : styles.check
            }
          />
        </div>
        {completed && <div style={{ marginLeft: ".5rem" }}>Done!</div>}
      </div>
    </div>
  </div>
);

export default TimelineCard;
