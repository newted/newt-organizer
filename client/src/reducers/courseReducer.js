import { CREATE_COURSE, FETCH_COURSES } from '../actions/courses'

export default function(
  state = {
    items: {}
  },
  action
) {
  switch(action.type) {
    case CREATE_COURSE:
      return state
    case FETCH_COURSES:
      return {
        ...state,
        items: action.payload
      }
    default:
      return state
  }
}
