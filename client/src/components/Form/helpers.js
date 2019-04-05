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

// The Datepicker component throws an error if the value passed is of type
// string (the initial value of the input, unless otherwise specified, is an
// empty string for Formik). To avoid this annoying error, this function takes
// the value and for the input type of "datepicker", if there isn't a value
// (i.e empty string), it returns null. For normal input just return empty
// string (or whatever the value is).
export const parseValue = (values, inputType, name) => {
  if (inputType === "datepicker") {
    if (values[name]) {
      return values[name]
    } else {
      return null
    }
  }

  return values[name]
}
