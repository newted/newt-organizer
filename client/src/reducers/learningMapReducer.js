import {
  REQUEST_LEARNING_MAP,
  RESOLVE_LEARNING_MAP,
  GET_LEARNING_MAP
} from "../actions/learningMap";

export default function(
  state = {
    isFetching: false,
    items: {}
  },
  action
) {
  switch (action.type) {
    case REQUEST_LEARNING_MAP:
      return {
        ...state,
        isFetching: true
      };
    case RESOLVE_LEARNING_MAP:
      return {
        ...state,
        isFetching: false
      };
    case GET_LEARNING_MAP:
      return {
        ...state,
        isFetching: false,
        items: {
          ...state.items,
          [action.payload._id]: action.payload
        }
      };
    default:
      return state;
  }
}
