import {
  REQUEST_USER_CONTENT,
  RESOLVE_USER_CONTENT,
  CREATE_USER_CONTENT,
  FETCH_USER_CONTENT,
  UPDATE_USER_CONTENT,
  DELETE_USER_CONTENT
} from "../actions/userContent";
import { GET_DEMO_USER_CONTENT } from "../actions/demo";
import {
  dataArrayToObject,
  deleteItemFromObject
} from "../utils/reducerHelpers";

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
    case UPDATE_USER_CONTENT:
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
    case DELETE_USER_CONTENT:
      return {
        ...state,
        isFetching: false,
        items: deleteItemFromObject(state.items, action.payload)
      };
    case GET_DEMO_USER_CONTENT:
      return {
        ...state,
        isFetching: false,
        items: action.payload
      };
    default:
      return state;
  }
}
