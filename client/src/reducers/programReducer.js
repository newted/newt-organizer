import {
  CREATE_PROGRAM,
  FETCH_PROGRAMS,
  UPDATE_PROGRAM
} from '../actions/programs'

export default function(
  state = {
    items: {}
  },
  action
) {
  switch(action.type) {
    case CREATE_PROGRAM:
      return {
        ...state,
        items: action.payload
      }
    case FETCH_PROGRAMS:
      return {
        ...state,
        items: action.payload
      }
    case UPDATE_PROGRAM:
      return state
    default:
      return state
  }
}
