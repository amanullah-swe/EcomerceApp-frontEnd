
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

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
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
    element: <CheckoutPage />,
  },
  {
    path: "/product-details/:id",
    element: <ProductDetailPage />,
  },

]);
function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App;
