import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";
import authReducer from "./authReducer";
import authLocal from './loaclAuthReducer'
import userDataReducer from "./userDataReducer";
import fetchPostReducer from "./fetchPostReducer";
import submitReducer from './submitPostReducer';

export default combineReducers({
  user: authReducer,
  postlist: fetchPostReducer,
  post: submitReducer,
  routing: routerReducer
});
