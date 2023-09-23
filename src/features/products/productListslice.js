import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchAllBrands, fetchAllCategories, fetchProductById, fetchAllProducts, fetchProductsByFilter, createProduct, updateProductById } from './projuctListApi';

const initialState = {
  products: [],
  status: 'idle',
  totalItems: [],
  brands: [],
  categories: [],
  selectedProduct: null,
};

export const fetchALLProductsAsync = createAsyncThunk(
  'product/fetchProducts',
  async () => {
    const response = await fetchAllProducts();
    return response;
  }
);
export const fetchProductsByFilterAsync = createAsyncThunk(
  'product/fetchProductsByFilter',
  async ({ filter, sort, pagination }) => {
    const response = await fetchProductsByFilter({ filter, sort, pagination });
    return response;
  }
);
export const fetchAllBrandsAsync = createAsyncThunk(
  'product/fetchAllBrands',
  async () => {
    const response = await fetchAllBrands();
    return response;
  }
);
export const fetchAllCategotiesAsync = createAsyncThunk(
  'product/fetchAllCategoties',
  async () => {
    const response = await fetchAllCategories();
    return response;
  }
);
export const fetchProductByIdAsync = createAsyncThunk(
  'product/fetchProductById',
  async (id) => {
    const response = await fetchProductById(id);
    return response;
  }
);

export const createProductAsync = createAsyncThunk(
  'product/createProduct',
  async (product) => {
    const response = await createProduct(product);
    return response;
  }
);

export const updateProductByIdAsync = createAsyncThunk(
  'product/updatepProductById',
  async (update) => {
    const response = await updateProductById(update);
    return response;
  }
);
export const productsSlice = createSlice({
  name: 'product',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    updateBrands: (state, action) => {
      let name;
      if (action.payload.name === "brand") name = "brands";
      else name = "categories";
      state[name][action.payload.index] = {
        ...action.payload.option
      }
    }
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchALLProductsAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchALLProductsAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.products = action.payload;
      })
      .addCase(fetchProductsByFilterAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProductsByFilterAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.products = action.payload.products;
        state.totalItems = action.payload.totalItems;
      })
      .addCase(fetchAllBrandsAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllBrandsAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.brands = action.payload;
      })
      .addCase(fetchAllCategotiesAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllCategotiesAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.categories = action.payload;
      })
      .addCase(fetchProductByIdAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProductByIdAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.selectedProduct = action.payload;
      })
      .addCase(createProductAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createProductAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.products.push(action.payload);
      })
      .addCase(updateProductByIdAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateProductByIdAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        const index = state.products.findIndex(product => product.id === action.payload.id)
        state.items[index] = action.payload;
      });
  },
});

export const { increment, updateBrands } = productsSlice.actions;
export const selectAllProducts = (state) => state.product.products;
export const selectSelectedProduct = (state) => state.product.selectedProduct;
export const selectAllBrands = (state) => state.product.brands;
export const selectAllCategories = (state) => state.product.categories;
export const selectTotalItems = (state) => state.product.totalItems;
export const selectProductsStatus = (state) => state.product.status;
export default productsSlice.reducer;
