import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import moment from "moment";
// Components
import Dropdown from "../../components/Dropdown";
// Styling
import styles from "./AssignmentContent.module.css";
import { FiCheckSquare, FiMoreVertical } from "react-icons/fi";

class AssignmentContent extends Component {
  render() {
    const {
      assignment,
      onComplete,
      onIncomplete,
      dropdownVisible,
      handleOpenDropdown,
      handleOpenModal,
      history
    } = this.props;

    return (
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
            <Dropdown
              visible={dropdownVisible}
              style={{ height: "26px", display: "flex", alignItems: "center" }}
              handleOpen={handleOpenDropdown}
            >
              <FiMoreVertical size={18} />
              <Dropdown.Menu>
                <Dropdown.Item
                  onClick={() =>
                    history.push(
                      `/courses/${assignment.courseId}/assignments/${
                        assignment._id
                      }/edit`
                    )
                  }
                >
                  Edit
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() => handleOpenModal(assignment.courseId)}
                >
                  Delete
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>
        <div className={styles.contentContainerBody}>
          {assignment.source === "youtube" && (
            <div className={styles.videoContainer}>
              <iframe
                id="ytplayer"
                type="text/html"
                title={assignment.name}
                width="640"
                height="360"
                src={`https://www.youtube.com/embed/${
                  assignment.videoInfo.videoId
                }`}
                frameBorder="0"
                allowFullScreen
              />
            </div>
          )}
          <p className={styles.details}>{assignment.details}</p>
        </div>
      </div>
    );
  }
}

export default withRouter(AssignmentContent);
