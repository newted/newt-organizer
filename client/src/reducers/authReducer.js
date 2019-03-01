import {
  REQUEST_SIGN_IN_USER,
  SET_AUTHED_USER,
  REMOVE_AUTHED_USER
} from "../actions/authedUser";

export default function(
  state = {
    isFetching: true,
    exists: false,
    item: {}
  },
  action
) {
  switch (action.type) {
    case REQUEST_SIGN_IN_USER:
      return {
        ...state,
        isFetching: true
      };
    case SET_AUTHED_USER:
      return {
        ...state,
        isFetching: false,
        exists: true,
        item: action.payload
      };
    case REMOVE_AUTHED_USER:
      return {
        ...state,
        isFetching: false,
        exists: false,
        item: {}
      };
    default:
      return state;
  }
}
