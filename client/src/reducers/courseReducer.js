import { CREATE_COURSE } from '../actions/courses'

export default function(
  state = {
    items: {}
  },
  action
) {
  switch(action.type) {
    case CREATE_COURSE:
      return state
    default:
      return state
  }
}
