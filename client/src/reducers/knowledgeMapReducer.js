import {
  REQUEST_KNOWLEDGE_SUBJECT,
  RESOLVE_KNOWLEDGE_SUBJECT,
  FETCH_KNOWLEDGE_SUBJECT
} from "../actions/knowledgeMap";

export default function(
  state = {
    isFetching: false,
    items: {}
  },
  action
) {
  switch (action.type) {
    case REQUEST_KNOWLEDGE_SUBJECT:
      return {
        ...state,
        isFetching: true
      };
    case RESOLVE_KNOWLEDGE_SUBJECT:
      return {
        ...state,
        isFetching: false
      };
    case FETCH_KNOWLEDGE_SUBJECT:
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
