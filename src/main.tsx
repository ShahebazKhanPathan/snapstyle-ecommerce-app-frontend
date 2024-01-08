import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { ChakraProvider } from '@chakra-ui/react'
import theme from './theme.ts'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import SignUpForm from './components/SignUpForm.tsx'
import ProductList from './components/ProductList.tsx'
import 'bootstrap/dist/css/bootstrap.min.css'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <div>URL not found</div>,
    children: [
      {
        path: "/",
        element: <ProductList/>
      },
      {
        path: "/signup",
        element: <SignUpForm/>
      }
    ]
  },
  {
    path: "/login",
    element: <div>Welcome to login</div>
  }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <ChakraProvider theme={theme}>
        <RouterProvider router={router}/>
      </ChakraProvider>
  </React.StrictMode>,
)
