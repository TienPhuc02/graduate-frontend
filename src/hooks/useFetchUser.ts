import { useQuery } from '@tanstack/react-query'
import useUserStore from '../stores/authStore'
import { getMe } from '../services/ApiService'
import { useEffect } from 'react'

export const useFetchUser = () => {
  const setUser = useUserStore((state) => state.setUser)

  const queryResult = useQuery({
    queryKey: ['getMe'],
    queryFn: getMe,
    retry: false
  })

  useEffect(() => {
    if (queryResult.data && queryResult.data.data) {
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
