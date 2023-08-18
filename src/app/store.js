import { configureStore } from '@reduxjs/toolkit';
import productsReducer from '../features/products/productListslice';

export const store = configureStore({
    reducer: {
        products: productsReducer,
    },
});
