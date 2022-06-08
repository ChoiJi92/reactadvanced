import {createStore, combineReducers, applyMiddleware, compose } from "redux"
import post from "./modules/post"
import user from './modules/user'
import comment from './modules/comment'
import notice from './modules/notice'
import thunk from 'redux-thunk'




const middlewares = [thunk];
const rootReducer = combineReducers({post,user,comment,notice});


const enhancer = applyMiddleware(...middlewares)
const store = createStore(rootReducer, enhancer)

export default store;