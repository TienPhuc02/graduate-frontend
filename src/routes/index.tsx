import { createBrowserRouter } from 'react-router-dom'
import WrapperApp from '../components/pages/WrapperApp'
import HomePage from '../pages/HomePage'
import CoursesPage from '../pages/Courses'
import BlogsPage from '../pages/Blogs'
import AuthenticationPage from '../pages/AuthPage'
import AuthPage from '../pages/AuthPage/AuthPage'
import AuthSuccess from '../pages/AuthPage/AuthSuccess'
import ForgotPassword from '../pages/AuthPage/ForgotPassword'
import ResetForgotPassword from '../pages/AuthPage/ResetForgotPassword'
import CourseDetailPage from '../pages/DetailCourse'
import MyCart from '@/pages/MyCart'
import NotFound from '@/pages/NotFound'
import MyCourses from '@/pages/MyCourses'
import LearningPage from '@/pages/LearnCourse'

const router = createBrowserRouter([
  {
    path: '/',
    errorElement: <NotFound />,
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
        path: '/blogs',
        element: (
          <>
            <BlogsPage />
          </>
        )
      },
      {
        path: '/course/:id',
        element: (
          <>
            <CourseDetailPage />
          </>
        )
      },
      {
        path: '/my-cart',
        element: (
          <>
            <MyCart />
          </>
        )
      },
      {
        path: '/my-course',
        element: (
          <>
            <MyCourses />
          </>
        )
      },
      {
        path: '/learn-course/:id',
        element: (
          <>
            <LearningPage />
          </>
        )
      }
    ]
  },
  {
    path: '/authentication',
    errorElement: <NotFound />,
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
