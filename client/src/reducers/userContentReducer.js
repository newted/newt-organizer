import {
  REQUEST_USER_CONTENT,
  RESOLVE_USER_CONTENT,
  CREATE_USER_CONTENT,
  FETCH_USER_CONTENT
} from "../actions/userContent";
import { dataArrayToObject } from "../utils/reducerHelpers";

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
    case FETCH_USER_CONTENT:
      const contentObj = dataArrayToObject(action.payload);
      return {
        ...state,
        isFetching: false,
        items: {
          ...state.items,
          ...contentObj
        }
      };
    default:
      return state;
  }
}
