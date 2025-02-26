import AuthenticationPage from '@/pages/AuthPage'
import AuthSuccess from '@/pages/AuthPage/AuthSuccess'
import HomePage from '@/pages/HomePage'
import { createBrowserRouter } from 'react-router-dom'

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />
  },
  {
    path: 'authentication',
    element: (
      <>
        <AuthenticationPage />
      </>
    )
  },
  {
    path: '/auth-success',
    element: (
      <>
        <AuthSuccess />
      </>
    )
  }
])
export default router
