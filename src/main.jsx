import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import Movies from "./Movies"
import Search from "./Search.jsx"

import { createBrowserRouter, RouterProvider } from "react-router-dom"

const router = createBrowserRouter([
  {path: "/", element : <App/>},
  {path: "/popular", element : <Movies queryType={"popular"}/>},
  {path: "/top_rated", element : <Movies queryType={"top_rated"}/>},
  {path: "/search", element : <Search/>},
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
