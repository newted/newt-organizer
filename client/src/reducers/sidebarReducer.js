import { TOGGLE_SIDEBAR } from "../actions/sidebar";

export default function(
  state = {
    isCollapsed: false
  },
  action
) {
  switch (action.type) {
    case TOGGLE_SIDEBAR:
      return {
        ...state,
        isCollapsed: !state.isCollapsed
      };
    default:
      return state;
  }
}
