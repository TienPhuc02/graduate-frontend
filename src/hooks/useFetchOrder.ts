import { useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { getOrdersAPI } from '@/services/ApiService'
import { useOrderStore } from '@/stores/userOrderStore'
import useUserStore from '@/stores/authStore'

export const useFetchOrder = () => {
  const { setOrder } = useOrderStore()
  const { user } = useUserStore()

  const { data, isSuccess, isLoading, error } = useQuery({
    queryKey: ['orders', user?.id],
    queryFn: () => getOrdersAPI(),
    enabled: !!user?.id // Chỉ fetch khi user đã đăng nhập
  })

  useEffect(() => {
    if (isSuccess && data?.results.length > 0) {
      setOrder(data.results[0]) // Lấy order đầu tiên của user
    }
  }, [data, isSuccess, setOrder])

  // 🛠 Fix lỗi: return một object để tránh undefined
  return { data, isLoading, error }
}
