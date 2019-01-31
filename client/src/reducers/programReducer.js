import {
  CREATE_PROGRAM,
  FETCH_PROGRAMS,
  UPDATE_PROGRAM,
  DELETE_PROGRAM
} from '../actions/programs'
import {
  programsArrayToObject,
  deleteItemFromObject
} from '../utils/reducerHelpers'

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
          ...state.items,
          [action.payload._id]: action.payload
        }
      }
    case FETCH_PROGRAMS:
      return {
        ...state,
        items: programsArrayToObject(action.payload)
      }
    case UPDATE_PROGRAM:
      return {
        ...state,
        items: {
          ...state.items,
          [action.payload._id]: action.payload
        }
      }
    case DELETE_PROGRAM:
      return {
        ...state,
        items: deleteItemFromObject(state.items, action.payload)
      }
    default:
      return state
  }
}
