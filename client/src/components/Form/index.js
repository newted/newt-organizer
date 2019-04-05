import React, { Component } from "react";
import _ from "lodash";
import PropTypes from "prop-types";
import { withFormik } from "formik";
// Components
import Button from "../Button";
import DatePicker from "react-datepicker";
// Styling
import styles from "./Form.module.css";
import "react-datepicker/dist/react-datepicker-cssmodules.css";
// Helpers
import { initializeInputValues, basicValidation } from "./helpers";

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
        handleChange,
        handleBlur,
        formFields,
        setFieldValue,
        setFieldTouched
      } = this.props;

      return _.map(formFields, ({ label, name, required, type }) => {
        const inputType = type || "text";
        // At some point, extract this as another component (edit Field
        // component, which is currently designed for reduxForm).
        return (
          <div className={styles.inputGroup} key={name}>
            <div>
              <label className={styles.label}>{label}</label>
              {!required && <span className={styles.optional}>Optional</span>}
            </div>
            {inputType === "datepicker" ? (
              <DatePicker
                dateFormat="MMM d, yyyy"
                selected={values[name] ? values[name] : null}
                placeholderText="Select date"
                className={styles.input}
                onChange={e => setFieldValue(name, e)}
                onBlur={e => setFieldTouched(name)}
              />
            ) : (
              <input
                type="text"
                className={styles.input}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values[name]}
                name={name}
                key={name}
              />
            )}
            {touched[name] && errors[name] && (
              <small className={styles.error}>{errors[name]}</small>
            )}
          </div>
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
