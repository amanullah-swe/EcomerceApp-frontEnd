
import './App.css'
import Home from './pages/Home'
import LoginPage from './pages/LoginPage';
import ProductDetailPage from './pages/ProductDetialPage'
import Protected from './features/products/components/Protected';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import Register from './features/auth/components/Register';
import CheckoutPage from './pages/CheckoutPage';
import { useDispatch, useSelector } from 'react-redux';
import { selectisLoggedInUser } from './features/auth/authSlice';
import { useEffect } from 'react';
import { fetchCartItemsByUserIdAsync } from './features/cart/cartSlice';

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

]);
function App() {

  const dispatch = useDispatch();
  const user = useSelector(selectisLoggedInUser);

  useEffect(() => {
    if (user) {
      dispatch(fetchCartItemsByUserIdAsync(user.id))
    }
  }, [dispatch, user]);
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App;
