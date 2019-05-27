import React, { Component, Fragment } from "react";
import _ from "lodash";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { statusDueDateSort, isEquivalent } from "../../utils/containerHelpers";
// API
import {
  markAssignmentAsComplete,
  markAssignmentAsIncomplete
} from "../../actions/assignments";
// Components
import AssignmentCard from "./AssignmentCard";
import AssignmentContent from "./AssignmentContent";
// Styling
import styles from "./AssignmentList.module.css";

class AssignmentList extends Component {
  state = {
    showCompleted: false, // Doesn't show completed assignments by default
    currentAssignment:
      this.props.assignments.length > 0 ? this.props.assignments[0] : ""
  };

  componentDidMount() {
    // If all the assignments are complete, this sets the value of
    // showCompleted to true, otherwise it's kept as false. This way if all the
    // assignments are complete, the initial UI state is to show the completed
    // assignments
    this.setState(() => ({
      showCompleted:
        this.props.assignments.length > 0 &&
        this.props.assignments.length ===
          this.props.assignments.filter(({ completed }) => completed).length
    }));
  }

  // Set the initial current assignment to the first one if/when the props are
  // loaded
  componentDidUpdate(prevProps, prevState) {
    if (
      this.props.assignments.length > 0 &&
      prevProps.assignments.length === 0
    ) {
      this.setState({ currentAssignment: this.props.assignments[0] });
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
    const { assignments } = this.props;

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
    const { currentAssignment } = this.state;

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
    const { assignments, isFetching } = this.props;

    return (
      <div className={styles.mainContainer}>
        <h2 className={styles.headerContainer}>Your Assignments</h2>
        <div className={styles.container}>{this.renderContent()}</div>
      </div>
    );
  }
}

function mapStateToProps({ programs, courses }) {
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
  markAssignmentAsIncomplete
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AssignmentList);
