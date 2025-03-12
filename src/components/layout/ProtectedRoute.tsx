import { Navigate } from 'react-router-dom'
import React from 'react'
import { useFetchUser } from '../../hooks/useFetchUser'
import { Loader } from 'lucide-react'

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { dataUser, isLoading } = useFetchUser()

  if (isLoading)
    return (
      <div>
        <Loader className='w-8 h-8 animate-spin' />
      </div>
    )
  if (!dataUser) return <Navigate to='/authentication' replace />

  return <>{children}</>
}

export default ProtectedRoute
