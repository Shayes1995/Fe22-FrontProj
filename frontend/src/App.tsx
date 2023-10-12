import React from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Home from './pages/Home'
import Housedetails from './pages/Housedetails'
import Rootlayout from './rootlayout/Rootlayout'

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
        }
      ]
    }
  ])

  return (
    <div className="div">
      <RouterProvider router={router} />
    </div>
  )
}

export default App
