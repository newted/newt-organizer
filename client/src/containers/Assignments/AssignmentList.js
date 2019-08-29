import React, { Component, Fragment } from "react";
import _ from "lodash";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { withToastManager } from "react-toast-notifications";
// API
import {
  deleteAssignment,
  addQuizToAssignment
} from "../../actions/assignments";
import { fetchAllCourses, resolveCourses } from "../../actions/courses";
import { createPersonalQuiz, fetchQuiz } from "../../actions/quizzes";
// Components
import AssignmentCard from "./AssignmentCard";
import AssignmentContent from "./AssignmentContent";
import Button from "../../components/Button";
import Modal from "../../components/Modal";
import QuizModal from "../../components/QuizModal";
import Loader from "../../components/Loader";
// Helpers
import { statusDueDateSort } from "../../utils/containerHelpers";
import { displayErrorNotification } from "../../components/CustomToast/errorNotification";
// Styling
import styles from "./AssignmentList.module.css";

class AssignmentList extends Component {
  state = {
    showCompleted: false, // Doesn't show completed assignments by default
    currentAssignment: "",
    newQuiz: {},
    showDeleteModal: false,
    showQuizModal: false
  };

  _isMounted = false;
  // Variable to keep track of notification ids
  toastId = null;

  componentDidMount() {
    this._isMounted = true;

    // If there's an assignmentId URL parameter, then set currentAssignment to
    // that one, otherwise the first one (provided the assignments have loaded)
    if (this.props.urlAssignmentId) {
      // If all the assignments are complete, this sets the value of
      // showCompleted to true, otherwise it's kept as false. This way if all the
      // assignments are complete, the initial UI state is to show the completed
      // assignments
      this.setState({
        showCompleted:
          this.props.assignments.length > 0 &&
          this.props.assignments.length ===
            this.props.assignments.filter(({ completed }) => completed).length,
        currentAssignment:
          this.props.assignments.length > 0
            ? this.props.assignments.filter(
                ({ _id }) => _id === this.props.urlAssignmentId
              )[0]
            : ""
      });
    } else {
      this.setState(() => ({
        showCompleted:
          this.props.assignments.length > 0 &&
          this.props.assignments.length ===
            this.props.assignments.filter(({ completed }) => completed).length,
        currentAssignment:
          this.props.assignments.length > 0 ? this.props.assignments[0] : ""
      }));
    }
  }

  // Set the initial current assignment to the first one if/when the props are
  // loaded
  componentDidUpdate(prevProps, prevState) {
    // setState only needs to be called on updates if there's atleast one
    // assignment, thus the initial overarching check.
    // Also check if the previous props are a different length to the current
    // props, which means that assignments were just loaded, or an assignment
    // has been added or deleted. If there's a URL id param, set the initial
    // assignment as that one, otherwise the first one.
    if (
      this.props.assignments.length > 0 &&
      prevProps.assignments.length !== this.props.assignments.length
    ) {
      if (this.props.urlAssignmentId) {
        // The check to see if the filtered list is greater than zero is to
        // account if an assignment has been deleted. Once it's deleted, the
        // user is redirected back to the page if came from, but the
        // assignment no longer exists so the filter will not result in
        // anything. In that case initialize with the first one.
        // (Better solution would be to redirect without id param after
        // deleting)
        this.setState({
          currentAssignment:
            this.props.assignments.filter(
              ({ _id }) => _id === this.props.urlAssignmentId
            ).length > 0
              ? this.props.assignments.filter(
                  ({ _id }) => _id === this.props.urlAssignmentId
                )[0]
              : this.props.assignments[0]
        });
      } else {
        this.setState({
          currentAssignment: this.props.assignments[0]
        });
      }
    }

    const { error, toastManager, resolveCourses } = this.props;

    if (error.message && error.requestType && error.source === "courses") {
      switch (error.requestType) {
        case "fetch":
          const callback = id => (this.toastId = id);
          // Display error notification
          displayErrorNotification(
            toastManager,
            "fetch",
            "assignment",
            error.message,
            this.onRetry,
            callback
          );
          break;
        default:
          return;
      }
      resolveCourses();
    }

    if (error.message && error.requestType && error.source === "assignments") {
      switch (error.requestType) {
        case "update":
          displayErrorNotification(
            toastManager,
            "update",
            "assignment",
            error.message
          );
          break;
        default:
          return;
      }
      resolveCourses();
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  onRetry = () => {
    const { programIds, fetchAllCourses, toastManager } = this.props;

    // A request is made to fetch all courses. Then the toast is removed so that
    // it no longer displays on the screen.
    fetchAllCourses(programIds);
    toastManager.remove(this.toastId);
  };

  openDeleteModal = () => {
    this.setState({
      showDeleteModal: true
    });
  };

  closeDeleteModal = () => {
    this.setState({
      showDeleteModal: false
    });
  };

  openQuizModal = () => {
    this.setState({ showQuizModal: true });
  };

  closeQuizModal = () => {
    this.setState({ showQuizModal: false });
  };

  // Handler function for when the 'Take the quiz' button is clicked
  handleTakeQuiz = assignment => {
    const { createPersonalQuiz, fetchQuiz, addQuizToAssignment } = this.props;

    this.openQuizModal();

    if (_.isEmpty(assignment.quizInfo.quizzes)) {
      // Create personal quiz and update assignment
      const data = {
        contentId: assignment.contentInfo.contentId,
        assignmentId: assignment._id
      };
      // Dispatch action to create quiz, then update assignmet to add quiz id
      createPersonalQuiz(data).then(quiz => {
        addQuizToAssignment(assignment.courseId, assignment._id, {
          quizId: quiz._id
        }).then(() =>
          // Hacky way of dealing with assignment data not updating after making
          // addQuiz request: manually add quiz to currentAssignment in state
          this.setState((state, props) => ({
            newQuiz: quiz,
            currentAssignment: {
              ...state.currentAssignment,
              quizInfo: [
                ...state.currentAssignment.quizInfo,
                {
                  dateCreated: quiz.dateCreated,
                  quizId: quiz._id
                }
              ]
            }
          }))
        );
      });
    } else {
      const { allQuizzes } = this.props;

      // If the quiz has already been fetched, set state with that, otherwise
      // fetch quiz
      if (allQuizzes[assignment.quizInfo.quizzes[0]]) {
        this.setState({ newQuiz: allQuizzes[assignment.quizInfo.quizzes[0]] });
      } else {
        // Fetch personal quiz using id
        fetchQuiz(assignment.quizInfo.quizzes[0]).then(quiz =>
          this.setState({ newQuiz: quiz })
        );
      }
    }
  };

  delete = async (courseId, assignmentId) => {
    const { history, deleteAssignment } = this.props;

    await deleteAssignment(courseId, assignmentId, history);

    this.closeDeleteModal();
  };

  handleShowCompleted = e => {
    e.preventDefault();

    this.setState(prevState => ({
      showCompleted: !prevState.showCompleted
    }));
  };

  handleCardClick = assignment => {
    this.setState({ currentAssignment: assignment });
  };

  // Function to render list of assignment cards
  renderAssignmentList() {
    let { assignments } = this.props;
    const { showCompleted } = this.state;

    // If showCompleted is false, then remove all assignments that are marked
    // as complete before rendering.
    // Show completed can be undefined. Thus explicitly checking if false.
    if (showCompleted === false) {
      assignments = assignments.filter(
        assignment => assignment.completed !== true
      );
    }

    return _.map(assignments, assignment => (
      <AssignmentCard
        key={assignment._id}
        assignment={assignment}
        handleClick={this.handleCardClick}
        active={
          assignment._id === this.state.currentAssignment._id ? true : false
        }
      />
    ));
  }

  renderContent() {
    const { assignments } = this.props;
    const { currentAssignment } = this.state;

    if (_.isEmpty(assignments)) {
      // UI for when there are no assignments.
      const coursesLink = (
        <Link to="/courses" className={styles.link}>
          Courses
        </Link>
      );

      return (
        <div className={styles.message}>
          You currently have no assignments. Add an assignment from one of the
          courses on the {coursesLink} page.
        </div>
      );
    }

    return (
      <Fragment>
        <div className={styles.listContainer}>
          {this.renderAssignmentList()}
        </div>
        <AssignmentContent
          assignment={currentAssignment}
          handleDeleteModal={this.openDeleteModal}
          onTakeQuiz={this.handleTakeQuiz}
        />
      </Fragment>
    );
  }

  render() {
    const { numCompleted, isFetching, assignments } = this.props;
    const { showCompleted, currentAssignment } = this.state;

    if (isFetching && _.isEmpty(assignments)) {
      return <Loader />;
    }

    return (
      <div className={styles.mainContainer}>
        <div className={styles.headerContainer}>
          <h2>Your Assignments</h2>
          {!_.isEmpty(assignments) && (
            <Button
              additionalClass={
                showCompleted
                  ? [styles.completedBtn, styles.selected].join(" ")
                  : styles.completedBtn
              }
              onClick={this.handleShowCompleted}
            >
              {`Show Completed (${numCompleted})`}
            </Button>
          )}
        </div>
        <div className={styles.container}>{this.renderContent()}</div>
        <Modal
          showModal={this.state.showDeleteModal}
          handleClose={this.closeDeleteModal}
        >
          <Modal.Body>
            Are you sure you want to delete this assignment?
          </Modal.Body>
          <Modal.Footer>
            <Button
              category="danger"
              onClick={() =>
                this.delete(currentAssignment.courseId, currentAssignment._id)
              }
            >
              Delete
            </Button>
          </Modal.Footer>
        </Modal>
        <QuizModal
          show={this.state.showQuizModal}
          handleCloseModal={this.closeQuizModal}
          quizName={`Quiz for ${currentAssignment.name}`}
          quiz={this.state.newQuiz}
        />
      </div>
    );
  }
}

function mapStateToProps({ programs, courses, quizzes }, props) {
  const { assignmentId } = props.match.params;
  const assignments = [];
  // This way of setting isFetching seems logical, but for a brief moment,
  // between the 'FETCH_PROGRAMS' and 'REQUEST_COURSES' reducers, it evaluates
  // to false, which (sometimes) briefly flashes the No Assignments message on
  // screen.
  const isFetching = programs.isFetching || courses.isFetching;
  const error = courses.error;
  const programIds = Object.keys(programs.items);

  _.forEach(courses.items, course => {
    _.forEach(course.assignments, assignment => {
      assignment["courseId"] = course._id;
      assignment["courseName"] = course.name;
      assignments.push(assignment);
    });
  });

  const numCompleted = assignments.filter(({ completed }) => completed).length;

  // Sort by status and due date
  statusDueDateSort(assignments);

  return {
    urlAssignmentId: assignmentId,
    allQuizzes: quizzes.items,
    assignments,
    isFetching,
    error,
    programIds,
    numCompleted
  };
}

const mapDispatchToProps = {
  deleteAssignment,
  addQuizToAssignment,
  fetchAllCourses,
  resolveCourses,
  createPersonalQuiz,
  fetchQuiz
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withToastManager(AssignmentList));
