import React from 'react'
import ReactDOM from 'react-dom/client'
import {RouterProvider } from "react-router-dom"
import {router} from './router.jsx'

import './index.css'
import { AuthProvider } from './context/AuthProvider.jsx'
import IsMobile from './context/IsMobile.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    
    <AuthProvider>
      
      <RouterProvider router={router}/>

      
    </AuthProvider>

  </React.StrictMode>,
)
