import React, { Component } from "react";
import _ from "lodash";
import moment from "moment";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { assignmentInputFields } from "./assignmentFields";
// API
import { updateAssignment } from "../../actions/assignments";
// Components
import {
  MainContainer,
  HeaderContainer
} from "../../components/Page/Containers";
import Form from "../../components/Form";
import Loader from "../../components/Loader";

class EditAssignment extends Component {
  static propTypes = {
    assignmentId: PropTypes.string.isRequired,
    courseId: PropTypes.string.isRequired,
    assignmentExists: PropTypes.bool.isRequired,
    initialValues: PropTypes.shape({
      name: PropTypes.string,
      details: PropTypes.string,
      dateDue: PropTypes.instanceOf(Date)
    }).isRequired,
    updateAssignment: PropTypes.func.isRequired,
    // Connect props
    history: PropTypes.object,
    location: PropTypes.object,
    match: PropTypes.object
  };

  render() {
    const {
      assignmentId,
      courseId,
      assignmentExists,
      initialValues,
      history
    } = this.props;

    if (!assignmentExists) {
      return <Loader />;
    }

    return (
      <MainContainer>
        <HeaderContainer>
          <h3>Edit Assignment</h3>
        </HeaderContainer>
        <Form
          formName="EditAssignmentForm"
          formFields={assignmentInputFields}
          initialValues={initialValues}
          onSubmit={values =>
            this.props.updateAssignment(courseId, assignmentId, values, history)
          }
        />
      </MainContainer>
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

  return {
    assignmentId,
    courseId,
    assignmentExists: assignment ? true : false,
    initialValues: {
      name: assignment ? assignment.name : null,
      details: assignment ? assignment.details : null,
      dateDue: assignment ? moment(assignment.dateDue).toDate() : null
    }
  };
}

const mapDispatchToProps = {
  updateAssignment
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditAssignment);
