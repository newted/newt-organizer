import {
  CREATE_COURSE,
  FETCH_COURSES,
  FETCH_ALL_COURSES,
  UPDATE_COURSE,
  DELETE_COURSE
} from '../actions/courses'
import {
  CREATE_ASSIGNMENT,
  UPDATE_ASSIGNMENT,
  DELETE_ASSIGNMENT
} from '../actions/assignments'
import {
  dataArrayToObject,
  deleteItemFromObject
} from '../utils/reducerHelpers'

export default function (
  state = {
    items: {}
  },
  action
) {
  switch(action.type) {
    case CREATE_COURSE:
      return {
        ...state,
        items: {
          ...state.items,
          [action.payload.course._id]: action.payload.course
        }
      }
    case FETCH_COURSES:
      return {
        ...state,
        items: Object.assign({}, state.items, dataArrayToObject(action.payload))
      }
    case FETCH_ALL_COURSES:
      return {
        ...state,
        items: dataArrayToObject(action.payload)
      }
    case DELETE_COURSE:
      return {
        ...state,
        items: deleteItemFromObject(state.items, action.payload.courseId)
      }
    case UPDATE_COURSE:
    case CREATE_ASSIGNMENT:
    case UPDATE_ASSIGNMENT:
    case DELETE_ASSIGNMENT:
      return {
        ...state,
        items: {
          ...state.items,
          [action.payload._id]: action.payload
        }
      }
    default:
      return state
  }
}
