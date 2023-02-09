import { createSlice ,createAsyncThunk} from "@reduxjs/toolkit";
import {publicRequest} from "../requestMethod";
import axios from "axios";
import { PURGE } from "redux-persist";

export const fetchLogin = createAsyncThunk(
    'users/fetchLogin',
    async (body, thunkAPI) => {
      const response = await axios.post('http://localhost:5000/api/auth/login', body);
      return response.data;
    }
)

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
    builder.addCase(fetchLogin.pending, (state, action)=>{
        state.isFetching = true;
    }),
    builder.addCase(fetchLogin.fulfilled, (state, action)=>{
        state.isFetching = false;
        state.currentUser = action.payload;
    })
    builder.addCase(fetchLogin.rejected, (state, action)=>{
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