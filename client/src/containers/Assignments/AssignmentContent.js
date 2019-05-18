import React from "react";
import moment from "moment";
// Styling
import styles from "./AssignmentContent.module.css";
import { FiCheckSquare } from "react-icons/fi";

const AssignmentContent = ({ assignment, onComplete, onIncomplete }) => (
  <div className={styles.contentContainer}>
    <div className={styles.contentHeaderContainer}>
      <h3 className={styles.contentHeader}>{assignment.name}</h3>
      <div className={styles.headerInfo}>
        <h4 className={styles.date}>
          Due on {moment(assignment.dateDue).format("MMMM DD")}
        </h4>
        <span
          style={{ height: "26px" }}
          onClick={() =>
            assignment.completed
              ? onIncomplete(assignment.courseId, assignment._id)
              : onComplete(assignment.courseId, assignment._id)
          }
        >
          <FiCheckSquare
            size={26}
            className={
              assignment.completed
                ? `${styles.check} ${styles.completedCheck}`
                : styles.check
            }
          />
        </span>
      </div>
    </div>
    <div className={styles.contentContainerBody}>
      <p>{assignment.details}</p>
    </div>
  </div>
);

export default AssignmentContent;
