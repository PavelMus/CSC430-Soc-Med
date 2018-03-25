import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";
import authReducer from "./authReducer";
import userDataReducer from "./userDataReducer";
import fetchPostReducer from "./fetchPostReducer";
import submitReducer from './submitPostReducer';

export default combineReducers({
  auth: authReducer,
  user: userDataReducer,
  postlist: fetchPostReducer,
  post: submitReducer,
  routing: routerReducer
});
