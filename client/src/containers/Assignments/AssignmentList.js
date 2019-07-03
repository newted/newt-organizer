import React, { Component, Fragment } from "react";
import _ from "lodash";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { statusDueDateSort } from "../../utils/containerHelpers";
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
import Loader from '../../components/Loader'
// Styling
import styles from "./AssignmentList.module.css";

class AssignmentList extends Component {
  state = {
    showCompleted: false, // Doesn't show completed assignments by default
    currentAssignment: "",
    showDropdown: false,
    showModal: false
  };

  _isMounted = false;

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
      markAssignmentAsComplete,
      markAssignmentAsIncomplete
    } = this.props;
    const { currentAssignment, showDropdown } = this.state;

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
          onComplete={markAssignmentAsComplete}
          onIncomplete={markAssignmentAsIncomplete}
          dropdownVisible={showDropdown}
          handleOpenDropdown={this.openDropdown}
          handleOpenModal={this.openModal}
        />
      </Fragment>
    );
  }

  render() {
    const { numCompleted, isFetching, assignments } = this.props;
    const { showCompleted, currentAssignment } = this.state;

    if (isFetching && _.isEmpty(assignments)) {
      return <Loader />
    }

    return (
      <div className={styles.mainContainer}>
        <div className={styles.headerContainer}>
          <h2>Your Assignments</h2>
          { !_.isEmpty(assignments) && (
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
  const { assignmentId } = props.match.params;
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
    urlAssignmentId: assignmentId,
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
