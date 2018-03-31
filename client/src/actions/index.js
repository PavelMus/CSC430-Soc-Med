import axios from "axios";
import { FETCH_USER, PROFILE_DATA, FETCH_POSTS, SUBMIT_POST } from "./types";

export const fetchUser = () => async dispatch => {
  const res = await axios.get("/api/current_user");
  dispatch({ type: FETCH_USER, payload: res.data });
};

export const userData = () => async dispatch => {
  const res = await axios.get("/api/userData");
  dispatch({ type: PROFILE_DATA, payload: res.data });
};

export const fetchPosts = (url) => async dispatch => {
  const res = await axios.get(url);
  dispatch({ type: FETCH_POSTS, posts: res.data });
};

//export const submitPost = (url, post) => async dispatch => {
//  const res = await axios.post(url, post).catch(err => { console.error(err);});
//  dispatch({ type: SUBMIT_POST, post: res.data})
//};
