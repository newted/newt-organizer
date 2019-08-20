import {
  REQUEST_KNOWLEDGE_MAP,
  RESOLVE_KNOWLEDGE_MAP,
  GET_KNOWLEDGE_MAPS,
  UPDATE_KNOWLEDGE_MAP
} from "../actions/knowledgeMap";

// The tree structure is ordered like this:
// Knowledge Subject
//  |_ Knowledge Module
//      |_ [Info]
//
// Example:
// Computer Science
//  |_ History of Computer Science
//      |_ Content history, topics, etc.
//  |_ [Some other Computer Science module]
export default function(state = { isFetching: false, items: {} }, action) {
  switch (action.type) {
    case REQUEST_KNOWLEDGE_MAP:
      return {
        ...state,
        isFetching: true
      };
    case RESOLVE_KNOWLEDGE_MAP:
      return {
        ...state,
        isFetching: false
      };
    case GET_KNOWLEDGE_MAPS:
    case UPDATE_KNOWLEDGE_MAP:
      return {
        ...state,
        isFetching: false,
        items: {
          ...state.items,
          ...action.payload
        }
      };
    default:
      return state;
  }
}
