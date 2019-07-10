import {
  REQUEST_COURSES,
  REQUEST_FAILURE_COURSES,
  RESOLVE_COURSES,
  REMOVE_COURSES,
  CREATE_COURSE,
  FETCH_COURSES,
  FETCH_ALL_COURSES,
  UPDATE_COURSE,
  DELETE_COURSE
} from "../actions/courses";
import {
  CREATE_ASSIGNMENT,
  UPDATE_ASSIGNMENT,
  MARK_ASSIGNMENT_COMPLETE,
  MARK_ASSIGNMENT_IN_PROGRESS,
  MARK_ASSIGNMENT_INCOMPLETE,
  DELETE_ASSIGNMENT
} from "../actions/assignments";
import { GET_DEMO_COURSES } from "../actions/demo";
import {
  dataArrayToObject,
  deleteItemFromObject
} from "../utils/reducerHelpers";

export default function(
  state = {
    isFetching: false,
    items: {},
    error: {
      message: null,
      requestType: null,
      source: null
    }
  },
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
          message: action.payload.message,
          requestType: action.payload.requestType,
          source: action.payload.source
        }
      };
    case RESOLVE_COURSES:
      return {
        ...state,
        isFetching: false,
        error: {
          message: null,
          requestType: null,
          source: null
        }
      };
    case REMOVE_COURSES:
      return {
        ...state,
        isFetching: false,
        items: {}
      };
    case CREATE_COURSE:
      return {
        ...state,
        isFetching: false,
        items: {
          ...state.items,
          [action.payload.course._id]: action.payload.course
        }
      };
    case FETCH_COURSES:
      return {
        ...state,
        isFetching: false,
        items: Object.assign({}, state.items, dataArrayToObject(action.payload))
      };
    case FETCH_ALL_COURSES:
      return {
        ...state,
        isFetching: false,
        items: dataArrayToObject(action.payload)
      };
    case DELETE_COURSE:
      return {
        ...state,
        isFetching: false,
        items: deleteItemFromObject(state.items, action.payload.courseId)
      };
    case UPDATE_COURSE:
    case CREATE_ASSIGNMENT:
    case UPDATE_ASSIGNMENT:
    case MARK_ASSIGNMENT_COMPLETE:
    case MARK_ASSIGNMENT_IN_PROGRESS:
    case MARK_ASSIGNMENT_INCOMPLETE:
    case DELETE_ASSIGNMENT:
      return {
        ...state,
        isFetching: false,
        items: {
          ...state.items,
          [action.payload._id]: action.payload
        }
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
