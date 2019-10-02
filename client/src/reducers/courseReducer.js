import {
  REQUEST_COURSES,
  REQUEST_FAILURE_COURSES,
  RESOLVE_COURSES,
  FETCH_COURSES,
  CREATE_COURSE,
  UPDATE_COURSE,
  DELETE_COURSE
} from "../actions/courses";
import { GET_DEMO_COURSES } from "../actions/demo";
import {
  dataArrayToObject,
  deleteItemFromObject
} from "../utils/reducerHelpers";

export default function(
  state = { isFetching: false, items: {}, error: { message: null } },
  action
) {
  switch (action.type) {
    case REQUEST_COURSES:
      return {
        ...state,
        isFetching: true
      };
    case REQUEST_FAILURE_COURSES:
      return {
        ...state,
        isFetching: false,
        error: {
          ...state.error,
          message: action.payload
        }
      };
    case RESOLVE_COURSES:
      return {
        ...state,
        isFetching: false,
        error: {
          message: null
        }
      };
    case FETCH_COURSES:
      return {
        ...state,
        isFetching: false,
        items: dataArrayToObject(action.payload)
      };
    case CREATE_COURSE:
    case UPDATE_COURSE:
      return {
        ...state,
        isFetching: false,
        items: {
          ...state.items,
          [action.payload._id]: action.payload
        }
      };
    case DELETE_COURSE:
      return {
        ...state,
        isFetching: false,
        items: deleteItemFromObject(state.items, action.payload)
      };
    case GET_DEMO_COURSES:
      return {
        ...state,
        items: action.payload
      };
    default:
      return state;
  }
}
