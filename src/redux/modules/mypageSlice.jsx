import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const __getMyPosts = createAsyncThunk(
  "posts/getMyPosts",
  async (payload, thunkAPI) => {
    try {
      const token1 = localStorage.getItem("token1");
      const token2 = localStorage.getItem("token2")
      const data = await axios.get(`http://3.36.71.186:8080/api/auth/mypage`,{
        headers:{
          Authorization: token1,
          Refreshtoken: token2
        }
      });
      // console.log(data.data);
      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.code);
    }
  }
);


export const postsSlice = createSlice({
  name: 'Myposts',
  initialState: {
    posts: [],
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(__getMyPosts.pending, (state) => {
      state.isLoading = true; // 네트워크 요청이 시작되면 로딩상태를 true로 변경합니다.
    })
    .addCase(__getMyPosts.fulfilled, (state, action) => {
      state.isLoading = false; // 네트워크 요청이 끝났으니, false로 변경합니다.
      state.posts = action.payload.data; // Store에 있는 todos에 서버에서 가져온 todos를 넣습니다.
      console.log(action.payload.data);
    })
    .addCase(__getMyPosts.rejected, (state, action) => {
      state.isLoading = false; // 에러가 발생했지만, 네트워크 요청이 끝났으니, false로 변경합니다.
      state.error = action.payload; // catch 된 error 객체를 state.error에 넣습니다.
    });

  },
});