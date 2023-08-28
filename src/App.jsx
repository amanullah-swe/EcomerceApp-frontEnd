
import './App.css'
import Home from './pages/Home'
import LoginPage from './pages/LoginPage';
import ProductDetailPage from './pages/ProductDetialPage'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import Register from './features/auth/components/Register';
import CheckoutPage from './pages/CheckoutPage';
import { useDispatch, useSelector } from 'react-redux';
import { selectisLoggedInUser } from './features/auth/authSlice';
import { useEffect, useState } from 'react';
import { fetchCartItemsByUserIdAsync } from './features/cart/cartSlice';
import ErrorPage from './pages/404';
import OrderSuccesPage from './pages/OrderSuccesPage';
import MyOrdersPage from './pages/MyOrdersPage';
import MyProfilePage from './pages/MyProfilePage';
import { fetchLoddInUserAsync } from './features/user/userSlice';
import Logout from './features/auth/components/Logout';
import Protected from './features/auth/components/Protected';
import ProtectedAdmin from './features/auth/components/ProtectedAdmin.jsx'
import AdminProductListPage from './pages/AdminProductListPage';
import AdminProductDetailPage from './pages/AdminProductDetialPage';
import ProductFormPage from './pages/ProductFormPage';
import AdminOrders from './features/admin/components/AdminOrders';
const router = createBrowserRouter([
  {
    path: "/",
    element: <Protected><Home /> </Protected>,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/checkout",
    element: <Protected><CheckoutPage /></Protected>,
  },
  {
    path: "/product-details/:id",
    element: <Protected><ProductDetailPage /></Protected>,
  },
  {
    path: "/order-succes",
    element: <Protected><OrderSuccesPage /></Protected>,
  },
  {
    path: "/my-orders",
    element: <Protected> <MyOrdersPage /></Protected>,
  },
  {
    path: "/my-profile",
    element: <Protected><MyProfilePage /> </Protected>,
  },
  {
    path: "/logout",
    element: <Protected><Logout /> </Protected>,
  },
  {
    path: "/admin",
    element: <ProtectedAdmin><AdminProductListPage /> </ProtectedAdmin>,
  },
  {
    path: "/admin/product-details/:id",
    element: <ProtectedAdmin><AdminProductDetailPage /> </ProtectedAdmin>,
  },
  {
    path: "/admin/product-form",
    element: <ProtectedAdmin><ProductFormPage /> </ProtectedAdmin>,
  },
  {
    path: "/admin/product-form/:id",
    element: <ProtectedAdmin><ProductFormPage /> </ProtectedAdmin>,
  },
  {
    path: "/admin/orders",
    element: <ProtectedAdmin><AdminOrders /> </ProtectedAdmin>,
  },
  {
    path: "*",
    element: <ErrorPage />,
  },

]);
function App() {

  const dispatch = useDispatch();
  const user = useSelector(selectisLoggedInUser);

  useEffect(() => {
    if (user) {
      dispatch(fetchCartItemsByUserIdAsync(user.id))
      dispatch(fetchLoddInUserAsync(user.id));
    }
  }, [dispatch, user]);


  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App;
