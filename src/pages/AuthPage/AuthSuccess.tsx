import { useSearchParams } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { CheckCircle2 } from 'lucide-react'
import { useEffect, useState } from 'react'
import useUserStore from '@/stores/userStore'
import { getMe } from '@/services/ApiService'
import { toast } from 'sonner'
import { Skeleton } from '@/components/ui/skeleton'

function AuthSuccess() {
  const [searchParams] = useSearchParams()
  const setUser = useUserStore((state) => state.setUser)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const token = searchParams.get('token')
    if (token) {
      localStorage.setItem('access_token', token)
      getMe()
        .then((res) => {
          if (res?.data) {
            setUser(res.data)
          }
        })
        .catch(() => {
          toast('❌ Đăng nhập thất bại!', {
            description: 'Lỗi khi lấy thông tin người dùng!'
          })
        })
        .finally(() => setIsLoading(false))
    } else {
      setIsLoading(false)
    }
  }, [searchParams, setUser])

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900'>
      {isLoading ? (
        <Skeleton className='w-full max-w-md h-[200px] p-6' />
      ) : (
        <Card className='w-full max-w-md p-6'>
          <CardHeader>
            <div className='flex items-center justify-center mb-4'>
              <CheckCircle2 className='h-12 w-12 text-green-500' />
            </div>
            <CardTitle className='text-2xl font-bold text-center'>Đăng nhập thành công!</CardTitle>
          </CardHeader>
          <CardContent className='text-center'>
            <p className='text-gray-600 dark:text-gray-300 mb-6'>
              Chào mừng trở lại! Bây giờ bạn đã đăng nhập và sẵn sàng khám phá.
            </p>
            <Button onClick={() => (window.location.href = '/')} className='w-full'>
              Đi tới Trang chủ
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

export default AuthSuccess
