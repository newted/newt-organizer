import React from "react";

export const findByComponentType = (children, component) => {
  const result = [];
  // This is the array of result since it's possible to have multiple instances
  // of the same sub-component
  const type = [component.name];

  // We can store the actual name of the component through the name property of
  // our sub-component
  React.Children.forEach(children, child => {
    const childType =
      child && child.type && (child.type.displayName || child.type.name);

    if (type.includes(childType)) {
      result.push(child);
    }
  });

  // Then we go through each React children, if one of matches the name of the
  // sub-component we’re looking for we put it in the result array
  return result[0];
};

// This function creates an object of [assignmentId]: null which is meant to
// denote whether the dropdown for the table row for that particular assignment
// is supposed to be visible or not.
export const initializeDropdownMenuState = assignments => {
  const dropdownMenuState = {};

  assignments.map(assignment => {
    return (dropdownMenuState[assignment._id] = false);
  });

  return dropdownMenuState;
};
