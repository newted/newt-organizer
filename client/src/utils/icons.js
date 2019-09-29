import React from "react";
import { FaUniversity, FaCircle } from "react-icons/fa";
import { FiBook } from "react-icons/fi";

const iconSize = 30;

export const UniversityIcon = <FaUniversity size={iconSize} />;
export const BookIcon = <FiBook size={iconSize} />;

// Red, green or grey circle to indicate whether content is incomplete,
// complete, or in progress
export const StatusIcon = (completed, inProgress, size) => {
  if (inProgress) {
    return <FaCircle color="#ccc" size={size || 11} />;
  }

  if (completed) {
    return <FaCircle color="#33ce57" size={size || 11} />;
  } else {
    return <FaCircle color="#dc3545" size={size || 11} />;
  }
};
