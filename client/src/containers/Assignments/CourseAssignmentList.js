import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { assignmentTableFields } from "./assignmentFields";
import { initializeDropdownMenuState } from "../../utils/dropdownHelpers";
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
    showDropdown: initializeDropdownMenuState(this.props.assignments),
    showCompleted: false,
    dropdownMenu: null,
    currentDropdownId: null // Passed to closeDropdown function so it knows
  }; // which table row dropdown to close.

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
        prevState => ({
          showDropdown: {
            ...prevState.showDropdown,
            [assignmentId]: true
          },
          currentDropdownId: assignmentId
        }),
        () => {
          document.addEventListener("click", this.closeDropdown);
        }
      );
    }
  };

  closeDropdown = event => {
    const assignmentId = this.state.currentDropdownId;

    if (this._isMounted && !this.state.dropdownMenu.contains(event.target)) {
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

  setDropdownMenu = event => {
    if (this._isMounted && event && !this.state.dropdownMenu) {
      this.setState({ dropdownMenu: event });
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
              <Button additionalClass={styles.addBtn}>Add Assignment</Button>
            </Link>
          </div>
        </div>
        <AssignmentTable
          fields={assignmentTableFields}
          assignments={statusDueDateSort(assignments)}
          name="assignments"
          showCompleted={this.state.showCompleted}
          dropdownVisible={this.state.showDropdown}
          handleOpenDropdown={this.openDropdown}
          setDropdownMenu={this.setDropdownMenu}
        />
      </div>
    );
  }
}

export default CourseAssignmentList;
