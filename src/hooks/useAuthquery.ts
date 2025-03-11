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
  console.log('🚀 ~ useAuthQuery ~ queryResult:', queryResult)

  useEffect(() => {
    if (queryResult.data && queryResult.data.data) {
      console.log('🚀 ~ useAuthQuery ~ data:', queryResult.data.data)
      setUser(queryResult?.data?.data)
    }
  }, [queryResult?.data?.data])

  useEffect(() => {
    if (queryResult.error) {
      setUser(null)
    }
  }, [queryResult.error])

  return queryResult
}
