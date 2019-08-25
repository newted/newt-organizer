import {
  REQUEST_PERSONAL_QUIZ,
  RESOLVE_PERSONAL_QUIZ,
  FETCH_PERSONAL_QUIZ,
  CREATE_PERSONAL_QUIZ
} from "../actions/quizzes";

export default function(
  state = {
    isFetching: false,
    items: {}
  },
  action
) {
  switch (action.type) {
    case REQUEST_PERSONAL_QUIZ:
      return {
        ...state,
        isFetching: true
      };
    case RESOLVE_PERSONAL_QUIZ:
      return {
        ...state,
        isFetching: false
      };
    case FETCH_PERSONAL_QUIZ:
    case CREATE_PERSONAL_QUIZ:
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
