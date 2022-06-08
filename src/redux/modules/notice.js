//notice.js

import { async } from "@firebase/util";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../firebase";

//action

const LOAD = "notice/LOAD";
const CREATE = "notice/CREATE";
const CHECK = "notice/CHECK";
const DELETE = "notice/DELETE";
//initialState
const initialState = {
  notice_list: [],
};
//action creator
export function loadNotice(notice) {
  return { type: LOAD, notice };
}
export function createNotice(data) {
  return { type: CREATE, data };
}
export function checkNotice(check) {
  return { type: CHECK, check };
}
export function deleteNotice(notice) {
  return { type: DELETE, notice };
}
//midllewares
export const loadNoticeFB = (user_id) => {
  return async function (dispatch) {
    try {
      const q = query(
        collection(db, "notice"),
        where("user_id", "==", user_id)
      );
      const notice_data = await getDocs(q);
      let notice_list = [];
      notice_data.forEach((doc) => {
        notice_list.push({noticeId:doc.id, ...doc.data() });
      });
      dispatch(loadNotice(notice_list));
    } catch (err) {}
  };
};
export const createNoticeFB = (data) => {
  return async function (dispatch) {
    const docRef = await addDoc(collection(db, "notice"), data);
    const noticelist = await getDoc(docRef);
    const notice_data = {noticeId:noticelist.id, ...noticelist.data() };
    dispatch(createNotice(notice_data));
  };
};
export const deleteNoticeFB = (id) => {
  return async function (dispatch, getState) {
      console.log(id)
    const docRef = doc(db, "notice", id);
    await deleteDoc(docRef);
    const notice_list = getState().notice.notice_list;
    const new_notice = notice_list.filter((v) => v.noticeId !== id);
    dispatch(deleteNotice(new_notice));
  };
};
//reducer

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD: {
      return { notice_list: action.notice };
    }
    case CREATE: {
      const new_notice = [action.notice, ...state];
      return { notice_list: new_notice };
    }
    case DELETE:{
        return{...state,notice_list:action.notice}
    }

    default:
      return state;
  }
}
