import { useQuery } from '@tanstack/react-query'
import useUserStore from '../stores/userStore'
import { getMe } from '../services/ApiService'
import { useEffect } from 'react'

export const useFetchUser = () => {
  const setUser = useUserStore((state) => state.setUser)

  const { data, isSuccess, isLoading, error } = useQuery({
    queryKey: ['getMe'],
    queryFn: getMe,
    retry: false
  })

  useEffect(() => {
    if (data && data.data) {
      setUser(data?.data)
    }
  }, [data?.data])

  useEffect(() => {
    if (error) {
      setUser(null)
    }
  }, [error])

  return { dataUser: data, isLoading, error }
}
