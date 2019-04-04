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
    if (!this.props.course) {
      return <LoadingBar />;
    }

    const {
      programId,
      course: { _id, name, shortname },
      history
    } = this.props;
    const initialValues = { name, shortname };

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
            this.props.updateCourse(programId, _id, values, history)
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
