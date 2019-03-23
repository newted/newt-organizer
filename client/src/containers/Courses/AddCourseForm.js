import React, { Component } from "react";
import _ from "lodash";
import PropTypes from "prop-types";
import { reduxForm, Form, Field as ReduxField } from "redux-form";
import { withRouter } from "react-router-dom";
import courseFields from "./courseFields";
// Components
import Button from "../../components/Button";
import Field from "../../components/Field";
// Styling
import styles from "./AddCourseForm.module.css";

class AddCourseForm extends Component {
  static propTypes = {
    programId: PropTypes.string.isRequired,
    handleSubmit: PropTypes.func.isRequired, // Redux form submit func.
    onSubmit: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired
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
    const { programId, handleSubmit, onSubmit, history } = this.props;

    return (
      <div className={styles.formContainer}>
        <Form
          onSubmit={handleSubmit(values =>
            onSubmit(programId, values, history)
          )}
        >
          {this.renderFields()}
          <Button type="submit" category="primary" style={{ width: "125px" }}>
            Submit
          </Button>
        </Form>
      </div>
    );
  }
}

// Input validation function
function validate(values) {
  const errors = {};

  _.each(courseFields, ({ name, required }) => {
    if (required && !values[name]) {
      errors[name] = "You must provide a value.";
    }
  });

  return errors;
}

export default reduxForm({
  validate,
  form: "addCourseForm"
})(withRouter(AddCourseForm));
