import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Avatar, Rate } from 'antd'
import { Separator } from '@/components/ui/separator'
import { CourseDetailSkeleton } from './CourseDetailSkeleton'
import { getCourseByIdAPI } from '@/services/ApiService'
import { useQuery } from '@tanstack/react-query'
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion'

interface CourseDetailProps {
  courseId: string
}

export const CourseDetail = ({ courseId }: CourseDetailProps) => {
  const {
    data: course,
    isLoading,
    error
  } = useQuery({
    queryKey: ['course', courseId],
    queryFn: () => getCourseByIdAPI(courseId)
  })

  if (isLoading) return <CourseDetailSkeleton />
  if (error) return <div>Error fetching course: {error.message}</div>
  if (!course) return <div>Course not found</div>

  return (
    <div className='container mx-auto py-8'>
      <div className='flex flex-col md:flex-row gap-6'>
        <div className='md:w-2/3'>
          <img src={course.thumbnail} alt={course.title} className='w-full h-64 object-cover rounded-lg mb-4' />
          <h1 className='text-3xl font-bold'>{course.title}</h1>
          <p className='text-muted-foreground mt-2'>{course.description}</p>
          <div className='flex items-center gap-2 mt-4'>
            <Badge variant='secondary'>{course.category}</Badge>
            <Badge variant='outline'>{course.level}</Badge>
            {course.rating && <Rate disabled defaultValue={course.rating} allowHalf />}
          </div>
        </div>

        <div className='md:w-1/3'>
          <Card>
            <CardHeader></CardHeader>
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
                  <Avatar src={course?.instructor?.profilePicture} />
                  <span>
                    {course?.instructor?.firstName} {course?.instructor?.lastName}{' '}
                  </span>
                </div>
              )}
              <Button className='w-full mt-4'>Đăng ký ngay</Button>
            </CardContent>
          </Card>
        </div>
      </div>

      <Separator className='my-8' />

      <div>
        <h2 className='text-2xl font-semibold mb-4'>Yêu cầu</h2>
        <ul className='list-disc pl-5'>
          {course?.requirements?.map((req, index) => (
            <li key={index} className='text-muted-foreground'>
              {req}
            </li>
          ))}
        </ul>
      </div>

      <Separator className='my-8' />

      <div>
        <h2 className='text-2xl font-semibold mb-4'>Những gì bạn sẽ học được</h2>
        <ul className='list-disc pl-5'>
          {course?.benefits?.map((benefit, index) => (
            <li key={index} className='text-muted-foreground'>
              {benefit}
            </li>
          ))}
        </ul>
      </div>

      <Separator className='my-8' />

      {course?.qna?.length > 0 && (
        <div>
          <h2 className='text-2xl font-semibold mb-4'>Hỏi đáp</h2>
          <Accordion type='multiple'>
            {course.qna.map((item, index) => (
              <AccordionItem key={index} value={`qna-${index}`}>
                <AccordionTrigger>{item.question}</AccordionTrigger>
                <AccordionContent>{item.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      )}
    </div>
  )
}
