import React from "react";
import PropTypes from "prop-types";
import DatePicker from "react-datepicker";
// Styling
import styles from "./Field.module.css";
import "react-datepicker/dist/react-datepicker-cssmodules.css";

const Field = ({ input, label, name, required, touched, error }) => {
  return (
    <div className={styles.inputGroup}>
      <div>
        <label className={styles.label}>{label}</label>
        {!required && <span className={styles.optional}>Optional</span>}
      </div>
      {
        input.type === "datepicker"
        ? (
          <DatePicker
            dateFormat="MMM d, yyyy h:mm aa"
            selected={input.value}
            placeholderText="Select date"
            className={styles.input}
            onChange={e => input.setFieldValue(name, e)}
            onBlur={() => input.setFieldTouched(name, true)}
            showTimeSelect
            timeFormat="HH:mm"
            timeIntervals={30}
          />
        ) : (
          <input
            type={input.type}
            className={styles.input}
            onChange={input.handleChange}
            onBlur={input.handleBlur}
            value={input.value}
            name={name}
          />
        )
      }
      {touched && error && <small className={styles.error}>{error}</small>}
    </div>
  );
};

Field.propTypes = {
  input: PropTypes.shape({
    handleChange: PropTypes.func,
    handleBlur: PropTypes.func,
    setFieldValue: PropTypes.func,
    setFieldTouched: PropTypes.func,
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.instanceOf(Date)
    ]),
    type: PropTypes.string
  }).isRequired,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  required: PropTypes.bool,
  // Touched should ideally be a PropType of only bool, but for some reason,
  // when I submit the form, the Datepicker component decides to change the
  // value of 'touched' to an empty object instead of true. Only when submit,
  // it works fine when touching prior to submitting (error message works fine
  // too). It's probably something with either Datepicker or something Formik
  // does before/during handleSubmit, but I have no idea why this happens. So
  // below is an admittedly lazy workaround to that.
  touched: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.object
  ]),
  error: PropTypes.string
};

export default Field;
