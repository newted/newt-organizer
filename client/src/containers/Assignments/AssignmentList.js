import React, { Component } from "react";
import _ from "lodash";
import { connect } from "react-redux";
import { allAssignmentTableFields } from "./assignmentFields";
import { statusDueDateSort } from "../../utils/containerHelpers";
// Components
import Button from "../../components/Button";
import AssignmentTable from "./AssignmentTable";
// Styling
import styles from "./AssignmentList.module.css";

class AssignmentList extends Component {
  state = {
    showDropdown: {}, // Object for multiple assignment dropdowns
    showCompleted: false, // Doesn't show completed assignments by default
    currentDropdownId: null // Passed to closeDropdown function so it knows which table row dropdown to close.
  };

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

  openDropdown = (assignmentId, event) => {
    if (this._isMounted) {
      this.setState(
        prevState =>
          // If currentDropdownId exists (is not null), then close that dropdown
          // so that multiple aren't open.
          prevState.currentDropdownId
            ? {
                showDropdown: {
                  ...prevState.showDropdown,
                  [prevState.currentDropdownId]: false, // Close the previous dropdown so multiple aren't open
                  [assignmentId]: true
                },
                currentDropdownId: assignmentId
              }
            : {
                showDropdown: {
                  ...prevState.showDropdown,
                  [assignmentId]: true
                },
                currentDropdownId: assignmentId
              },
        () => {
          document.addEventListener("click", this.closeDropdown);
        }
      );
    }
  };

  closeDropdown = () => {
    const assignmentId = this.state.currentDropdownId;

    if (this._isMounted) {
      this.setState(
        prevState => ({
          showDropdown: {
            ...prevState.showDropdown,
            [assignmentId]: false
          },
          currentDropdownId: null
        }),
        () => {
          document.removeEventListener("click", this.closeDropdown);
        }
      );
    }
  };

  handleShowCompleted = e => {
    e.preventDefault();

    this.setState(prevState => ({
      showCompleted: !prevState.showCompleted
    }));
  };

  render() {
    const { assignments, numCompleted } = this.props;
    const { showCompleted } = this.state;

    return (
      <div className={styles.mainContainer}>
        <div className={styles.headerContainer}>
          <h2>Your Assignments</h2>
        </div>
        <div className={styles.tableContainer}>
          <div className={styles.tableOptions}>
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
          <AssignmentTable
            fields={allAssignmentTableFields}
            assignments={assignments}
            name="Assignments"
            showCompleted={this.state.showCompleted}
            dropdownVisible={this.state.showDropdown}
            handleOpenDropdown={this.openDropdown}
          />
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
