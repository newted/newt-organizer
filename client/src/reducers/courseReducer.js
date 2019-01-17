import { FETCH_PROGRAMS } from '../actions/programs'
import { coursesByProgram } from '../utils/reducerHelpers'

export default function (
  state = {
    items: {}
  },
  action
) {
  switch(action.type) {
    case FETCH_PROGRAMS:
      return {
        ...state,
        items: coursesByProgram(action.payload)
      }
    default:
      return state
  }
}
