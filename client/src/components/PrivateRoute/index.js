import React from "react";
import PropTypes from "prop-types";
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({ component: Component, auth, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      auth.exists ? <Component {...props} /> : <Redirect to="/login" />
    }
  />
);

PrivateRoute.propTypes = {
  auth: PropTypes.shape({
    isFetching: PropTypes.bool,
    exists: PropTypes.bool.isRequired,
    item: PropTypes.object
  }),
  Component: PropTypes.func
};

export default PrivateRoute;
