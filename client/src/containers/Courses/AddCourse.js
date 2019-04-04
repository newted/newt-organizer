import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import courseFields from "./courseFields";
// Components
import Form from "../../components/Form";
// API
import { createCourse } from "../../actions/courses";
// Styling
import styles from "./AddCourse.module.css";

class AddCourse extends Component {
  static propTypes = {
    programId: PropTypes.string.isRequired,
    createCourse: PropTypes.func.isRequired,
    // Connect props
    history: PropTypes.object,
    location: PropTypes.object,
    match: PropTypes.object
  };

  render() {
    return (
      <div className={styles.mainContainer}>
        <div className={styles.headerContainer}>
          <h3>Add a New Course</h3>
        </div>
        <Form
          formName="AddCourseForm"
          formFields={courseFields}
          onSubmit={values =>
            this.props.createCourse(
              this.props.programId,
              values,
              this.props.history
            )
          }
        />
      </div>
    );
  }
}

function mapStateToProps(state, props) {
  const { programId } = props.match.params;

  return {
    programId
  };
}

const mapDispatchToProps = {
  createCourse
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddCourse);
