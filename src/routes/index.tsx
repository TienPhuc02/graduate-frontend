import AuthenticationPage from '@/pages/AuthPage'
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
  }
])
export default router
