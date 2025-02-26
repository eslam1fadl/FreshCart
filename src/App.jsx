import Layout from './Components/Layout'
import Home from './Components/Home'
import Login from './Components/Login'
import Brand from './Components/Brand'
import Categories from './Components/Categories'
import Loading from './Components/Loading'
import Products from './Components/Products'
import Cart from './Components/Cart'
import ProtectedRoute from './Components/ProtectedRoute'
import ProductDetails from './Components/productDetails'
import ForgetPassword from './Components/ForgetPassword'
import NewPassword from './Components/NewPassword'
import ResetCode from './Components/ResetCode'

import Notfound from './Components/Notfound'
import Register from './Components/Register'
import Wish from './Components/Wish'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'

export default function App() {
  let routes = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        { path: '/login', element: <Login /> },
        { path: '/register', element: <Register /> },
        { path: '/forgetpassword', element: <ForgetPassword /> },
        { path: '/resetcode', element: <ResetCode /> },
        { path: '/newpassword', element: <NewPassword /> },



        {
          element: <ProtectedRoute />,
          children: [
            { index: true, element: <Home /> }, 
            { path: '/products', element: <Products /> },
            { path: '/productdetails/:id/:catId', element: <ProductDetails /> },
            { path: '/cart', element: <Cart /> },
            { path: '/categories', element: <Categories /> },
            { path: '/brand', element: <Brand /> },
            { path: '/wish', element: <Wish /> },
            { path: '/loading', element: <Loading /> },
            { path: '*', element: <Notfound /> },
          ]
        }
      ]
    }
  ]);

  return <RouterProvider router={routes} />;
}
