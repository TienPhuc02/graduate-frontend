import AuthenticationPage from '@/pages/AuthPage'
import AuthPage from '@/pages/AuthPage/AuthPage'
import AuthSuccess from '@/pages/AuthPage/AuthSuccess'
import ForgotPassword from '@/pages/AuthPage/ForgotPassword'
import ResetForgotPassword from '@/pages/AuthPage/ResetForgotPassword'
import HomePage from '@/pages/HomePage'
import { createBrowserRouter } from 'react-router-dom'

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />
  },
  {
    path: '/authentication',
    element: (
      <>
        <AuthenticationPage />
      </>
    ),
    children: [
      { index: true, element: <AuthPage /> },
      {
        path: 'auth-success',
        element: (
          <>
            <AuthSuccess />
          </>
        )
      },
      {
        path: 'forgot-password',
        element: (
          <>
            <ForgotPassword />
          </>
        )
      },
      {
        path: 'reset-forgotPassword',
        element: (
          <>
            <ResetForgotPassword />
          </>
        )
      }
    ]
  }
])
export default router
