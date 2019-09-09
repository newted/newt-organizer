import { FETCH_NEW_COURSES, CREATE_NEW_COURSE } from "../actions/newCourses";
import { dataArrayToObject } from "../utils/reducerHelpers";

export default function(
  state = { isFetching: false, items: {}, error: { message: null } },
  action
) {
  switch (action.type) {
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
