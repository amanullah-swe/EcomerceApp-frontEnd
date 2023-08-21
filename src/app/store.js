import { configureStore } from '@reduxjs/toolkit';
import productsReducer from '../features/products/productListslice';
import authReducer from '../features/auth/authSlice'
export const store = configureStore({
    reducer: {
        products: productsReducer,
        auth: authReducer
    },
});
