import React from "react";
import PropTypes from "prop-types";
// Styling
import styles from "./Button.module.css";

const Button = ({ type, onClick, additionalClass, children }) => (
  <button
    type={type}
    className={`${styles.btn} ${additionalClass ? additionalClass : ""}`}
    onClick={onClick}
  >
    {children}
  </button>
);

Button.propTypes = {
  type: PropTypes.string,
  onClick: PropTypes.func,
  additionalClass: PropTypes.string,
  children: PropTypes.node
};

export default Button;
