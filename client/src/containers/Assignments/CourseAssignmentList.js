import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { assignmentTableFields } from "./assignmentFields";
import { statusDueDateSort } from "../../utils/containerHelpers";
// Components
import { PageHeaderContainer } from "../../components/Page/PageHeader";
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
    const { courseId, assignments } = this.props;
    const { showCompleted } = this.state;

    return (
      <div className={styles.assignmentsContainer}>
        <PageHeaderContainer className={styles.subHeaderContainer}>
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
        </PageHeaderContainer>
        <AssignmentTable
          fields={assignmentTableFields}
          assignments={statusDueDateSort(assignments)}
          name="assignments"
          showCompleted={this.state.showCompleted}
          dropdownVisible={this.state.showDropdown}
          handleOpenDropdown={this.openDropdown}
        />
      </div>
    );
  }
}

export default CourseAssignmentList;
