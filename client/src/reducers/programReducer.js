import {
  REQUEST_PROGRAMS,
  REQUEST_FAILURE_PROGRAMS,
  RESOLVE_PROGRAMS,
  REMOVE_PROGRAMS,
  CREATE_PROGRAM,
  FETCH_PROGRAMS,
  UPDATE_PROGRAM,
  DELETE_PROGRAM
} from "../actions/programs";
import { GET_DEMO_PROGRAMS } from "../actions/demo";
import { CREATE_COURSE, DELETE_COURSE } from "../actions/courses";
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
      requestType: null
    }
  },
  action
) {
  switch (action.type) {
    case REQUEST_PROGRAMS:
      return {
        ...state,
        isFetching: true
      };
    case REQUEST_FAILURE_PROGRAMS:
      return {
        ...state,
        isFetching: false,
        error: {
          ...state.error,
          message: action.payload.message,
          requestType: action.payload.requestType
        }
      };
    case RESOLVE_PROGRAMS:
      return {
        ...state,
        isFetching: false,
        error: {
          message: null,
          requestType: null
        }
      };
    case REMOVE_PROGRAMS:
      return {
        ...state,
        isFetching: false,
        items: {}
      };
    case CREATE_PROGRAM:
      return {
        ...state,
        isFetching: false,
        items: {
          ...state.items,
          [action.payload._id]: action.payload
        }
      };
    case FETCH_PROGRAMS:
      return {
        ...state,
        isFetching: false,
        items: dataArrayToObject(action.payload)
      };
    case UPDATE_PROGRAM:
      return {
        ...state,
        isFetching: false,
        items: {
          ...state.items,
          [action.payload._id]: action.payload
        }
      };
    case DELETE_PROGRAM:
      return {
        ...state,
        isFetching: false,
        items: deleteItemFromObject(state.items, action.payload)
      };
    case CREATE_COURSE:
      return {
        ...state,
        items: {
          ...state.items,
          [action.payload.programId]: {
            ...state.items[action.payload.programId],
            courses: [
              ...state.items[action.payload.programId].courses,
              action.payload.course._id
            ]
          }
        }
      };
    case DELETE_COURSE:
      return {
        ...state,
        items: {
          ...state.items,
          [action.payload.programId]: {
            ...state.items[action.payload.programId],
            courses: state.items[action.payload.programId].courses.filter(
              id => id !== action.payload.courseId
            )
          }
        }
      };
    case GET_DEMO_PROGRAMS:
      return {
        ...state,
        items: action.payload
      };
    default:
      return state;
  }
}
