export const BASE_URL = 'https://ecomerce-back-end.vercel.app';
// export const BASE_URL = 'http://localhost:8080';


export const Apiconfig = {

    // Auth
    LOGIN_API: BASE_URL + "/auth/login",
    REGISTER_API: BASE_URL + "/auth/register",
    // products 
    UPDATE_PRODUCT_PATCH_REQUEST: BASE_URL + "/products/",
    CREATE_PRODUCT: BASE_URL + "/products",
    GET_PRODUCTLIST: BASE_URL + "/products",
    GET_PRODUCT_BY_ID: BASE_URL + "/products/",

    // cart
    ADD_TO_CART: BASE_URL + "/cart"
}