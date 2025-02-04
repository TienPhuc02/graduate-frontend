import App from '@/App'
import AuthenticationPage from '@/pages/AuthPage'
import { createBrowserRouter } from 'react-router-dom'
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />
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
