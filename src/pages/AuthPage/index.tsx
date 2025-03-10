import HeaderAuthPage from '@/components/layout/HeaderAuthPage'
import { Outlet } from 'react-router-dom'

const AuthenticationPage = () => {
  return (
    <>
      <HeaderAuthPage />
      <Outlet />
    </>
  )
}

export default AuthenticationPage
