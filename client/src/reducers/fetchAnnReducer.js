import { FETCH_ANNOUNCEMENTS } from "../actions/types";
export default function(state = { data: [] }, action) {
  switch (action.type) {
    case FETCH_ANNOUNCEMENTS:
      return Object.assign({}, state, {
        data: action.announcements
      });
    default:
      return state;
  }
}