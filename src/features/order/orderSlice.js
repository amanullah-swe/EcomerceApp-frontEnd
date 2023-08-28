import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createOrder, fetchALLOrders, updateOrder, fetchOrdersByFilter } from './orderAPI';


const initialState = {
  orders: [],
  status: 'idle',
  currentOrder: null,
  AllOrders: [],
  totalOrders: 0
};

export const createOrderAsync = createAsyncThunk(
  'order/createOrder',
  async (order) => {
    const response = await createOrder(order);

    return response;
  }
);

export const fetchALLOrdersAsync = createAsyncThunk(
  'order/fetchALLOrders',
  async () => {
    const response = await fetchALLOrders();
    return response;
  }
);
export const updateOrderAsync = createAsyncThunk(
  'order/updateOrder',
  async (update) => {
    const response = await updateOrder(update);
    return response;
  }
);
export const fetchOrdersByFilterAsync = createAsyncThunk(
  'order/fetchOrdersByFilter',
  async ({ sort, pagination }) => {
    const response = await fetchOrdersByFilter({ sort, pagination });
    return response;
  }
);

export const orderSlice = createSlice({
  name: 'counter',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    setCurrentOrderNull: (state) => {
      state.currentOrder = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrderAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createOrderAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.orders.push(action.payload);
        state.currentOrder = action.payload;
      })
      .addCase(fetchALLOrdersAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchALLOrdersAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.AllOrders = action.payload;
      })
      .addCase(updateOrderAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateOrderAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        const index = state.AllOrders.findIndex(order => order.id === action.payload.id)
        state.AllOrders[index] = action.payload;
      })
      .addCase(fetchOrdersByFilterAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchOrdersByFilterAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.AllOrders = action.payload.orders;
        state.totalOrders = action.payload.totalOrders
      });
  },
});

export const { increment, setCurrentOrderNull } = orderSlice.actions;

export const selectOrders = (state) => state.order.orders;
export const selectCurrentOrder = (state) => state.order.currentOrder;
export const selectAllOrdersByAdmin = (state) => state.order.AllOrders;
export const selectTotalOrders = (state) => state.order.totalOrders;


export default orderSlice.reducer;
