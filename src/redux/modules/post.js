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

const LOAD = 'post/LOAD'
const CREATE= 'post/CREATE'
const UPDATE = 'post/UPDATE'
const DELETE = 'post/DELETE'

// initialState

const initialState = {
    post_list:[]
}
//action creator

export function loadPost(post){
    return {type:LOAD, post}
}
export function createPost(post){
    return {type:CREATE, post}
}
export function updatePost(post){
    return {type:UPDATE, post}
}
export function deletePost(id){
    return {type:UPDATE, id}
}
//middlewares

export const loadPostFB = () => {
    return async function(dispatch){
    const q = query(collection(db, "post"),orderBy("date", "desc"));
    const post_data = await getDocs(q);
    let post_list = [];
    // let lastdate ;
    post_data.forEach((doc) => {
    //   lastdate = doc.data().date;
      post_list.push({ id: doc.id, ...doc.data() });
    });
    dispatch(loadPost(post_list));
  }
    }

export const createPostFB = (post) => {
    return async function(dispatch){
        const docRef = await addDoc(collection(db, 'post'), post)
        const postlist = await getDoc(docRef)
        const post_data = { id: postlist.id, ...postlist.data()};
        dispatch(createPost(post_data));
        
    }
}
export const updatePostFB = (post) => {
    return async function(dispatch,getState){
        const docRef = doc(db,'post',post.id)
        await updateDoc(docRef, post);
        const post_list = getState().post.post_list;
        const new_post = post_list.map((v) => (v.id === post.id ? (v = post) : v));
        dispatch(updatePost(new_post));
    }
}
export const deletePostFB = (id) => {
    return async function(dispatch,getState){
        const docRef = doc(db,'post',id)
        await deleteDoc(docRef);
        const post_list = getState().post.post_list;
        const new_post = post_list.filter((v) => (v.id !== id ));
        dispatch(updatePost(new_post));
    }
}

export default function reducer (state=initialState, action={}){
    switch(action.type){
        case LOAD : {
            return{post_list: action.post}
        }
        case CREATE : {
            const new_post_list = [action.post , ...state.post_list]
            return{post_list : new_post_list}
        }
        case UPDATE : {
            return{...state ,post_list : action.post}
        }
        case DELETE : {
            return{...state ,post_list : action.post}
        }
        default :
        return state;
    }

}