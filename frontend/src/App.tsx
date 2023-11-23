import React from 'react'
import { RouterProvider, createBrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Housedetails from './pages/Housedetails'
import Login from './pages/Login'
import Registration from './pages/Registration'
import Rootlayout from './rootlayout/Rootlayout'
import ContextProvider from './context/ContextProvider'
import Apply from './pages/Apply'
import ProtectedRoute from './protectedRoute/ProtectedRoute'
import UserApplications from './pages/UserApplications'
import Confirm from './pages/Confirm'
import Payment from './pages/Payment'
import MyProfile from './pages/MyProfile'
import AboutUs from './pages/AboutUs'
import Confirmed from './pages/Confirmed'
import NotFound from './pages/NotFound'

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
        },
        {
          path: '/apply/:id',
          element:
            <ProtectedRoute>
              <Apply />
            </ProtectedRoute>
        },
        {
          path: '/mina-ansokningar',
          element:
            <ProtectedRoute>
              <UserApplications />
            </ProtectedRoute>
        },
        {
          path: '/mina-ansokningar/:id/',
          element:
            <ProtectedRoute>
              <Confirm />
            </ProtectedRoute>
        },
        {
          path: '/mina-ansokningar/:applicationId/betalning/:apartementId',
          element:
            <ProtectedRoute>
              <Payment />
            </ProtectedRoute>
        },
        {
          path: '/min-profil',
          element:
            <ProtectedRoute>
              <MyProfile />
            </ProtectedRoute>
        },
        {
          path: '/my-apartement',
          element:
            <ProtectedRoute>
              <Confirmed />
            </ProtectedRoute>
        },
        {
          path: '/om-oss',
          element: <AboutUs />
        },
        {
          path: '*', 
          element: <NotFound />
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
