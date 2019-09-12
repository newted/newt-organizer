import {
  REQUEST_USER_CONTENT,
  RESOLVE_USER_CONTENT,
  CREATE_USER_CONTENT
} from "../actions/userContent";

export default function(
  state = { isFetching: false, items: {}, error: { message: null } },
  action
) {
  switch (action.type) {
    case REQUEST_USER_CONTENT:
      return {
        ...state,
        isFetching: true
      };
    case RESOLVE_USER_CONTENT:
      return {
        ...state,
        isFetching: false
      };
    case CREATE_USER_CONTENT:
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
