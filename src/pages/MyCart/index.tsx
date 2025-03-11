import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { Card, CardHeader, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
// import { deleteOrderItemAPI, fetchOrdersAPI } from '@/services/ApiService'
import { useNavigate } from 'react-router-dom'
import { useOrderStore } from '@/stores/userOrderStore'
import useAuthStore from '@/stores/authStore'

const MyCart = () => {
  const queryClient = useQueryClient()
  const { order, setOrder } = useOrderStore()
  console.log('🚀 ~ MyCart ~ order:', order)
  const { user } = useAuthStore()
  console.log('🚀 ~ MyCart ~ user:', user)
  const navigate = useNavigate()

  //   // Fetch danh sách đơn hàng từ API
  //   const { data: orders, isLoading } = useQuery({
  //     queryKey: ['orders'],
  //     queryFn: fetchOrdersAPI
  //   })

  // Xóa order item
  //   const deleteMutation = useMutation({
  //     mutationFn: (orderId: string) => deleteOrderItemAPI(orderId),
  //     onSuccess: (_, orderId) => {
  //       setOrder((prev) => ({
  //         ...prev!,
  //         orderItems: prev!.orderItems.filter((item) => item.id !== orderId)
  //       }))
  //       queryClient.invalidateQueries({ queryKey: ['orders'] })
  //     }
  //   })

  //   if (isLoading) return <p>Loading...</p>
  if (!user?.orders?.length) return <p className='text-center text-gray-500'>No orders in your cart.</p>

  return (
    <div className='max-w-3xl mx-auto p-6'>
      <h1 className='text-2xl font-semibold mb-4'>🛒 My Cart</h1>

      <div className='space-y-4'>
        {user?.orders
          ?.filter((orderItem) => !orderItem.isDeleted)
          .map((orderItem) => (
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
                        Number(orderItem.totalAmount)
                      )}
                    </span>
                  </p>
                  <p className='text-xs text-gray-400'>Created: {new Date(orderItem.createdAt).toLocaleString()}</p>
                </div>
                <div className='flex gap-2'>
                  <Button
                    variant='destructive'
                    size='sm'
                    // onClick={() => deleteMutation.mutate(order.id)}
                  >
                    Remove
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
      </div>

      <div className='mt-6 flex justify-end'>
        <Button onClick={() => navigate('/checkout')} className='bg-blue-500 text-white'>
          Proceed to Checkout
        </Button>
      </div>
    </div>
  )
}

export default MyCart
