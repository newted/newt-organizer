import {
  REQUEST_NEW_COURSES,
  RESOLVE_NEW_COURSES,
  FETCH_NEW_COURSES,
  CREATE_NEW_COURSE
} from "../actions/newCourses";
import { dataArrayToObject } from "../utils/reducerHelpers";

export default function(
  state = { isFetching: false, items: {}, error: { message: null } },
  action
) {
  switch (action.type) {
    case REQUEST_NEW_COURSES:
      return {
        ...state,
        isFetching: true
      };
    case RESOLVE_NEW_COURSES:
      return {
        ...state,
        isFetching: false
      };
    case FETCH_NEW_COURSES:
      return {
        ...state,
        isFetching: false,
        items: dataArrayToObject(action.payload)
      };
    case CREATE_NEW_COURSE:
      return {
        ...state,
        isFetching: false,
        items: {
          ...state.items,
          [action.payload._id]: action.payload
        }
      };
    default:
      return state;
  }
}
