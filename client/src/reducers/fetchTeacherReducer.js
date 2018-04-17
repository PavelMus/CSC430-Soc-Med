import { FETCH_TEACHERS } from "../actions/types";
export default function(state = { list: [] }, action) {
  switch (action.type) {
    case FETCH_TEACHERS:
      return Object.assign({}, state, {
        list: action.teachers
      });
    default:
      return state;
  }
}