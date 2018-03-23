import { FETCH_USER, PROFILE_DATA } from "../actions/types";
export default function(state = null, action) {
  switch (action.type) {
    case PROFILE_DATA:
      return Object.assign({},state, {
        displayName: action.payload.displayName
      });
    default:
      return state;
  }
}
