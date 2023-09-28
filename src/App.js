import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import React from 'react'
import { ROUTES } from './router';
const router = createBrowserRouter(ROUTES)
const App = () => {
  return (
    <React.Fragment>
      <RouterProvider router={router} />
    </React.Fragment>
  )
}

export default App
