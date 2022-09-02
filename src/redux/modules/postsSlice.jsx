import { createSlice } from "@reduxjs/toolkit";
// import axios from "axios";

// export const __getPosts = createAsyncThunk(
//   "GET_POSTS",
//   async (payload, thunkAPI) => {
//     try {
//       const data = await axios.get(process.env.REACT_APP_CARDS_HOST);
//       return thunkAPI.fulfillWithValue(data.data);
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.code);
//     }
//   }
// );

// // createAsyncThunk 생성하기
// export const __deletePosts = createAsyncThunk(
//   // action 이름
//   "DELETE_POSTS",
//   // 처리할 비동기 함수
//   async (payload) => {
//     // 서버에서 데이터를 삭제
//     const res = await axios.delete(process.env.REACT_APP_CARDS_HOST + `/${payload}`);
//     // action의 payload 리턴
//     return res.data;
//   }
// );


const initialState = {
  posts: [],
  error: null,
  isLoading: false,
}

export const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    addCard: (state, action) => {
    //   state.cards.push(action.payload);
    //   axios.post(process.env.REACT_APP_CARDS_HOST, action.payload);
    },

    updataCard: (state, action) => {

    //   axios.patch(process.env.REACT_APP_CARDS_HOST + `/${action.payload.id}`, action.payload)
    }

  },
  extraReducers: {
    
  }
})


export const { addCard, updataCard} = postsSlice.actions;
export default postsSlice.reducer;