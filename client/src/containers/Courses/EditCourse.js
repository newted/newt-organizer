import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
// API
import { updateCourse } from "../../actions/courses";
// Components
import EditCourseForm from "./EditCourseForm";
// Styling
import styles from "./EditCourse.module.css";

class EditCourse extends Component {
  static propTypes = {
    course: PropTypes.shape({
      announcements: PropTypes.array,
      assignments: PropTypes.array,
      dateCreated: PropTypes.string,
      name: PropTypes.string,
      quizzes: PropTypes.array,
      shortname: PropTypes.string,
      _id: PropTypes.string
    }),
    updateCourse: PropTypes.func.isRequired,
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
            <h3>Edit Course</h3>
          </div>
          <EditCourseForm
            course={this.props.course}
            programId={this.props.programId}
            onSubmit={this.props.updateCourse}
          />
        </div>
      </div>
    );
  }
}

function mapStateToProps({ courses }, props) {
  const { programId, courseId } = props.match.params;

  const course = courses.items ? courses.items[courseId] : null;

  return {
    course,
    programId
  };
}

const mapDispatchToProps = {
  updateCourse
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditCourse);
