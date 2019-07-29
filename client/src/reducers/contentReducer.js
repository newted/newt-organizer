import {
  REQUEST_CONTENT,
  RESOLVE_CONTENT,
  FETCH_CONTENT
} from "../actions/content";

export default function(
  state = {
    isFetching: false,
    items: {}
  },
  action
) {
  switch (action.type) {
    case REQUEST_CONTENT:
      return {
        ...state,
        isFetching: true
      };
    case RESOLVE_CONTENT:
      return {
        ...state,
        isFetching: false
      };
    case FETCH_CONTENT:
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
