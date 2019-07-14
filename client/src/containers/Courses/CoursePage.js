import React, { Component } from "react";
import _ from "lodash";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { withToastManager } from "react-toast-notifications";
// API
import { deleteCourse, resolveCourses } from "../../actions/courses";
// Components
import Button from "../../components/Button";
import Modal from "../../components/Modal";
import Loader from "../../components/Loader";
import ToastContent from "../../components/CustomToast/ToastContent";
import CourseAssignmentList from "../Assignments/CourseAssignmentList";
// Helpers
import { displayErrorNotification } from "../../components/CustomToast/errorNotification";
// Styling
import styles from "./CoursePage.module.css";

class CoursePage extends Component {
  static propTypes = {
    programId: PropTypes.string.isRequired,
    course: PropTypes.shape({
      announcements: PropTypes.array,
      assignments: PropTypes.array,
      dateCreated: PropTypes.string,
      name: PropTypes.string,
      quizzes: PropTypes.array,
      shortname: PropTypes.string,
      _id: PropTypes.string
    }),
    deleteCourse: PropTypes.func.isRequired,
    // Connect props
    history: PropTypes.object,
    location: PropTypes.object,
    match: PropTypes.object
  };

  state = {
    showModal: false
  };

  componentDidMount() {
    const { toastManager, resolveCourses, courseError } = this.props;

    if (courseError.message && courseError.source === "assignments") {
      switch (courseError.requestType) {
        case "create":
        case "update":
          displayErrorNotification(
            toastManager,
            courseError.requestType,
            "assignment",
            courseError.message
          );
          break;
        default:
          return;
      }
      resolveCourses();
    }
  }

  componentDidUpdate() {
    const { toastManager, resolveCourses, courseError } = this.props;

    if (courseError.message && courseError.source === "courses") {
      switch (courseError.requestType) {
        case "update":
          toastManager.add(
            <ToastContent
              message="Something went wrong, could not update the course."
              error={courseError.message}
              displayRetry={false}
            />,
            {
              appearance: "error"
            }
          );
          break;
        default:
          return;
      }

      resolveCourses();
    }
  }

  openModal = () => {
    this.setState({ showModal: true });
  };

  closeModal = () => {
    this.setState({ showModal: false });
  };

  render() {
    const { programId, course, history, deleteCourse } = this.props;

    if (!course) {
      return <Loader />;
    }

    return (
      <div className={styles.mainContainer}>
        <div className={styles.headerContainer}>
          <h2>{course.name}</h2>
          <div>
            <Link
              to={{
                pathname: `/programs/${programId}/courses/${course._id}/edit`
              }}
            >
              <Button category="primary" additionalClass={styles.leftBtn}>
                Edit
              </Button>
            </Link>
            <Button
              category="danger"
              additionalClass={styles.rightBtn}
              onClick={this.openModal}
            >
              Delete
            </Button>
            <Modal
              showModal={this.state.showModal}
              handleClose={this.closeModal}
            >
              <Modal.Body>
                Are you sure you want to delete this course?
              </Modal.Body>
              <Modal.Footer>
                <Button
                  category="danger"
                  onClick={() => deleteCourse(programId, course._id, history)}
                >
                  Delete
                </Button>
              </Modal.Footer>
            </Modal>
          </div>
        </div>
        <CourseAssignmentList
          courseId={course._id}
          assignments={course.assignments}
        />
      </div>
    );
  }
}

function mapStateToProps({ courses }, props) {
  const { programId, courseId } = props.match.params;

  const courseError = courses.error;
  const course = courses.items ? courses.items[courseId] : null;

  if (course) {
    // Add courseId to each assignment. This will be used for assignment actions
    // in the Assignment table
    _.forEach(
      course.assignments,
      assignment => (assignment["courseId"] = courseId)
    );
  }

  return {
    programId,
    course,
    courseError
  };
}

const mapDispatchToProps = {
  deleteCourse,
  resolveCourses
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withToastManager(CoursePage));
