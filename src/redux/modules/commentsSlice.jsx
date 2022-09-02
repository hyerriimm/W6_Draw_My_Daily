import { createSlice } from "@reduxjs/toolkit";
// import axios from "axios";

// export const __getComment = createAsyncThunk(
//   "GET_COMMENT",
//   async (payload, thunkAPI) => {
//     try {
//       const data = await axios.get(process.env.REACT_APP_COMMENTS_HOST);
//       return thunkAPI.fulfillWithValue(data.data);
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error);
//     }
//   }
// );

// export const __addComment = createAsyncThunk(
//   "ADD_COMMENT",
//   async (arg, thunkAPI) => {
//     try {
//       const { data } = await axios.post(process.env.REACT_APP_COMMENTS_HOST, arg);
//       return thunkAPI.fulfillWithValue(data);
//     } catch (e) {
//       return thunkAPI.rejectWithValue(e);
//     }
//   }
// );

const initialState = {  
    comments: [],
    isLoading: false,
    error: null,
};

export const commentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {
  },
  extraReducers: {
  }  
});


export const { removeComment,updataComment } = commentsSlice.actions;
export default commentsSlice.reducer;