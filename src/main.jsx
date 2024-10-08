import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, createHashRouter, RouterProvider } from 'react-router-dom'
import App from './App'
import { Account } from './components/Account'
import { Home } from './components/Home'
import { Admin } from './components/Admin'
import './index.css'
import Videos from './components/Home/videos'

const router = createHashRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: 'account',
    element: <Account></Account>
  },
  {
    path: 'home',
    element: <Home></Home>
  },
  {
    path: 'admin',
    element: <Admin></Admin>
  },
  {
    path: 'v/:id',
    element: <Videos></Videos>
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
