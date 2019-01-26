import { FETCH_PROGRAMS } from '../actions/programs'

export default function (
  state = {
    items: []
  },
  action
) {
  switch(action.type) {
    case FETCH_PROGRAMS:
      return {
        ...state,
        items: action.payload
      }
    default:
      return state
  }
}
