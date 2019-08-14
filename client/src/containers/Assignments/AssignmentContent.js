import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import moment from "moment";
// API
import {
  markAssignmentAsComplete,
  markAssignmentAsIncomplete
} from "../../actions/assignments";
import { updateLearningMap } from "../../actions/learningMap";
// Components
import Dropdown from "../../components/Dropdown";
// Styling
import styles from "./AssignmentContent.module.css";
import { FiCheckSquare, FiMoreVertical } from "react-icons/fi";

class AssignmentContent extends Component {
  onComplete = (courseId, assignmentId) => {
    const { assignment, markAssignmentAsComplete } = this.props;

    // If assignment has knowledge tracking, send request to update the learning
    // map and send the required information
    if (assignment.hasKnowledgeTracking) {
      const {
        assignment: { contentInfo, knowledgeSubject, knowledgeModule },
        learningMapId,
        updateLearningMap
      } = this.props;
      // Combine primary and secondary topics into a singular topics array
      const allTopics = contentInfo.primaryTopics.concat(
        contentInfo.secondaryTopics
      );

      const data = {
        knowledgeSubject,
        knowledgeModule,
        topics: allTopics,
        contentHistory: {
          name: contentInfo.name,
          contentId: contentInfo.contentId
        }
      };
      // Send request to update learning map
      updateLearningMap(learningMapId, data);
    }

    // Send request to mark the assignment as complete
    markAssignmentAsComplete(courseId, assignmentId);
  };

  render() {
    const {
      assignment,
      markAssignmentAsIncomplete,
      dropdownVisible,
      handleOpenDropdown,
      handleOpenModal,
      history
    } = this.props;

    return (
      <div className={styles.contentContainer}>
        <div className={styles.contentHeaderContainer}>
          <h4 className={styles.contentHeader}>{assignment.name}</h4>
          <div className={styles.headerInfo}>
            <h5 className={styles.date}>
              Due on {moment(assignment.dateDue).format("MMM DD")}
            </h5>
            <span
              style={{ height: "26px" }}
              onClick={() =>
                assignment.completed
                  ? markAssignmentAsIncomplete(
                      assignment.courseId,
                      assignment._id
                    )
                  : this.onComplete(assignment.courseId, assignment._id)
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
                      `/courses/${assignment.courseId}/assignments/${assignment._id}/edit`
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
          {/* If the assignment is from Youtube, display video iframe */}
          {assignment.source === "youtube" && (
            <div className={styles.videoContainer}>
              <iframe
                id="ytplayer"
                type="text/html"
                title={assignment.name}
                width="640"
                height="360"
                src={`https://www.youtube.com/embed/${assignment.videoInfo.videoId}`}
                frameBorder="0"
                allowFullScreen
              />
            </div>
          )}
          {/* If assignment has knowledge tracking, display related information.
              (Just Knowledge module for now) */}
          {assignment.hasKnowledgeTracking && (
            <div className={styles.knowledgeInfoContainer}>
              <h4>Learning Map Info</h4>
              <div className={styles.knowledgeInfoItem}>
                <p>Main Subject:</p>
                <p>{assignment.knowledgeModule.name}</p>
              </div>
              <div className={styles.knowledgeInfoItem}>
                <p>Topics Covered:</p>
                <p>
                  {assignment.contentInfo.primaryTopics
                    .map(({ name }) => name)
                    .join(", ")}
                </p>
              </div>
            </div>
          )}
          {/* If assignment has a description, display it */}
          {assignment.details && (
            <Fragment>
              <h4 className={styles.subheading}>Description</h4>
              <p className={styles.details}>{assignment.details}</p>
            </Fragment>
          )}
        </div>
      </div>
    );
  }
}

function mapStateToProps({ learningMap }) {
  return { learningMapId: learningMap.items._id };
}

const mapDispatchToProps = {
  markAssignmentAsComplete,
  markAssignmentAsIncomplete,
  updateLearningMap
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(AssignmentContent));
