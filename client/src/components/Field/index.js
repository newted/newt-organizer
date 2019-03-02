import React from "react";
import PropTypes from "prop-types";
// Styling
import styles from "./Field.module.css";

const Field = ({ input, label, required, meta: { error, touched } }) => {
  return (
    <div className={styles.inputGroup}>
      <div>
        <label className={styles.label}>{label}</label>
        {!required && <span className={styles.tag}>Optional</span>}
      </div>
      <input {...input} className={styles.input} />
      {touched && error && <small className={styles.error}>{error}</small>}
    </div>
  );
};

Field.propTypes = {
  input: PropTypes.object,
  label: PropTypes.string,
  required: PropTypes.bool,
  meta: PropTypes.object
};

export default Field;
