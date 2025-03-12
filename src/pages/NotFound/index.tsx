import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { AlertTriangle } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

function NotFound() {
  const navigate = useNavigate()

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900'>
      <Card className='w-full max-w-md p-6'>
        <CardHeader>
          <div className='flex items-center justify-center mb-4'>
            <AlertTriangle className='h-12 w-12 text-yellow-500' />
          </div>
          <CardTitle className='text-2xl font-bold text-center'>404 - Không tìm thấy trang</CardTitle>
        </CardHeader>
        <CardContent className='text-center'>
          <p className='text-gray-600 dark:text-gray-300 mb-6'>
            Trang bạn đang tìm kiếm không tồn tại hoặc đã bị di chuyển.
          </p>
          <Button onClick={() => navigate('/')} className='w-full'>
            Quay về Trang chủ
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

export default NotFound
