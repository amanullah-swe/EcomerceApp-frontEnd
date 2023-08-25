import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { checkUser, createUser, updateUser } from './autAPI';

const initialState = {
  isLoggedInUser: null,
  error: null,
  status: 'idle',
};

export const createUserAsync = createAsyncThunk(
  'user/createUser',
  async (userData) => {
    const response = await createUser(userData);
    return response;
  }
);
export const checkUserAsync = createAsyncThunk(
  'user/checkUser',
  async (loginInfo) => {
    const response = await checkUser(loginInfo);
    return response;
  }
);
export const updateUserAsync = createAsyncThunk(
  'cart/updateUser',
  async (update) => {
    const response = await updateUser(update);
    return response;
  }
);

export const counterSlice = createSlice({
  name: 'auth',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    setIsLoggedInUserNull: (state) => {
      state.isLoggedInUser = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createUserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.user = action.payload;
      })
      .addCase(checkUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(checkUserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.isLoggedInUser = action.payload;
      })
      .addCase(checkUserAsync.rejected, (state, action) => {
        state.status = 'idle';
        state.error = action.error;
      })
      .addCase(updateUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateUserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.isLoggedInUser = action.payload;
      })
  },
});

export const { increment, setIsLoggedInUserNull } = counterSlice.actions;

export const selectisLoggedInUser = (state) => state.auth.isLoggedInUser;
export const selectError = (state) => state.auth.error;

export default counterSlice.reducer;
