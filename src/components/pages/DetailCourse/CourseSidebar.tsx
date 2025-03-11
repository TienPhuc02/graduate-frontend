import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { Avatar } from 'antd'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { createOrderAPI, createOrderItemAPI } from '@/services/ApiService'
import useAuthStore from '@/stores/authStore'
import { useOrderStore } from '@/stores/userOrderStore'
import { Loader } from 'lucide-react'

interface CourseSidebarProps {
  course: IAdminCourse
  userId: string
}

export const CourseSidebar = ({ course, userId }: CourseSidebarProps) => {
  const navigate = useNavigate()
  const { order, setOrder } = useOrderStore()
  const [orderId, setOrderId] = useState<string | null>(order?.id || null)
  const { user } = useAuthStore()
  const isRegistered = order?.orderItems?.some((item) => item.courseId === course.id) ?? false
  console.log('🚀 ~ CourseSidebar ~ isRegistered:', isRegistered)

  const createOrderMutation = useMutation({
    mutationFn: (data: ICreateOrderDTO) => createOrderAPI({ ...data, userId: user?.id! }),
    onSuccess: (data) => {
      setOrder(data)
      setOrderId(data.id)
      createOrderItemMutation.mutate({
        orderId: data.id,
        courseId: course.id,
        price: Number(course.price)
      })
    }
  })

  const createOrderItemMutation = useMutation({
    mutationFn: (data: ICreateOrderItemDTO) => createOrderItemAPI(data),
    onSuccess: (data) => {
      setOrder((prev) => {
        if (!prev) return prev as unknown as IAdminOrder
        return {
          ...prev,
          orderItems: [...(prev.orderItems || []), data]
        }
      })
    }
  })

  const handleRegister = () => {
    if (isRegistered) {
      navigate('/my-cart')
    } else {
      if (orderId) {
        createOrderItemMutation.mutate({
          orderId,
          courseId: course.id,
          price: Number(course.price)
        })
      } else {
        createOrderMutation.mutate({
          userId,
          totalAmount: Number(course.price),
          status: 'pending',
          orderItems: [{ productId: course.id, quantity: 1 }]
        })
      }
    }
  }

  return (
    <div className='md:w-1/3'>
      <Card>
        <CardHeader />
        <CardContent>
          <p className='text-xl text-gray-600 dark:text-gray-300 mt-1'>
            Giá:{' '}
            {course.price
              ? new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(Number(course.price))
              : 'Miễn phí'}
          </p>
          <p className='text-sm text-muted-foreground mt-2'>
            Ngày tạo: {new Date(course.createdAt).toLocaleDateString()}
          </p>
          {course.instructor && (
            <div className='flex items-center gap-2 mt-4'>
              <Avatar src={course.instructor.profilePicture} />
              <span>
                {course.instructor.firstName} {course.instructor.lastName}
              </span>
            </div>
          )}
          <Button
            className='w-full mt-4'
            onClick={handleRegister}
            disabled={createOrderMutation.status === 'pending' || createOrderItemMutation.status === 'pending'}
          >
            {createOrderMutation.status === 'pending' || createOrderItemMutation.status === 'pending' ? (
              <Loader className='w-2 h-2 animate-spin' />
            ) : isRegistered ? (
              'Đi tới giỏ hàng'
            ) : (
              'Đăng ký ngay'
            )}
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
