import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { assignmentTableFields } from "./assignmentFields";
import { statusDueDateSort } from "../../utils/containerHelpers";
// Components
import Button from "../../components/Button";
import AssignmentTable from "./AssignmentTable";
// Styling
import styles from "./CourseAssignmentList.module.css";

class CourseAssignmentList extends Component {
  static propTypes = {
    courseId: PropTypes.string.isRequired,
    assignments: PropTypes.arrayOf(PropTypes.object).isRequired
  };

  state = {
    showDropdown: {}, // Object for multiple assignment dropdowns
    showCompleted: false,
    currentDropdownId: null // Passed to closeDropdown function so it knows which table row dropdown to close.
  };

  // When clicking the Edit button, this component unmounts and when setState
  // is called to set specific showDropdown to false and currentDropdownId to
  // null, React throws an error:
  // "Warning: Can’t call setState (or forceUpdate) on an unmounted component"
  // To evade this (at least that's what this looks like), the _isMounted
  // property is created to ensure setState is only run if the component is
  // mounted.
  // See: https://www.youtube.com/watch?v=8BNdxFzMeVg
  _isMounted = false;

  componentDidMount() {
    this._isMounted = true;
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

  componentWillUnmount() {
    this._isMounted = false;
  }

  handleShowCompleted = e => {
    e.preventDefault();

    this.setState(prevState => ({
      showCompleted: !prevState.showCompleted
    }));
  };

  render() {
    const { courseId, assignments } = this.props;
    const { showCompleted } = this.state;

    return (
      <div className={styles.assignmentsContainer}>
        <div className={styles.headerContainer}>
          <h3 className={styles.header}>Assignments</h3>
          <div>
            <Button
              additionalClass={
                showCompleted
                  ? [styles.completedBtn, styles.selected].join(" ")
                  : styles.completedBtn
              }
              onClick={this.handleShowCompleted}
            >
              {`Show Completed (${
                assignments.filter(({ completed }) => completed).length
              })`}
            </Button>
            <Link to={{ pathname: `/courses/${courseId}/assignments/add` }}>
              <Button category="success">Add Assignment</Button>
            </Link>
          </div>
        </div>
        <AssignmentTable
          fields={assignmentTableFields}
          assignments={statusDueDateSort(assignments)}
          name="assignments"
          showCompleted={this.state.showCompleted}
        />
      </div>
    );
  }
}

export default CourseAssignmentList;
