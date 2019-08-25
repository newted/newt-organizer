import {
  REQUEST_PERSONAL_QUIZ,
  RESOLVE_PERSONAL_QUIZ
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
    default:
      return state;
  }
}
