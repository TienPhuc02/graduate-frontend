import { Card, CardHeader, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useNavigate } from 'react-router-dom'
import { useOrderStore } from '@/stores/userOrderStore'
import { useFetchOrder } from '@/hooks/useFetchOrder'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deleteOrderItemAPI, getMe, getOrdersAPI, updateOrderAPI } from '@/services/ApiService'
import { Loader } from 'lucide-react'
import { useFetchUser } from '@/hooks/useFetchUser'
import useUserStore from '@/stores/userStore'

const MyCart = () => {
  const queryClient = useQueryClient()
  const { isLoading } = useFetchOrder()
  useFetchUser()
  const { user } = useUserStore()
  console.log('🚀 ~ MyCart ~ user:', user)
  const { order, setOrder } = useOrderStore()
  const { setUser } = useUserStore()
  const navigate = useNavigate()

  const deleteMutation = useMutation({
    mutationFn: (orderItemId: string) => deleteOrderItemAPI(orderItemId),
    onSuccess: (_, orderId) => {
      setOrder((prev) => ({
        ...prev!,
        orderItems: prev!.orderItems.filter((item) => item.id !== orderId)
      }))
      queryClient.invalidateQueries({ queryKey: ['orders'] })
    }
  })

  const updateOrderMutation = useMutation({
    mutationFn: (orderItem: string) => updateOrderAPI(orderItem!, { status: 'completed' }),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['orders'] })
      await queryClient.invalidateQueries({ queryKey: ['getMe'] })

      const updatedOrders = await queryClient.fetchQuery({
        queryKey: ['orders'],
        queryFn: () => getOrdersAPI()
      })

      const pendingOrders = updatedOrders.results.filter((order) => order.status === 'pending')

      setOrder(pendingOrders.length > 0 ? pendingOrders[0] : null)

      const updatedUser = await queryClient.fetchQuery({
        queryKey: ['getMe'],
        queryFn: () => getMe()
      })

      setUser(updatedUser.data)
      navigate('/')
    }
  })

  if (isLoading)
    return (
      <div className='flex justify-center'>
        <Loader className='w-8 h-8 animate-spin' />
      </div>
    )

  const filteredOrderItems = order?.orderItems?.filter(() => order?.status !== 'completed') || []

  return (
    <div className='max-w-3xl mx-auto p-6'>
      <h1 className='text-2xl font-semibold mb-4'>🛒 My Cart</h1>

      <div className='space-y-4'>
        {order === null || filteredOrderItems.length === 0 ? (
          <p className='text-center text-gray-500'>Không có đơn hàng nào trong giỏ hàng của bạn.</p>
        ) : (
          filteredOrderItems.map((orderItem) => (
            <Card key={orderItem.id} className='relative'>
              <CardHeader>
                <p className='text-lg font-medium'>Order #{orderItem.id}</p>
              </CardHeader>
              <CardContent className='flex justify-between items-center'>
                <div>
                  <p className='text-sm text-gray-600'>
                    Total:
                    <span className='text-red-500 font-medium ml-1'>
                      {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(
                        Number(order?.totalAmount)
                      )}
                    </span>
                  </p>
                  <p className='text-xs text-gray-400'>Created: {new Date(orderItem.createdAt).toLocaleString()}</p>
                </div>
                <div className='flex gap-2'>
                  <Button variant='destructive' size='sm' onClick={() => deleteMutation.mutate(orderItem.id)}>
                    Remove
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {order == null || filteredOrderItems.length === 0 ? (
        <div className='mt-6 flex justify-end'>
          <Button onClick={() => navigate('/courses')} className='mt-4 bg-gray-500 text-white'>
            Khám phá khóa học
          </Button>
        </div>
      ) : (
        <div className='mt-6 flex justify-end'>
          <Button
            onClick={() => {
              if (order?.id) {
                updateOrderMutation.mutate(order.id)
              }
            }}
            className='bg-blue-500 text-white'
          >
            Tiến hành thanh toán
          </Button>
        </div>
      )}
    </div>
  )
}

export default MyCart
