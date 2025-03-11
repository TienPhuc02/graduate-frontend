import { Outlet } from 'react-router-dom'
import HeaderHomePage from '../../layout/HeaderHomePage'
import { useAuthQuery } from '../../../hooks/useAuthquery'

const WrapperApp = () => {
  const { isLoading } = useAuthQuery()

  if (isLoading) return <div className='h-screen flex items-center justify-center'>Đang tải...</div>

  return (
    <div>
      <HeaderHomePage />
      <Outlet />
    </div>
  )
}

export default WrapperApp
