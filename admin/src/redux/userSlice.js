import { createSlice ,createAsyncThunk} from "@reduxjs/toolkit";
import {publicRequest, userRequest} from "../requestMethods";
import axios from "axios";
import { PURGE } from "redux-persist";

export const fetchAsyncLogin = createAsyncThunk(
    'users/fetchLogin',
    async (body, thunkAPI) => {
      const response = await axios.post('http://localhost:5000/api/auth/login', body);
      return response.data;
    }
);

// chỉ nên update chính bản thân vì dữ liệu trả về sẽ gắn vào currentUser
export const fetchAsyncUpdate = createAsyncThunk(
  'users/fetchUpdate',
  async ({ id, body}, thunkAPI) => {
    const response = await axios.put(`http://localhost:5000/api/users/${id}` , body);
    return response.data;
  }
);


const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: null,
    isFetching: false,
    error: false,
  },
  reducers: {
    loginStart: (state) => {
      state.isFetching = true;
    },
    loginSuccess: (state, action) => {
      state.isFetching = false;
      state.currentUser = action.payload;
    },
    loginFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    logOut : (state)=>{
      state.currentUser = null;
    }
  },
  extraReducers : (builder)=>{
    builder.addCase(fetchAsyncLogin.pending, (state, action)=>{
        state.isFetching = true;
        state.error = false;
    }),
    builder.addCase(fetchAsyncLogin.fulfilled, (state, action)=>{
        state.isFetching = false;
        state.currentUser = action.payload;
    })
    builder.addCase(fetchAsyncLogin.rejected, (state, action)=>{
        state.isFetching = false;
        state.error = true;
    })
    // update
    builder.addCase(fetchAsyncUpdate.pending, (state, action)=>{
      state.isFetching = true;
      state.error = false;
    })
    builder.addCase(fetchAsyncUpdate.fulfilled, (state, action)=>{
      state.isFetching = false;
      state.currentUser = action.payload;
    })
    builder.addCase(fetchAsyncUpdate.rejected, (state, action)=>{
      state.isFetching = false;
      state.error = true;
    })
      
      builder.addCase(PURGE, (state) => {
          customEntityAdapter.removeAll(state);
      });
    }
});

// dùng extraReducer để thay cho reducer;

export const { loginStart, loginSuccess, loginFailure, logOut } = userSlice.actions;
export default userSlice.reducer;