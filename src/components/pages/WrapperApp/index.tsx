import { Outlet } from 'react-router-dom'
import HeaderHomePage from '../../layout/HeaderHomePage'
import { useAuthQuery } from '../../../hooks/useAuthquery'
import { Loader } from 'lucide-react'

const WrapperApp = () => {
  const { isLoading } = useAuthQuery()

  if (isLoading) {
    return (
      <div className='h-screen flex items-center justify-center'>
        <Loader className='w-8 h-8 animate-spin' />
      </div>
    )
  }

  return (
    <div>
      <HeaderHomePage />
      <Outlet />
    </div>
  )
}

export default WrapperApp
