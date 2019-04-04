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
    courseId: PropTypes.string.isRequired,
    courseExists: PropTypes.bool.isRequired,
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
      courseId,
      courseExists,
      initialValues,
      updateCourse,
      history
    } = this.props;

    if (!courseExists) {
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
            updateCourse(programId, courseId, values, history)
          }
        />
      </div>
    );
  }
}

function mapStateToProps({ courses }, props) {
  const { programId, courseId } = props.match.params;
  const course = courses.items ? courses.items[courseId] : null;

  return {
    programId,
    courseId,
    courseExists: course ? true : false,
    initialValues: {
      name: course ? course.name : null,
      shortname: course ? course.shortname : null
    }
  };
}

const mapDispatchToProps = {
  updateCourse
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditCourse);
