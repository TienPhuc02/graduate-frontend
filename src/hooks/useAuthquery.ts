import { useQuery } from '@tanstack/react-query'
import useAuthStore from '../stores/authStore'
import { getMe } from '../services/ApiService'
import { useEffect } from 'react'

export const useAuthQuery = () => {
  const setUser = useAuthStore((state) => state.setUser)

  const queryResult = useQuery({
    queryKey: ['getMe'],
    queryFn: getMe,
    retry: false
  })

  useEffect(() => {
    if (queryResult.data) {
      console.log('🚀 ~ useAuthQuery ~ data:', queryResult.data.data.user)
      setUser(queryResult.data.data.user)
    }
  }, [queryResult.data])

  useEffect(() => {
    if (queryResult.error) {
      setUser(null)
    }
  }, [queryResult.error])

  return queryResult
}
