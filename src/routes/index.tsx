import WrapperApp from '@/components/pages/WrapperApp'
import AuthenticationPage from '@/pages/AuthPage'
import AuthPage from '@/pages/AuthPage/AuthPage'
import AuthSuccess from '@/pages/AuthPage/AuthSuccess'
import ForgotPassword from '@/pages/AuthPage/ForgotPassword'
import ResetForgotPassword from '@/pages/AuthPage/ResetForgotPassword'
import CoursesPage from '@/pages/Courses'
import CourseDetail from '@/pages/DetailCourse'
import HomePage from '@/pages/HomePage'
import { createBrowserRouter } from 'react-router-dom'

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <>
        <WrapperApp />
      </>
    ),
    children: [
      {
        index: true,
        element: (
          <>
            <HomePage />
          </>
        )
      },
      {
        path: '/courses',
        element: (
          <>
            <CoursesPage />
          </>
        )
      },
      {
        path: '/course/:id',
        element: (
          <>
            <CourseDetail />
          </>
        )
      }
    ]
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
