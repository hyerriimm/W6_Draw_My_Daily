import { configureStore } from "@reduxjs/toolkit";
import comments from "../modules/commentsSlice";
import users from "../modules/users";


const store = configureStore({
    reducer:{
        comments,
        users
    }, middleware: (getDefaultMiddleware) => getDefaultMiddleware ({serializableCheck:false})
})

export default store;