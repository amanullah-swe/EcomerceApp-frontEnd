import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createCartItem, fetchCartItemsByUserId, updateCartItemById, deleteCartItemById, deleteCartAllItems } from './cartAPI';

const initialState = {
  items: [],
  error: null
};

export const createCartItemAsync = createAsyncThunk(
  'cart/createCartItem',
  async (cartItem) => {
    const response = await createCartItem(cartItem);
    return response;
  }
);
export const fetchCartItemsByUserIdAsync = createAsyncThunk(
  'cart/fetchCartItemsByUserId',
  async () => {
    const response = await fetchCartItemsByUserId();
    return response;
  }
);
export const updateCartItemByIdAsync = createAsyncThunk(
  'cart/updateCartItemById',
  async (update) => {
    const response = await updateCartItemById(update);
    return response;
  }
);
export const deleteCartItemByIdAsync = createAsyncThunk(
  'cart/deleteCartItemById',
  async (itemId) => {
    const response = await deleteCartItemById(itemId);
    return response;
  }
);

export const deleteCartAllItemsAsync = createAsyncThunk(
  'cart/deleteCartAllItems',
  async (userId) => {
    const response = await deleteCartAllItems(userId);
    const data = await response.json();
    return data;
  }
);


export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createCartItemAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createCartItemAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.items.push(action.payload);
      })
      .addCase(createCartItemAsync.rejected, (state, action) => {
        state.status = 'reject';
        state.error = action.payload;
      })


      .addCase(fetchCartItemsByUserIdAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCartItemsByUserIdAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.items = action.payload;
      })
      .addCase(updateCartItemByIdAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateCartItemByIdAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        const index = state.items.findIndex(item => item.id === action.payload.id)
        state.items[index] = action.payload;
      })
      .addCase(deleteCartItemByIdAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteCartItemByIdAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        const index = state.items.findIndex(item => item.id === action.payload)
        state.items.splice(index, 1);
      })
      .addCase(deleteCartAllItemsAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteCartAllItemsAsync.fulfilled, (state) => {
        state.status = 'idle';
        state.items = [];
      })
      .addCase(deleteCartAllItemsAsync.rejected, (state) => {
        state.status = 'idle';
        state.items = [];
      })


  },
});

export const { increment } = cartSlice.actions;

export const selectCartItems = (state) => state.cart.items;
export const selectCartItemsLength = (state) => state.cart.items.length;
export const selectCartError = (state) => state.cart.error;

export default cartSlice.reducer;
