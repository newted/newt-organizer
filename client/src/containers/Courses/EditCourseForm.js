import React, { Component } from "react";
import _ from "lodash";
import PropTypes from "prop-types";
import { reduxForm, Form, Field as ReduxField } from "redux-form";
import { withRouter } from "react-router-dom";
import LoadingBar from "react-redux-loading";
import courseFields from "./courseFields";
// Components
import Button from "../../components/Button";
import Field from "../../components/Field";
// Styling
import styles from "./EditCourseForm.module.css";

const EditCourseForm = ({ course, programId, onSubmit }) => {
  if (!course) {
    return <LoadingBar />;
  }

  class EditCourseFormComponent extends Component {
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
      handleSubmit: PropTypes.func.isRequired,
      onSubmit: PropTypes.func.isRequired,
      history: PropTypes.object
    };

    renderFields() {
      return _.map(courseFields, ({ label, name, required }) => {
        return (
          <ReduxField
            component={Field}
            type="text"
            label={label}
            name={name}
            required={required}
            key={name}
          />
        );
      });
    }

    render() {
      const { handleSubmit, onSubmit, history } = this.props;

      return (
        <div className={styles.formContainer}>
          <Form
            onSubmit={handleSubmit(values =>
              onSubmit(programId, course._id, values, history)
            )}
          >
            {this.renderFields()}
            <Button type="submit" additionalClass={styles.updateBtn}>
              Update
            </Button>
          </Form>
        </div>
      );
    }
  }

  EditCourseFormComponent = reduxForm({
    form: "editCourseForm",
    initialValues: {
      name: course.name,
      shortname: course.shortname
    }
  })(withRouter(EditCourseFormComponent));

  return <EditCourseFormComponent course={course} onSubmit={onSubmit} />;
};

export default EditCourseForm;
