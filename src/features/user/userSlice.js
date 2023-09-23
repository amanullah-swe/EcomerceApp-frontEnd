import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchLoddInUser, fetchUserOrders, updateUser } from './userAPI';

const initialState = {
  userInfo: {
    name: '',
    email: '',
    role: '',
    adresses: []
  },
  status: 'idle',
  userOrders: [],
  userError: null
};

export const fetchLoddInUserAsync = createAsyncThunk(
  'user/fetchLoddInUser',
  async () => {
    const response = await fetchLoddInUser();
    return response;
  }
);
export const fetchUserOrdersAsync = createAsyncThunk(
  'user/fetchUserOrders',
  async () => {
    const response = await fetchUserOrders();

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
        state.userError = null;
      })
      .addCase(fetchLoddInUserAsync.rejected, (state, action) => {
        state.status = 'reject';
        state.userError = action.error;
      })


      .addCase(fetchUserOrdersAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUserOrdersAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.userOrders = action.payload;
        state.userError = null;
      })
      .addCase(fetchUserOrdersAsync.rejected, (state, action) => {
        state.status = 'reject';
        state.userError = action.error;
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
export const selectUserError = (state) => state.user.userError;
export default userSlice.reducer;
