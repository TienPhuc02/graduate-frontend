import { Outlet } from 'react-router-dom'
import HeaderHomePage from '../../layout/HeaderHomePage'

const WrapperApp = () => {
  return (
    <div>
      <HeaderHomePage />
      <Outlet />
    </div>
  )
}

export default WrapperApp
