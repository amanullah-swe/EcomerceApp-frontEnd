import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchLoddInUser, fetchUserOrders, updateUser } from './userAPI';

const initialState = {
  userInfo: null,
  status: 'idle',
  userOrders: []
};

export const fetchLoddInUserAsync = createAsyncThunk(
  'user/fetchLoddInUser',
  async (amount) => {
    const response = await fetchLoddInUser(amount);

    return response;
  }
);
export const fetchUserOrdersAsync = createAsyncThunk(
  'user/fetchUserOrders',
  async (userId) => {
    const response = await fetchUserOrders(userId);

    return response;
  }
);
export const updateUserAsync = createAsyncThunk(
  'user/updateUser',
  async (update) => {
    const response = await updateUser(update);

    return response;
  }
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLoddInUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchLoddInUserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.userInfo = action.payload;
      })
      .addCase(fetchUserOrdersAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUserOrdersAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.userOrders = action.payload;
      })
      .addCase(updateUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateUserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.userInfo = action.payload;
      });
  },
});

export const { increment, } = userSlice.actions;

export const selectUserInfo = (state) => state.user.userInfo;
export const selectUserOrders = (state) => state.user.userOrders;


export default userSlice.reducer;
