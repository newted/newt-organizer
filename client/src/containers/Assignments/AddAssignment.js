import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
// Components
import AddAssignmentForm from "./AddAssignmentForm";
// API
import { submitAssignment } from "../../actions/assignments";
// Styling
import styles from "./AddAssignment.module.css";

class AddAssignment extends Component {
  static propTypes = {
    courseId: PropTypes.string.isRequired,
    submitAssignment: PropTypes.func.isRequired,
    // Connect stuff
    history: PropTypes.object,
    location: PropTypes.object,
    match: PropTypes.object
  };

  render() {
    return (
      <div className={styles.mainContainer}>
        <div className={styles.headerContainer}>
          <h3>Add a New Assignment</h3>
        </div>
        <AddAssignmentForm
          courseId={this.props.courseId}
          onSubmit={this.props.submitAssignment}
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
  submitAssignment
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddAssignment);
