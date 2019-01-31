import { CREATE_COURSE, FETCH_COURSES } from '../actions/courses'
import { dataArrayToObject } from '../utils/reducerHelpers'

export default function (
  state = {
    items: {}
  },
  action
) {
  switch(action.type) {
    case CREATE_COURSE:
      return {
        ...state,
        items: {
          ...state.items,
          [action.payload.course._id]: action.payload.course
        }
      }
    case FETCH_COURSES:
      return {
        ...state,
        items: Object.assign({}, state.items, dataArrayToObject(action.payload))
      }
    default:
      return state
  }
}
