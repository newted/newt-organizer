import React, { Component, Fragment } from "react";
import _ from "lodash";
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
import Button from "../../components/Button";
import Dropdown from "react-bootstrap/Dropdown";
import CustomToggle from "../../components/Dropdown/CustomToggle";
// Styling
import styles from "./AssignmentContent.module.css";
import { FiCheckSquare, FiMoreVertical } from "react-icons/fi";

class AssignmentContent extends Component {
  // If quiz has a created date but no finish date, it's still in progress.
  // Otherwise it's finished. Return message depending on situation.
  renderQuizButtonMessage(quizDateCreated, quizDateCompleted) {
    if (quizDateCreated && quizDateCompleted) {
      return "See quiz results";
    }

    return "Continue quiz";
  }

  render() {
    const {
      assignment,
      markAssignmentAsIncomplete,
      markAssignmentAsComplete,
      handleDeleteModal,
      onTakeQuiz,
      history
    } = this.props;

    return (
      <div className={styles.contentContainer}>
        <div className={styles.contentHeaderContainer}>
          <h4 className={styles.contentHeader}>{assignment.name}</h4>
          <div className={styles.headerInfo}>
            <h5 className={styles.date}>
              Due {moment(assignment.dateDue).format("MMM DD")}
            </h5>
            <span
              style={{ height: "26px" }}
              onClick={() =>
                assignment.completed
                  ? markAssignmentAsIncomplete(
                      assignment.courseId,
                      assignment._id
                    )
                  : markAssignmentAsComplete(
                      assignment.courseId,
                      assignment._id
                    )
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
            <Dropdown alignRight={true} drop="down" className={styles.dropdown}>
              <Dropdown.Toggle
                id="assignment-content-dropdown"
                as={CustomToggle}
              >
                <FiMoreVertical size={18} />
              </Dropdown.Toggle>
              <Dropdown.Menu className={styles.dropdownMenu}>
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
                  onClick={() => handleDeleteModal(assignment.courseId)}
                >
                  Delete
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>
        <div className={styles.contentContainerBody}>
          {/* If the assignment has a quiz and is from youtube, show steps */}
          {assignment.hasQuiz && assignment.source === "youtube" && (
            <h5 className={styles.instruction}>1. Watch the video</h5>
          )}
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
              <h5 className={styles.subheading}>Description</h5>
              <p style={{ marginBottom: "1.75rem" }}>{assignment.details}</p>
            </Fragment>
          )}
          {/* If assignment has a quiz, add step + display take quiz button */}
          {assignment.hasQuiz && (
            <Fragment>
              <h5 className={styles.instruction}>
                2. Check your understanding
              </h5>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <Button
                  category="primary"
                  onClick={() => onTakeQuiz(assignment)}
                  style={{ width: "60%" }}
                >
                  {_.isEmpty(assignment.quizInfo)
                    ? "Take the quiz"
                    : this.renderQuizButtonMessage(
                        assignment.quizInfo[0].dateCreated,
                        assignment.quizInfo[0].dateCompleted
                      )}
                </Button>
              </div>
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
