// comment.js
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

const LOAD = "comment/LOAD";
const CREATE = "comment/CREATE";

// initialState

const initialState = {
  comment_list: [],
};
//action creator

export function loadComment(comment) {
  return { type: LOAD, comment };
}
export function createComment(comment) {
  return { type: CREATE, comment };
}

//middlewares

export const loadCommentFB = (id) => {
  return async function (dispatch) {
    try {
      const q = query(collection(db, "comment"), where("id", "==", id));
      const comment_data = await getDocs(q);
      let comment_list = [];
      // let lastdate ;
      comment_data.forEach((doc) => {
        comment_list.push({ ...doc.data() });
      });
      dispatch(loadComment(comment_list));
    } catch (err) {
    }
  };
};

export const createCommentFB = (comment) => {
  return async function (dispatch) {
    const docRef = await addDoc(collection(db, "comment"), comment);
    const commentlist = await getDoc(docRef);
    const comment_data = { ...commentlist.data() };
    dispatch(createComment(comment_data));
  };
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD: {
      return { comment_list: action.comment };
    }
    case CREATE: {
      const new_comment_list = [action.comment, ...state.comment_list];
      return { comment_list: new_comment_list };
    }
    default:
      return state;
  }
}
