import React from "react";
import { DefaultToast } from "react-toast-notifications";

const CustomToast = ({ children, ...props }) => {
  return <DefaultToast {...props}>{children}</DefaultToast>;
};

export default CustomToast;
