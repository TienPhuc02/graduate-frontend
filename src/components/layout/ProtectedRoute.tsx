import { Navigate } from 'react-router-dom'
import React from 'react'
import { useAuthQuery } from '../../hooks/useAuthquery'
import { Loader } from 'lucide-react'

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { data: user, isLoading } = useAuthQuery()

  if (isLoading)
    return (
      <div>
        <Loader className='w-8 h-8 animate-spin' />
      </div>
    )
  if (!user) return <Navigate to='/authentication' replace />

  return <>{children}</>
}

export default ProtectedRoute
