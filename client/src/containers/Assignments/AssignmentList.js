import React, { Component } from "react";
import _ from "lodash";
import { connect } from "react-redux";
import { statusDueDateSort } from "../../utils/containerHelpers";
// Components
import AssignmentCard from "./AssignmentCard";
// Styling
import styles from "./AssignmentList.module.css";

class AssignmentList extends Component {
  state = {
    showCompleted: false, // Doesn't show completed assignments by default
    currentAssignment:
      this.props.assignments.length > 0 ? this.props.assignments[0]._id : ""
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
      this.setState({ currentAssignment: this.props.assignments[0]._id });
    }
  }

  handleShowCompleted = e => {
    e.preventDefault();

    this.setState(prevState => ({
      showCompleted: !prevState.showCompleted
    }));
  };

  handleCardClick = assignmentId => {
    this.setState({ currentAssignment: assignmentId });
  };

  renderAssignmentList() {
    const { assignments } = this.props;

    return _.map(assignments, assignment => (
      <AssignmentCard
        key={assignment._id}
        assignment={assignment}
        handleClick={this.handleCardClick}
        active={assignment._id === this.state.currentAssignment ? true : false}
      />
    ));
  }

  render() {
    return (
      <div className={styles.mainContainer}>
        <h2 className={styles.headerContainer}>Your Assignments</h2>
        <div className={styles.container}>
          <div className={styles.listContainer}>
            {this.renderAssignmentList()}
          </div>
          <div className={styles.contentContainer}>
            {this.state.currentAssignment}
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ courses }) {
  const assignments = [];

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
    numCompleted
  };
}

export default connect(mapStateToProps)(AssignmentList);
