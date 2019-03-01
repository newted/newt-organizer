import thunk from "redux-thunk";
import logger from "./logger";
import { applyMiddleware } from "redux";

let middleware;

// Not the way the docs recommends to do it (because I've loaded middleware I
// may not require), but that way kept throwing an error "Middleware is not a
// function."
// See: https://redux.js.org/api/applymiddleware
// and: https://github.com/reduxjs/redux/issues/581#issuecomment-133187076
if (process.env.NODE_ENV !== "production") {
  middleware = applyMiddleware(thunk, logger);
} else {
  middleware = applyMiddleware(thunk);
}

export default middleware;
