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
    try {
      const data = await axios.get("http://localhost:5000/comments");
      // console.log(data);
      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      // console.log(error)
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const _addComnents = createAsyncThunk(
  "addComments",
  async (payload, thunkAPI) => {
    try {
      const data = await axios.post("http://localhost:5000/comments", payload);
      // console.log(data)
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
      const data = await axios.delete(
        `http://localhost:5000/comments/${payload}`
      );
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
      // console.log(state, action.payload)
      state.comments.push(action.payload, 1);
    },
    [_addComnents.rejected]: (state, action) => {
      state.isLoading = false;
    },
  },
});

export const {} = commentssSlice.actions;
export default commentssSlice.reducer;
