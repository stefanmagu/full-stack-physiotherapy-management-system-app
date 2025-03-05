import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import AdminContextProvider from './context/AdminContext.jsx'
import PhysiotherapistContextProvider from './context/PhysiotherapistContext.jsx'
import AppContextProvider from './context/AppContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AdminContextProvider>
      <PhysiotherapistContextProvider>
        <AppContextProvider>
          <App />
        </AppContextProvider>
      </PhysiotherapistContextProvider>
    </AdminContextProvider>
  </BrowserRouter>,
)
