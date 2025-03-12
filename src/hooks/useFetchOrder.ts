import { useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { getOrdersAPI } from '@/services/ApiService'
import { useOrderStore } from '@/stores/userOrderStore'
import useUserStore from '@/stores/userStore'

export const useFetchOrder = () => {
  const { setOrder } = useOrderStore()
  const { user } = useUserStore()

  const { data, isSuccess, isLoading, error } = useQuery({
    queryKey: ['orders', user?.id],
    queryFn: () => getOrdersAPI(),
    enabled: !!user?.id
  })

  useEffect(() => {
    if (isSuccess && data?.results.length > 0) {
      setOrder(data.results[0])
    }
  }, [data, isSuccess, setOrder])

  return { data, isLoading, error }
}
