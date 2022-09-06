import { configureStore } from "@reduxjs/toolkit";
import posts from "../modules/postsSlice";
import comments from "../modules/commentsSlice";
import users from "../modules/users";


const store = configureStore({
    reducer:{
        posts,
        comments,
        users
    }, middleware: (getDefaultMiddleware) => getDefaultMiddleware ({serializableCheck:false})
})

export default store;