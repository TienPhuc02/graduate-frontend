import HeaderHomePage from '@/components/layout/HeaderHomePage'
import { Outlet } from 'react-router-dom'

const WrapperApp = () => {
  return (
    <div>
      <HeaderHomePage />
      <Outlet />
    </div>
  )
}

export default WrapperApp
