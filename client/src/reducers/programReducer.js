import {
  CREATE_PROGRAM,
  FETCH_PROGRAMS,
  UPDATE_PROGRAM,
  DELETE_PROGRAM,
} from '../actions/programs'
import {
  CREATE_COURSE,
  UPDATE_COURSE,
  DELETE_COURSE
} from '../actions/courses'

export default function(
  state = {
    items: {}
  },
  action
) {
  switch(action.type) {
    case CREATE_PROGRAM:
      return state
    case FETCH_PROGRAMS:
      return {
        ...state,
        items: action.payload
      }
    case UPDATE_PROGRAM:
      return state
    case DELETE_PROGRAM:
      return state
    case CREATE_COURSE:
      return state
    case UPDATE_COURSE:
      return state
    case DELETE_COURSE:
      return state
    default:
      return state
  }
}
