import React, { Component } from "react";
import PropTypes from "prop-types";
// Components
import DatePicker from "react-datepicker";
// Styling
import styles from "./DateField.module.css";
import "react-datepicker/dist/react-datepicker-cssmodules.css";

class DateField extends Component {
  static propTypes = {
    input: PropTypes.shape({
      name: PropTypes.string.isRequired,
      onBlur: PropTypes.func,
      onChange: PropTypes.func,
      onDragStart: PropTypes.func,
      onDrop: PropTypes.func,
      onFocus: PropTypes.func,
      value: PropTypes.oneOfType([PropTypes.object, PropTypes.string])
        .isRequired
    }),
    label: PropTypes.string.isRequired,
    required: PropTypes.bool.isRequired,
    meta: PropTypes.shape({
      error: PropTypes.string,
      touched: PropTypes.bool
    })
  };

  // So Redux form *sometimes* passes input.value as a string and
  // sometimes as an object. Datepicker crashes it its selected prop is given
  // a string, only works if it's a Date object. So this function ensures
  // that the selected prop is passed a Date object.
  sanitizeDate = date => {
    // Default value is empty string
    if (typeof date === "string" && date.length > 0) {
      const newDate = new Date(date);
      return newDate;
    }

    return date;
  };

  render() {
    const {
      input,
      label,
      required,
      meta: { error, touched }
    } = this.props;

    return (
      <div className={styles.inputGroup}>
        <div>
          <label className={styles.label}>{label}</label>
          {!required && <span className={styles.tag}>Optional</span>}
        </div>
        <div className={styles.dateContainer}>
          <DatePicker
            dateFormat="MMM d, yyyy"
            selected={this.sanitizeDate(input.value) || null}
            placeholderText="Select date"
            onChange={input.onChange}
            onFocus={input.onFocus} // Didn't pass these as {...input} because value field throws a type error
            onBlur={input.onBlur}
            onDrop={input.onDrop}
            onDragStart={input.onDragStart}
            className={styles.input}
          />
          {touched && error && <small className={styles.error}>{error}</small>}
        </div>
      </div>
    );
  }
}

export default DateField;
