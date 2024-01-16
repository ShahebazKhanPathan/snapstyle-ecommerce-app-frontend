import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import theme from './theme.ts'
import 'bootstrap/dist/css/bootstrap.min.css'
import { ChakraProvider } from '@chakra-ui/react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import SignUpForm from './components/SignUpForm.tsx'
import ProductList from './components/ProductList.tsx'
import SignInForm from './components/SignInForm.tsx'
import AdminLogin from './components/AdminLogin.tsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    errorElement: <div>URL not found</div>,
    children: [
      {
        path: "/",
        element: <ProductList/>
      },
      {
        path: "/signup",
        element: <SignUpForm/>
      },
      {
        path: "/signin",
        element: <SignInForm />
      },
      {
        path: "/admin",
        element: <AdminLogin/>
      }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <ChakraProvider theme={theme}>
        <RouterProvider router={router}/>
      </ChakraProvider>
  </React.StrictMode>,
)
