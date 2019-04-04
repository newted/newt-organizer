import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import LoadingBar from "react-redux-loading";
import courseFields from "./courseFields";
// API
import { updateCourse } from "../../actions/courses";
// Components
import Form from "../../components/Form";
// Styling
import styles from "./EditCourse.module.css";

class EditCourse extends Component {
  static propTypes = {
    programId: PropTypes.string.isRequired,
    course: PropTypes.shape({
      id: PropTypes.string,
      exists: PropTypes.bool
    }).isRequired,
    initialValues: PropTypes.shape({
      name: PropTypes.string,
      shortname: PropTypes.string
    }).isRequired,
    updateCourse: PropTypes.func.isRequired,
    // Connect props
    history: PropTypes.object,
    location: PropTypes.object,
    match: PropTypes.object
  };

  render() {
    const {
      programId,
      course,
      initialValues,
      history
    } = this.props;

    if (!course.exists) {
      return <LoadingBar />;
    }

    return (
      <div className={styles.mainContainer}>
        <div className={styles.headerContainer}>
          <h3>Edit Course</h3>
        </div>
        <Form
          formName="EditCourseForm"
          formFields={courseFields}
          initialValues={initialValues}
          onSubmit={values =>
            this.props.updateCourse(programId, course.id, values, history)
          }
        />
      </div>
    );
  }
}

function mapStateToProps({ courses }, props) {
  const { programId, courseId } = props.match.params;

  const course = courses.items ? courses.items[courseId] : null;
  const courseExists = course ? true : false
  const initialValues = {
    name: course ? course.name : null,
    shortname: course ? course.shortname : null
  }

  return {
    programId,
    course: {
      id: courseId,
      exists: courseExists
    },
    initialValues
  };
}

const mapDispatchToProps = {
  updateCourse
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditCourse);
