
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
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App;
