import { PROFILE_DATA } from "../actions/types";
export default function(state = {displayName: "", avatar: ""}, action) {
  switch (action.type) {
    case PROFILE_DATA:
      return Object.assign({},state, {
        displayName: action.payload.displayName,
        avatar: action.payload.avatar
      });
    default:
      return state;
  }
}
