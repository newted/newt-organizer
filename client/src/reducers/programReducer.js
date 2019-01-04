import { CREATE_PROGRAM } from '../actions/programs'

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
    default:
      return state
  }
}
