import { useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { useCourseStore } from '@/stores/useCourseStore'
import useUserStore from '@/stores/userStore'

const MyCourses = () => {
  const { course, loading, error, fetchCourseByUserId } = useCourseStore()
  const { user } = useUserStore()
  console.log('🚀 ~ MyCourses ~ user:', user)

  useEffect(() => {
    if (user) {
      fetchCourseByUserId(user?.id)
    }
  }, [fetchCourseByUserId, user?.id])

  if (loading) return <p>Đang tải...</p>
  if (error) return <p>{error}</p>
  if (!course) return <p>Không có khóa học nào.</p>

  return (
    <div className='container mx-auto p-6'>
      <h2 className='text-2xl font-bold mb-4'>Khóa học của tôi</h2>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        <Card key={course.id}>
          <img
            src={course.thumbnail || 'https://via.placeholder.com/150'}
            alt={course.title}
            className='w-full h-40 object-cover rounded-t-md'
          />
          <CardHeader>
            <CardTitle>{course.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className='text-sm text-gray-600 mb-2'>{course.description}</p>
            <div className='flex items-center justify-between mb-3'>
              <Badge variant='secondary'>Đang học</Badge>
              <span className='text-lg font-bold'>$49.99</span>
            </div>
            <Button variant='default' size='sm'>
              Xem chi tiết
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default MyCourses
