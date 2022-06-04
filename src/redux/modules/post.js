// post.js
import { db } from "../../firebase";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  orderBy,
  limit,
  query,
  startAfter,
  where,
} from "firebase/firestore";
import { async } from "@firebase/util";

// action

const LOAD = "post/LOAD";
const MORELOAD = "post/MORELOAD";
const CREATE = "post/CREATE";
const UPDATE = "post/UPDATE";
const DELETE = "post/DELETE";
const COMMENT_COUNT = "post/COMMENT_COUNT";
const HEART_PLUS = "post/HEART_PLUS";
const HEART_MINUS = "post/HEART_MINUS";

// initialState

const initialState = {
  post_list: [],
  lastdate: 0,
};
//action creator

export function loadPost(post, lastdate) {
  return { type: LOAD, post, lastdate };
}
export function moreloadPost(post, lastdate) {
  return { type: MORELOAD, post, lastdate };
}
export function createPost(post) {
  return { type: CREATE, post };
}
export function updatePost(post) {
  return { type: UPDATE, post };
}
export function deletePost(id) {
  return { type: UPDATE, id };
}
export function countComment(post) {
  return { type: COMMENT_COUNT, post };
}
export function plusHeart(post) {
  return { type: HEART_PLUS, post };
}
export function minusHeart(post) {
  return { type: HEART_MINUS, post };
}

//middlewares

export const loadPostFB = () => {
  return async function (dispatch) {
    const q = query(collection(db, "post"), orderBy("date", "desc"), limit(3));
    const post_data = await getDocs(q);
    let post_list = [];
    let lastdate;
    post_data.forEach((doc) => {
      lastdate = doc.data().date;
      post_list.push({ id: doc.id, ...doc.data() });
    });
    dispatch(loadPost(post_list, lastdate));
  };
};
export const moreloadPostFB = (lastdate) => {
  return async function (dispatch) {
    const q = query(
      collection(db, "post"),
      orderBy("date", "desc"),
      startAfter(lastdate),
      limit(3)
    );
    const post_data = await getDocs(q);
    let post_list = [];
    let lastDate;
    post_data.forEach((doc) => {
      lastDate = doc.data().date;
      post_list.push({ id: doc.id, ...doc.data() });
    });
    dispatch(moreloadPost(post_list, lastDate));
  };
};

export const createPostFB = (post) => {
  return async function (dispatch) {
    const docRef = await addDoc(collection(db, "post"), post);
    const postlist = await getDoc(docRef);
    const post_data = { id: postlist.id, ...postlist.data() };
    dispatch(createPost(post_data));
  };
};
export const updatePostFB = (post) => {
  return async function (dispatch, getState) {
    const docRef = doc(db, "post", post.id);
    await updateDoc(docRef, post);
    const post_list = getState().post.post_list;
    const new_post = post_list.map((v) => (v.id === post.id ? (v = post) : v));
    dispatch(updatePost(new_post));
  };
};
export const deletePostFB = (id) => {
  return async function (dispatch, getState) {
    const docRef = doc(db, "post", id);
    await deleteDoc(docRef);
    const post_list = getState().post.post_list;
    const new_post = post_list.filter((v) => v.id !== id);
    dispatch(updatePost(new_post));
  };
};
export const countFB = (id) => {
  return async function (dispatch, getState) {
    const docRef = doc(db, "post", id);
    const post_list = getState().post.post_list;
    const count = post_list.filter((v) => v.id === id);
    const newcount = count[0].comment_count + 1;
    const new_post = post_list.map((v) =>
      v.id === id ? { ...v, comment_count: newcount } : v
    );
    await updateDoc(docRef, { comment_count: newcount });
    dispatch(countComment(new_post));
  };
};
export const heartPlusFB = (id, user_id) => {
  return async function (dispatch, getState) {
    const docRef = doc(db, "post", id);
    const post_list = getState().post.post_list;
    const heart_count = post_list.filter((v) => v.id === id);
    if (!heart_count[0].heart_count.includes(user_id)) {
      heart_count[0].heart_count.push(user_id);
      const new_heart = heart_count[0].heart_count;
      const new_post = post_list.map((v) =>
        v.id === id ? { ...v, heart_count: new_heart } : v
      );
      await updateDoc(docRef, { heart_count: new_heart });
      dispatch(plusHeart(new_post));
    }
  };
};
export const heartMinusFB = (id, user_id) => {
  return async function (dispatch, getState) {
    const docRef = doc(db, "post", id);
    const post_list = getState().post.post_list;
    const heart_count = post_list.filter((v) => v.id === id);
    const new_heart = heart_count[0].heart_count.filter(v => v !== user_id);
    const new_post = post_list.map((v) =>
      v.id === id ? { ...v, heart_count: new_heart } : v
    );
    await updateDoc(docRef, { heart_count: new_heart });
    dispatch(minusHeart(new_post));
  };
};
export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD: {
      return { post_list: action.post, lastdate: action.lastdate };
    }
    case MORELOAD: {
      const more_post_list = [...state.post_list, ...action.post];
      return { ...state, post_list: more_post_list, lastdate: action.lastdate };
    }
    case CREATE: {
      const new_post_list = [action.post, ...state.post_list];
      return { post_list: new_post_list };
    }
    case UPDATE: {
      return { ...state, post_list: action.post };
    }
    case DELETE: {
      return { ...state, post_list: action.post };
    }
    case COMMENT_COUNT: {
      return { ...state, post_list: action.post };
    }
    case HEART_PLUS: {
      return { ...state, post_list: action.post };
    }
    case HEART_MINUS: {
        return { ...state, post_list: action.post };
      }
    default:
      return state;
  }
}
