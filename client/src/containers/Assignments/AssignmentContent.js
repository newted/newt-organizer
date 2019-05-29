import React from "react";
import moment from "moment";
// Components
import Dropdown from "../../components/Dropdown";
// Styling
import styles from "./AssignmentContent.module.css";
import { FiCheckSquare, FiMoreVertical } from "react-icons/fi";

const AssignmentContent = ({
  assignment,
  onComplete,
  onIncomplete,
  dropdownVisible,
  handleOpenDropdown
}) => (
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
        <Dropdown visible={dropdownVisible} handleOpen={handleOpenDropdown}>
          <FiMoreVertical size={18} />
          <Dropdown.Menu>
            <Dropdown.Item>Edit</Dropdown.Item>
            <Dropdown.Item>Delete</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </div>
    <div className={styles.contentContainerBody}>
      <p>{assignment.details}</p>
    </div>
  </div>
);

export default AssignmentContent;
