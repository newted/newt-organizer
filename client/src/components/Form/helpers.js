import _ from "lodash";

// Initialize an object of empty strings for each input field.
// (For the mapPropsToValues function for Formik)
export const initializeInputValues = fields => {
  let values = {};

  _.each(fields, ({ name }) => {
    values[name] = "";
  });

  return values;
};

// Basic validation function that adds an general error message
// if a field is required.
export const basicValidation = (values, formFields) => {
  const errors = {};

  _.each(formFields, ({ name, required }) => {
    if (required && !values[name]) {
      errors[name] = "You must provide a value.";
    }
  });

  return errors;
}
