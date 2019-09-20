import React from "react";
import { Link } from "react-router-dom";
// Styling
import styles from "./TimelineCard.module.css";
import { FiFileText, FiCheckSquare } from "react-icons/fi";
// Helpers
import { shortenText } from "../../utils/containerHelpers";

const TimelineCard = ({
  assignment: { _id, name, courseId, courseName, description, isComplete },
  toggleComplete
}) => (
  <div
    className={
      isComplete ? `${styles.card} ${styles.completedCard}` : styles.card
    }
  >
    <div
      className={
        isComplete
          ? `${styles.cardVisual} ${styles.completedCardVisual}`
          : styles.cardVisual
      }
    >
      <FiFileText size={30} color="#555" />
    </div>
    <div className={styles.cardBody}>
      <div className={styles.cardText}>
        <div className={styles.headers}>
          <Link to={{ pathname: `/content/${_id}` }}>
            <h5 className={styles.title}>{name}</h5>
          </Link>
          <div style={{ color: "#bbb", marginRight: ".5rem" }}>&mdash;</div>
          <Link to={{ pathname: `/courses/${courseId}` }}>
            <h5 className={styles.subtitle}>{courseName}</h5>
          </Link>
        </div>
        <div className={styles.details}>{shortenText(description, 150)}</div>
      </div>
      <div className={styles.cardStatus}>
        <div
          style={{ height: "25px" }}
          onClick={() => toggleComplete(_id, isComplete)}
        >
          <FiCheckSquare
            size={25}
            className={
              isComplete
                ? `${styles.check} ${styles.completedCheck}`
                : styles.check
            }
          />
        </div>
        {isComplete && <div style={{ marginLeft: ".5rem" }}>Done!</div>}
      </div>
    </div>
  </div>
);

export default TimelineCard;
