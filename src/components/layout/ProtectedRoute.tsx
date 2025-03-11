import { Navigate, Outlet } from 'react-router-dom'
import React from 'react'
import { useAuthQuery } from '../../hooks/useAuthquery'

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { data: user, isLoading } = useAuthQuery()

  if (isLoading) return <div>Loading...</div>
  if (!user) return <Navigate to='/authentication' replace />

  return <>{children}</>
}

export default ProtectedRoute
