import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { assignmentInputFields } from "./assignmentFields";
// Components
import Form from "../../components/Form";
import Button from "../../components/Button";
// API
import { createAssignment } from "../../actions/assignments";
// Styling
import styles from "./AddAssignment.module.css";

class AddAssignment extends Component {
  static propTypes = {
    courseId: PropTypes.string.isRequired,
    createAssignment: PropTypes.func.isRequired,
    // Connect stuff
    history: PropTypes.object,
    location: PropTypes.object,
    match: PropTypes.object
  };

  state = {
    activeForm: "Default"
  };

  handleFormChange = e => {
    const formName = e.target.innerHTML;

    this.setState(() => ({
      activeForm: formName
    }));
  };

  render() {
    const { courseId, history, createAssignment } = this.props;
    const { activeForm } = this.state;

    return (
      <div className={styles.mainContainer}>
        <div className={styles.headerContainer}>
          <h3>Add a New Assignment</h3>
        </div>
        <div className={styles.formOptions}>
          <Button
            additionalClass={
              activeForm === "Default"
                ? `${styles.formOptionBtn} ${styles.defaultFormBtn} ${
                    styles.activeDefaultFormBtn
                  }`
                : `${styles.formOptionBtn} ${styles.defaultFormBtn}`
            }
            onClick={this.handleFormChange}
          >
            Default
          </Button>
          <Button
            additionalClass={
              activeForm === "YouTube"
                ? `${styles.formOptionBtn} ${styles.youtubeFormBtn} ${
                    styles.activeYoutubeFormBtn
                  }`
                : `${styles.formOptionBtn} ${styles.youtubeFormBtn}`
            }
            onClick={this.handleFormChange}
          >
            YouTube
          </Button>
        </div>
        <Form
          formName="AddAssignment"
          formFields={assignmentInputFields}
          onSubmit={values => createAssignment(courseId, values, history)}
        />
      </div>
    );
  }
}

function mapStateToProps(state, props) {
  const { courseId } = props.match.params;

  return {
    courseId
  };
}

const mapDispatchToProps = {
  createAssignment
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddAssignment);
