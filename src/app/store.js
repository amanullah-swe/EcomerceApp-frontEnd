import { configureStore } from '@reduxjs/toolkit';
import productsReducer from '../features/products/productListslice';
import authReducer from '../features/auth/authSlice'
import cartReducer from '../features/cart/cartSlice';
import orderReducer from '../features/order/orderSlice'
import userReducer from '../features/user/userSlice';
import adminReducer from '../features/admin/adminSlice'
export const store = configureStore({
    reducer: {
        products: productsReducer,
        auth: authReducer,
        cart: cartReducer,
        order: orderReducer,
        user: userReducer,
        admin: adminReducer

    },
});
