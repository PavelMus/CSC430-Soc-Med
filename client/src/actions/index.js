import axios from "axios";
import { FETCH_USER, PROFILE_DATA, FETCH_POSTS } from "./types";

export const fetchUser = () => async dispatch => {
  const res = await axios.get("/api/current_user");
  dispatch({ type: FETCH_USER, payload: res.data });
};

export const userData = () => async dispatch => {
  const res = await axios.get("/api/userData");
  dispatch({ type: PROFILE_DATA, payload: res.data });
};

export const fetchPosts = () => async dispatch => {
  const res = await axios.get("");
  dispatch({ type: FETCH_POSTS, posts: res.data });
};
