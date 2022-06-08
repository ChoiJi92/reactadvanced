// user.js
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
  where
} from "firebase/firestore";
import { async } from "@firebase/util";

// action 

const LOAD = 'user/LOAD'
const CREATE = 'user/CREATE'
const RESET = 'user/RESET' 

// initialState

const initialState = {
    user_list:[],
    currentuser:''
}
//action creator

export function loadUser(currentuser){
    return {type:LOAD, currentuser}
}
export function createUser(user){
    return{type:CREATE, user} 
}
export function resetUser(){
    return {type:RESET}
}
//middlewares

export const loadUserFB = (user_id) => {
    return async function(dispatch){
        try{
        const docRef= collection(db,'users')
        const q = query(docRef, where('user_id', '==', user_id))
        let currentuser;
        const user = await getDocs(q)
        user.forEach((doc) => {
            currentuser = doc.data().name
        }
        )
        dispatch(loadUser(currentuser))
    }
    catch(err){
        
    }
    }
}

export const createUserFB = (user) => {
    return async function (dispatch) {
        const docRef = await addDoc(collection(db, "users"), user);
        const userlist = await getDoc(docRef);
        const currentuser = userlist.data().name
        // const user_data = { id: userlist.id, ...userlist.data()};
        dispatch(createUser(currentuser));
      };
}

export default function reducer (state=initialState, action={}){
    switch(action.type){
        case LOAD : {
            return{currentuser : action.currentuser}
        }
        case CREATE : {
            // const new_user_list = [...state.user_list, action.user]
            return{currentuser : action.user}
        }
        case RESET : {
            return{currentuser:''}
        }
        default :
        return state;
    }

}