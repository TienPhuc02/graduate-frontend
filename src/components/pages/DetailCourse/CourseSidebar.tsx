// components/course/CourseSidebar.tsx
import { Avatar } from 'antd'
import { Card, CardContent, CardHeader } from '../../ui/card'
import { Button } from '../../ui/button'

interface CourseSidebarProps {
  course: IAdminCourse
}

export const CourseSidebar = ({ course }: CourseSidebarProps) => {
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
          <Button className='w-full mt-4'>Đăng ký ngay</Button>
        </CardContent>
      </Card>
    </div>
  )
}
