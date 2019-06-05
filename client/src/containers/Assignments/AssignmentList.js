import React, { Component, Fragment } from "react";
import _ from "lodash";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { statusDueDateSort, isEquivalent } from "../../utils/containerHelpers";
// API
import {
  markAssignmentAsComplete,
  markAssignmentAsIncomplete,
  deleteAssignment
} from "../../actions/assignments";
// Components
import AssignmentCard from "./AssignmentCard";
import AssignmentContent from "./AssignmentContent";
import Button from "../../components/Button";
import Modal from "../../components/Modal";
// Styling
import styles from "./AssignmentList.module.css";

class AssignmentList extends Component {
  state = {
    showCompleted: false, // Doesn't show completed assignments by default,
    assignmentHash: "",
    currentAssignment: "",
    showDropdown: false,
    showModal: false
  };

  _isMounted = false;

  componentDidMount() {
    this._isMounted = true;

    // The first check is to see if there's a URL hash that indicates whether
    // an assignment link has been clicked. If there is, then add the id to
    // state, and if the assignments have loaded, set currentAssignment in state
    // to the assignment with that id. If there's no hash, then set the
    // active assignment to the first one.
    // See: https://github.com/ReactTraining/react-router/issues/394#issuecomment-128148470
    window.location.hash = window.decodeURIComponent(window.location.hash);
    if (window.location.hash) {
      // If all the assignments are complete, this sets the value of
      // showCompleted to true, otherwise it's kept as false. This way if all the
      // assignments are complete, the initial UI state is to show the completed
      // assignments
      this.setState({
        showCompleted:
          this.props.assignments.length > 0 &&
          this.props.assignments.length ===
            this.props.assignments.filter(({ completed }) => completed).length,
        assignmentHash: window.location.hash.substr(1),
        currentAssignment:
          this.props.assignments.length > 0
            ? this.props.assignments.filter(
                ({ _id }) => _id === window.location.hash.substr(1)
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
    if (this.props.assignments.length > 0) {
      // First, check if there's a URL hash and the current assignment hasn't
      // already been set, then set the current assignment to that one.
      if (
        prevState.assignmentHash.length > 0 &&
        prevState.currentAssignment === ""
      ) {
        this.setState({
          currentAssignment: this.props.assignments.filter(
            ({ _id }) => _id === prevState.assignmentHash
          )[0]
        });
      }

      // If not, check if the previous props were of length 0, which means the
      // assignments were just loaded, or if any assignments have been added or
      // deleted (i.e the previous props and current props will have different
      // lengths). For both set the current assignment to the first one.
      if (prevProps.assignments.length !== this.props.assignments.length) {
        this.setState({ currentAssignment: this.props.assignments[0] });
      }
    }

    // This next bit is to check if the assignment information has changed in
    // any way. Not a huge fan of this solution but so far seems to more or less
    // remove the check mark not updating bug. Essentially just filters the
    // (new) assignment list with the currentAssignment id (maybe an object of
    // assignments will work better?), and checks if each values are the same.
    // If not, update the currentAssignment.
    const changedAssignment = this.props.assignments.filter(
      ({ _id }) => _id === prevState.currentAssignment._id
    );

    if (
      changedAssignment.length === 1 &&
      !isEquivalent(prevState.currentAssignment, changedAssignment[0])
    ) {
      this.setState({ currentAssignment: changedAssignment[0] });
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  openDropdown = e => {
    if (this._isMounted) {
      this.setState(
        () => ({ showDropdown: true }),
        () => document.addEventListener("click", this.closeDropdown)
      );
    }
  };

  closeDropdown = e => {
    if (this._isMounted) {
      this.setState(
        () => ({ showDropdown: false }),
        () => document.removeEventListener("click", this.closeDropdown)
      );
    }
  };

  openModal = () => {
    this.setState({
      showModal: true
    });
  };

  closeModal = () => {
    this.setState({
      showModal: false
    });
  };

  delete = async (courseId, assignmentId) => {
    const { history, deleteAssignment } = this.props;

    await deleteAssignment(courseId, assignmentId, history);

    this.closeModal();
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
    const {
      assignments,
      isFetching,
      markAssignmentAsComplete,
      markAssignmentAsIncomplete
    } = this.props;
    const { currentAssignment, showDropdown } = this.state;

    if (assignments.length > 0) {
      return (
        <Fragment>
          <div className={styles.listContainer}>
            {this.renderAssignmentList()}
          </div>
          <AssignmentContent
            assignment={currentAssignment}
            onComplete={markAssignmentAsComplete}
            onIncomplete={markAssignmentAsIncomplete}
            dropdownVisible={showDropdown}
            handleOpenDropdown={this.openDropdown}
            handleOpenModal={this.openModal}
          />
        </Fragment>
      );
    } else if (isFetching) {
      // UI for when assignments are loading.
      return <div>Loading...</div>;
    } else {
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
  }

  render() {
    const { numCompleted } = this.props;
    const { showCompleted, currentAssignment } = this.state;

    return (
      <div className={styles.mainContainer}>
        <div className={styles.headerContainer}>
          <h2>Your Assignments</h2>
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
        </div>
        <div className={styles.container}>{this.renderContent()}</div>
        <Modal showModal={this.state.showModal} handleClose={this.closeModal}>
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
      </div>
    );
  }
}

function mapStateToProps({ programs, courses }, props) {
  const assignments = [];
  // This way of setting isFetching seems logical, but for a brief moment,
  // between the 'FETCH_PROGRAMS' and 'REQUEST_COURSES' reducers, it evaluates
  // to false, which (sometimes) briefly flashes the No Assignments message on
  // screen.
  const isFetching = programs.isFetching || courses.isFetching;

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
    assignments,
    isFetching,
    numCompleted
  };
}

const mapDispatchToProps = {
  markAssignmentAsComplete,
  markAssignmentAsIncomplete,
  deleteAssignment
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AssignmentList);
