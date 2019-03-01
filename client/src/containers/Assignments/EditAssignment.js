import React, { Component } from "react";
import _ from "lodash";
import PropTypes from "prop-types";
import { connect } from "react-redux";
// API
import { updateAssignment } from "../../actions/assignments";
// Components
import EditAssignmentForm from "./EditAssignmentForm";
// Styling
import styles from "./EditAssignment.module.css";

class EditAssignment extends Component {
  static propTypes = {
    assignment: PropTypes.shape({
      courseId: PropTypes.string,
      completed: PropTypes.bool,
      inProgress: PropTypes.bool,
      dateCreated: PropTypes.string,
      dateDue: PropTypes.string,
      name: PropTypes.string,
      _id: PropTypes.string
    }),
    updateAssignment: PropTypes.func.isRequired,
    // Connect props
    history: PropTypes.object,
    location: PropTypes.object,
    match: PropTypes.object
  };

  render() {
    return (
      <div className={styles.mainContainer}>
        <div className={styles.contentContainer}>
          <div className={styles.headerContainer}>
            <h3>Edit Assignment</h3>
          </div>
          <EditAssignmentForm
            assignment={this.props.assignment}
            onSubmit={this.props.updateAssignment}
          />
        </div>
      </div>
    );
  }
}

function mapStateToProps({ courses }, props) {
  const { courseId, assignmentId } = props.match.params;

  const course = courses ? courses.items[courseId] : null;

  const assignment = course
    ? _.filter(
        course.assignments,
        assignment => assignment._id === assignmentId
      )[0]
    : null;

  if (assignment) {
    assignment.courseId = courseId;
  }

  return {
    assignment
  };
}

const mapDispatchToProps = {
  updateAssignment
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditAssignment);
