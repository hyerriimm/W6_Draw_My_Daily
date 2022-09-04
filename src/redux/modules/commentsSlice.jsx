import { createSlice,createAsyncThunk, } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  comments: [],
  isLoading: false,
  error: null,
};

export const _getComnents = createAsyncThunk(
  "getComments",
  async (payload, thunkAPI) => {
    try{
      const data = await axios.get("http://localhost:5000/comments");
      console.log(data);
      return thunkAPI.fulfillWithValue(data.data);
    } catch(error){
      console.log(error)
      return thunkAPI.rejectWithValue(error);
    }
  }
)

export const _addComnents = createAsyncThunk(
  "addComments",
  async (payload, thunkAPI) => {
    try{
      const data = await axios.post("http://localhost:5000/comments",payload);
      console.log(data)
      return thunkAPI.fulfillWithValue(data.data);
    } catch(error){
      return thunkAPI.rejectWithValue(error);
    }
  }
)


export const commentssSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {},
  extraReducers: {
    [_getComnents.pending]: (state) => {
      state.isLoading = true
    },
    [_getComnents.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.comments = action.payload
    },
    [_getComnents.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    }
    
    
    
    ,[_addComnents.pending]: (state) => {
      console.log("pending 상태", state);
      state.isLoading = true
    },
    [_addComnents.fulfilled]: (state, action) => {
      console.log("fulfilled 상태", state, action);
      state.comments.push(action.payload)
    },
    [_addComnents.rejected]: (state, action) => {
      console.log("rejected된 상태", state, action);
      state.isLoading = false;
    }
  },
  
});

export const {} = commentssSlice.actions;
export default commentssSlice.reducer;