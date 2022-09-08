import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';




export const _getUsersName = createAsyncThunk(
  "getUsersName",
  async (payload, thunkAPI) => {
    // console.log(payload)
    try {
      const data = await axios.get("http://3.36.71.186:8080/api/users");
      // console.log(data.data.data)
      return thunkAPI.fulfillWithValue(data.data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);



export const __login = createAsyncThunk(
  "data/login",
  async (payload, thunkAPI) => {
      try {
          // console.log(payload);
          const data =  await axios.post("http://3.36.71.186:8080/api/users/login", payload);
          // console.log(data);
          
          localStorage.setItem("token1", data.headers.authorization)
          localStorage.setItem("token2", data.headers.refreshtoken)
          localStorage.setItem("name",data.data.data.name)

          if(data.data.success===false)
              alert(data.data.error.message);
          return thunkAPI.fulfillWithValue(data.data);
        } catch (error) {
          return thunkAPI.rejectWithValue(error);
        }
  }
);

export const userSlice = createSlice({
  name:"user", 
  initialState:{
    user:null,
    users:[] //user has not loged in
  },
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
      axios.post("http://3.36.71.186:8080/api/users/login", action.payload)
    },
    logout(state){
      localStorage.removeItem('token1')
      localStorage.removeItem('token2')
      localStorage.removeItem('name')
    }
  },

  extraReducers: {
    [__login.pending]: (state) => {
      state.isLoading = true; // 네트워크 요청이 시작되면 로딩상태를 true로 변경합니다.
    },
    [__login.fulfilled]: (state, action) => {
      state.isLoading = false; // 네트워크 요청이 끝났으니, false로 변경합니다.
      state.data = action.payload; // Store에 있는 todos에 서버에서 가져온 todos를 넣습니다.
    },
    [__login.rejected]: (state, action) => {
      state.isLoading = false; // 에러가 발생했지만, 네트워크 요청이 끝났으니, false로 변경합니다.
      state.error = action.payload; // catch 된 error 객체를 state.error에 넣습니다.
    },

    [_getUsersName.pending]: (state) => {
      state.isLoading = true; 
    },
    [_getUsersName.fulfilled]: (state, action) => {
      state.isLoading = false; 
      state.users = action.payload; 
    },
    [_getUsersName.rejected]: (state, action) => {
      state.isLoading = false; 
      state.error = action.payload; 
    },
  },

});



export const { login, logout  } = userSlice.actions;
export default userSlice.reducer;