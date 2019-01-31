import { CREATE_PROGRAM, FETCH_PROGRAMS } from '../actions/programs'
import { programsArrayToObject } from '../utils/reducerHelpers'

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
          [action.payload._id]: action.payload
        }
      }
    case FETCH_PROGRAMS:
      return {
        ...state,
        items: programsArrayToObject(action.payload)
      }
    default:
      return state
  }
}
