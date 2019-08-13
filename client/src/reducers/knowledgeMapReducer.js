import { UPDATE_KNOWLEDGE_MAP } from "../actions/knowledgeMap";

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
export default function(state = { items: {} }, action) {
  switch (action.type) {
    case UPDATE_KNOWLEDGE_MAP:
      return {
        ...state,
        items: {
          ...state.items,
          [action.payload.knowledgeSubject.knowledgeSubjectId]: {
            ...state.items[action.payload.knowledgeSubject.knowledgeSubjectId],
            [action.payload.knowledgeModule.knowledgeModuleId]: {
              ...state.items[action.payload.knowledgeModule.knowledgeModuleId],
              ...action.payload
            }
          }
        }
      };
    default:
      return state;
  }
}
