import { CREATE_PROGRAM, FETCH_PROGRAMS } from '../actions/programs'

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
        items: action.payload
      }
    default:
      return state
  }
}
