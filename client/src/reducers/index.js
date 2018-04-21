import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";
import authReducer from "./authReducer";
import fetchPostReducer from "./fetchPostReducer";
import submitReducer from './submitPostReducer';
import teachersReducer from './fetchTeacherReducer';
import fetchAnnouncementsReducer from './fetchAnnReducer';

export default combineReducers({
  user: authReducer,
  teachers: teachersReducer,
  announcements: fetchAnnouncementsReducer,
  postlist: fetchPostReducer,
  post: submitReducer,
  routing: routerReducer
});
