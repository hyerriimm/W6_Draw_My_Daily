import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const token = localStorage.getItem('token1');
const refreshToken = localStorage.getItem('token2');

export const __getPosts = createAsyncThunk(
  "posts/getPosts",
  async (payload, thunkAPI) => {
    try {
      const data = await axios.get("http://3.36.71.186:8080/api/posts"); 
      // console.log(data.data);
      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.code);
    }
  }
);

export const __createPosts = createAsyncThunk(
  "posts/createPosts",
  async (payload, thunkAPI) => {
    try {
      const data = await axios.post("http://3.36.71.186:8080/api/auth/posts", payload, {
        headers: {
        "Content-Type":"multipart/form-data",
        "Authorization":token,
        "RefreshToken":refreshToken,
        }
      }
    );
    alert("그림일기 추가 완료!");
      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.code);
    }
  }
);

export const __deletePosts = createAsyncThunk(
  "posts/deletePosts",
  async (payload, thunkAPI) => {
    try {
      const data = await axios.delete(`http://3.36.71.186:8080/api/auth/posts/${payload}`, {
        headers: {
          "Authorization":token,
          "RefreshToken":refreshToken,
          }
      });
      // console.log(data);
      // console.log(data.data);
      // 삭제한 게시글 아이디를 응답에 넣어달라고 해서 받아옴!
      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.code);
    }
  }
);

export const __updatePosts = createAsyncThunk(
  "posts/updatePosts",
  async (payload, thunkAPI) => {
    try {
      const data = await axios.put(`http://3.36.71.186:8080/api/auth/posts/${payload.id}`, payload.formData, { 
      headers: {
      "Content-Type":"multipart/form-data",
      "Authorization":token,
      "RefreshToken":refreshToken,
      }});
      // console.log(data);
      alert("그림일기 수정 완료!")
      return thunkAPI.fulfillWithValue(data.data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.code);
    }
  }
);


export const postsSlice = createSlice({
  name: 'posts',
  initialState: {
    posts: [],
    detail:{
      // user_name도 달라고 하긴 해야함
      id: 0,
      date:'',
      title:'',
      imageURL:'',
      sayMe:'',
      content:'',
      createdAt:'',
      comments: [],
    },
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(__getPosts.pending, (state) => {
      state.isLoading = true; // 네트워크 요청이 시작되면 로딩상태를 true로 변경합니다.
    })
    .addCase(__getPosts.fulfilled, (state, action) => {
      state.isLoading = false; // 네트워크 요청이 끝났으니, false로 변경합니다.
      state.posts = action.payload.data; // Store에 있는 todos에 서버에서 가져온 todos를 넣습니다.
      // console.log(action.payload.data);
    })
    .addCase(__getPosts.rejected, (state, action) => {
      state.isLoading = false; // 에러가 발생했지만, 네트워크 요청이 끝났으니, false로 변경합니다.
      state.error = action.payload; // catch 된 error 객체를 state.error에 넣습니다.
    });

    builder
    .addCase(__createPosts.pending, (state) => {
      state.isLoading = true; 
    })
    .addCase(__createPosts.fulfilled, (state, action) => {
      state.isLoading = false; 
      state.posts.push(action.payload);
    })
    .addCase(__createPosts.rejected, (state, action) => {
      state.isLoading = false; 
      state.error = action.payload; 
    });

    builder
    .addCase(__deletePosts.pending, (state) => {
      state.isLoading = true; 
    })
    .addCase(__deletePosts.fulfilled, (state, action) => {
      state.isLoading = false; 
      let index = state.posts.findIndex((post) => post.id === action.payload);
      state.posts.splice(index, 1);
    })
    .addCase(__deletePosts.rejected, (state, action) => {
      state.isLoading = false; 
      state.error = action.payload; 
    });

    builder
    .addCase(__updatePosts.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(__updatePosts.fulfilled, (state, action) => {
      state.isLoading = false; 
      let index = state.posts.findIndex((post) => post.id === action.payload.id);
      state.posts.splice(index, 1, action.payload);
      // state.detail.push(action.payload);
    })
    .addCase(__updatePosts.rejected, (state, action) => {
      state.isLoading = false; 
      state.error = action.payload; 
    });

  },
});

// export const { createPost, deletePost, updatePost} = postsSlice.actions;
export default postsSlice.reducer;

// reducers: {
//   createPost(state, action) {
//     state.posts.push(action.payload);
//     axios.post("http://localhost:3001/posts",action.payload);
//   },

//   deletePost(state, action) {
//     let index = state.posts.findIndex((post) => post.id === action.payload);
//     state.posts.splice(index, 1);
//     axios.delete(`http://localhost:3001/posts/${action.payload}`);
//   },

//   updatePost(state, action) {
//     let index = state.posts.findIndex(
//       (post) => post.id === action.payload.id
//     );
//     state.posts.splice(index, 1, action.payload);
//     axios.patch(`http://localhost:3001/posts/${action.payload.id}`,action.payload);
//   },
// },

// export const __createPostImage = createAsyncThunk(
//   "posts/createPostImage",
//   async (payload, thunkAPI) => {
//     try {
//       const data = await axios.post("http://3.36.71.186:8080/api/auth/upload", payload,{  // 게시글 이미지 보내기
//       headers:{
//       "Content-Type":"multipart/form-data",
//       "Authorization":token,
//       "RefreshToken":refreshToken,
//       }});
//       alert("그림일기 추가 완료!");
//       return thunkAPI.fulfillWithValue(data.data);
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.code);
//     }
//   }
// );

// export const __updatePostImage = createAsyncThunk(
//   "posts/updatePosts",
//   async (payload, thunkAPI) => {
//     try {
//       const data = await axios.put(`http://3.36.71.186:8080/api/auth/posts/${payload}`, payload,
//       {
//         headers:{
//         "Content-Type":"multipart/form-data",
//         "Authorization":token,
//         "RefreshToken":refreshToken,
//       }
//       });
//       alert("그림일기 수정 완료!")
//       return thunkAPI.fulfillWithValue(data.data);
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.code);
//     }
//   }
// );

// builder
// .addCase(__createPostImage.pending, (state) => {
//   state.isLoading = true; 
// })
// .addCase(__createPostImage.fulfilled, (state, action) => {
//   state.isLoading = false; 
//   // state.posts.push(action.payload);
// })
// .addCase(__createPostImage.rejected, (state, action) => {
//   state.isLoading = false; 
//   state.error = action.payload; 
// });