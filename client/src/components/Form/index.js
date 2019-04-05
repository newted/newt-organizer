import React, { Component } from "react";
import _ from "lodash";
import PropTypes from "prop-types";
import { withFormik } from "formik";
// Components
import Field from './Field'
import Button from "../Button";
// Styling
import styles from "./Form.module.css";
// Helpers
import { initializeInputValues, basicValidation, parseValue } from "./helpers";

const Form = ({
  formName,
  formFields,
  initialValues,
  onSubmit,
  buttonText = "Submit"
}) => {
  class FormikForm extends Component {
    // Create input fields based on formFields array.
    renderFields() {
      const {
        values,
        touched,
        errors,
        formFields,
      } = this.props;

      return _.map(formFields, ({ label, name, required, type }) => {
        const inputType = type || "text";
        // Input object to pass as prop to Field component
        const input = {
          handleChange: this.props.handleChange,
          handleBlur: this.props.handleBlur,
          setFieldValue: this.props.setFieldValue,
          setFieldTouched: this.props.setFieldTouched,
          value: parseValue(values, inputType, name),
          type: inputType
        }

        return (
          <Field
            input={input}
            label={label}
            name={name}
            required={required}
            touched={touched[name]}
            error={errors[name]}
            key={name}
          />
        );
      });
    }

    render() {
      const { handleSubmit } = this.props;

      return (
        <form className={styles.formContainer} onSubmit={handleSubmit}>
          {this.renderFields()}
          <Button type="submit" category="primary" style={{ width: "125px" }}>
            {buttonText}
          </Button>
        </form>
      );
    }
  }

  FormikForm = withFormik({
    // If there are initial values sent as props, use the initital values,
    // otherwise generate empty strings for each input field
    mapPropsToValues: ({ initialValues, formFields }) =>
      initialValues ? initialValues : initializeInputValues(formFields),
    // Validation function.
    // (In the future have either a more advanced validation function, or allow
    // it to be passed as a prop).
    validate: values => basicValidation(values, formFields),
    // Function to call when form is submitted. Passed as prop (onSubmit)
    handleSubmit: (values, { setSubmitting }) => {
      try {
        onSubmit(values);
      } catch (error) {
        console.log(error);
      }

      setSubmitting(false);
    },
    // Name of form
    displayName: formName
  })(FormikForm);

  return <FormikForm formFields={formFields} initialValues={initialValues} />;
};

Form.propTypes = {
  formName: PropTypes.string.isRequired,
  formFields: PropTypes.array.isRequired,
  onSubmit: PropTypes.func.isRequired,
  initialValues: PropTypes.object
};

export default Form;
