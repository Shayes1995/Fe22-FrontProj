import React from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Home from './pages/Home'
import Housedetails from './pages/Housedetails'
import Login from './pages/Login'
import Registration from './pages/Registration'
import Rootlayout from './rootlayout/Rootlayout'
import ContextProvider from './context/ContextProvider'

const App = () => {

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Rootlayout />,
      children: [
        {
          path: '/',
          element: <Home />
        },
        {
          path: '/:id',
          element: <Housedetails />
        },
        {
          path: '/login',
          element: <Login />
        },
        {
          path: '/registration',
          element: <Registration />

        }
      ]
    }
  ])

  return (
    <div className="div">
      <ContextProvider>
        <RouterProvider router={router} />
      </ContextProvider>
    </div>
  )
}

export default App
