import {
  CREATE_PROGRAM,
  FETCH_PROGRAMS,
  UPDATE_PROGRAM,
  DELETE_PROGRAM
} from '../actions/programs'
import { CREATE_COURSE, DELETE_COURSE } from '../actions/courses'
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
    case CREATE_PROGRAM:
      return {
        ...state,
        items: {
          ...state.items,
          [action.payload._id]: action.payload
        }
      }
    case FETCH_PROGRAMS:
      return {
        ...state,
        items: dataArrayToObject(action.payload)
      }
    case UPDATE_PROGRAM:
      return {
        ...state,
        items: {
          ...state.items,
          [action.payload._id]: action.payload
        }
      }
    case DELETE_PROGRAM:
      return {
        ...state,
        items: deleteItemFromObject(state.items, action.payload)
      }
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
      }
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
      }
    default:
      return state
  }
}
