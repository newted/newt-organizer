import {
  CREATE_COURSE,
  FETCH_COURSES,
  UPDATE_COURSE,
  DELETE_COURSE
} from '../actions/courses'
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
    case UPDATE_COURSE:
      return {
        ...state,
        items: {
          ...state.items,
          [action.payload._id]: action.payload
        }
      }
    case DELETE_COURSE:
      return {
        ...state,
        items: deleteItemFromObject(state.items, action.payload.courseId)
      }
    default:
      return state
  }
}
