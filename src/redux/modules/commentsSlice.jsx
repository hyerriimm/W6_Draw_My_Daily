import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


const initialState = {
  comments: [],
  isLoading: false,
  error: null,
};

export const _getComnents = createAsyncThunk(
  "getComments",
  async (payload, thunkAPI) => {
    const token1 = localStorage.getItem("token1");
    const token2 = localStorage.getItem("token2")
    // console.log(payload)
    try {
      const data = await axios.get(`http://3.36.71.186:8080/api/comments/${payload}`, {
        headers:{
          Authorization: token1,
          Refreshtoken: token2
        }
      });
      // console.log(data);
      return thunkAPI.fulfillWithValue(data.data.data);
    } catch (error) {
      // console.log(error)
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const _addComnents = createAsyncThunk(
  "addComments",
  async (payload, thunkAPI) => {
    const token1 = localStorage.getItem("token1");
    const token2 = localStorage.getItem("token2")
    try {
      const data = await axios.post("http://3.36.71.186:8080/api/auth/comments", payload, {
        headers:{
          Authorization: token1,
          Refreshtoken: token2
        }
      });
      console.log(payload)
      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const _deleteComnents = createAsyncThunk(
  "deleteComments",
  async (payload, thunkAPI) => {
    try {
      const token1 = localStorage.getItem("token1");
      const token2 = localStorage.getItem("token2")
      const data = await axios.delete(
        `http://3.36.71.186:8080/api/auth/comments/${payload}`,{
          headers:{
            Authorization: token1,
            Refreshtoken: token2
          }
        });
      // console.log(data);
      // console.log(payload);

      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const commentssSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {},
  extraReducers: {
    [_getComnents.pending]: (state) => {
      state.isLoading = true;
    },
    [_getComnents.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.comments = action.payload;
    },
    [_getComnents.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    [_deleteComnents.pending]: (state) => {
      state.isLoading = true;
    },
    [_deleteComnents.fulfilled]: (state, action) => {
      // state.comments.filter((c)=> c.id !== action.meta.arg)
      const idx = state.comments.findIndex(function(data){return data.id === action.meta.arg})
      state.comments.splice(idx,1)
    },
    [_deleteComnents.rejected]: (state, action) => {
      state.isLoading = false;
    },

    [_addComnents.pending]: (state) => {
      state.isLoading = true;
    },
    [_addComnents.fulfilled]: (state, action) => {
      // console.log(state, action.payload.data)
      state.comments.push(action.payload.data);
      state.isLoading=false
    },
    [_addComnents.rejected]: (state, action) => {
      state.isLoading = false;
    },
  },
});

export const {} = commentssSlice.actions;
export default commentssSlice.reducer;