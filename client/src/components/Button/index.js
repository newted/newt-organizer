import React from "react";
import PropTypes from "prop-types";
// Styling
import styles from "./Button.module.css";

const Button = ({
  type="button",
  onClick,
  category,
  style,
  additionalClass,
  children
}) => {
  // Choosing the button class based on the category prop for commonly used
  // button styles (adding, deleting, etc.).
  const selectClassFromCategory = category => {
    switch (category) {
      case "primary":
        return styles.primaryBtn;
      case "success":
        return styles.successBtn;
      case "danger":
        return styles.dangerBtn;
      default:
        return "";
    }
  };
  
  return (
    <button
      type={type}
      className={`${styles.btn} ${selectClassFromCategory(category)} ${
        additionalClass ? additionalClass : ""
      }`}
      category={category}
      style={style}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  type: PropTypes.string,
  onClick: PropTypes.func,
  category: PropTypes.oneOf(["primary", "success", "danger"]),
  style: PropTypes.object,
  additionalClass: PropTypes.string,
  children: PropTypes.node
};

export default Button;
