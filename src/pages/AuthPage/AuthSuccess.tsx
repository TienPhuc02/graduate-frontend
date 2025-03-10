import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { CheckCircle2 } from 'lucide-react'

function AuthSuccess() {
  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900'>
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
    </div>
  )
}

export default AuthSuccess
