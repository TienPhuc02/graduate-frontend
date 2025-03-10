import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, Rate, Tabs } from 'antd'
import { Separator } from '@/components/ui/separator'
import { CourseDetailSkeleton } from '@/components/pages/DetailCourse/CourseDetailSkeleton'
import { getCourseByIdAPI } from '@/services/ApiService'
import { useQuery } from '@tanstack/react-query'

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
  console.log('🚀 ~ CourseDetail ~ course:', course)

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
          <p className='mt-2 text-sm text-gray-500'>Views: {course.viewsCourse}</p>
          {course.duration && <p className='text-sm text-gray-500'>Duration: {course.duration} hours</p>}
        </div>

        {/* Sidebar Section */}
        <div className='md:w-1/3'>
          <Card>
            <CardHeader>
              <CardTitle>Course Details</CardTitle>
            </CardHeader>
            <CardContent>
              <p className='text-lg font-semibold'>
                Price:{' '}
                {course.price
                  ? new Intl.NumberFormat('vi-VN', {
                      style: 'currency',
                      currency: 'VND'
                    }).format(Number(course.price))
                  : 'Miễn phí'}
              </p>
              <p className='text-sm text-muted-foreground mt-2'>
                Created: {new Date(course.createdAt).toLocaleDateString()}
              </p>
              {course.instructor && (
                <div className='flex items-center gap-2 mt-4'>
                  <Avatar src={course.instructor.profilePicture} />
                  <span>
                    {course.instructor.firstName} {course.instructor.lastName}
                  </span>
                </div>
              )}
              <Button className='w-full mt-4'>Enroll Now</Button>
            </CardContent>
          </Card>
        </div>
      </div>

      <Separator className='my-8' />

      {/* Course Details in Tabs */}
      <Tabs defaultActiveKey='1'>
        <Tabs.TabPane tab='Requirements' key='1'>
          <ul className='list-disc pl-5'>
            {course.requirements.map((req, index) => (
              <li key={index} className='text-muted-foreground'>
                {req}
              </li>
            ))}
          </ul>
        </Tabs.TabPane>

        <Tabs.TabPane tab="What You'll Learn" key='2'>
          <ul className='list-disc pl-5'>
            {course.benefits.map((benefit, index) => (
              <li key={index} className='text-muted-foreground'>
                {benefit}
              </li>
            ))}
          </ul>
        </Tabs.TabPane>

        <Tabs.TabPane tab='Q&A' key='3'>
          {course.qna.length > 0 ? (
            course.qna.map((item, index) => (
              <Card key={index} className='mb-4'>
                <CardHeader>
                  <CardTitle className='text-lg'>{item.question}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>{item.answer}</p>
                </CardContent>
              </Card>
            ))
          ) : (
            <p>No questions yet.</p>
          )}
        </Tabs.TabPane>
        <Tabs.TabPane tab='Course Content' key='4'>
          {course.lectureCourses?.length > 0 ? (
            <ul className='list-disc pl-5'>
              {course.lectureCourses.map((lecture: IAdminLecture, index: number) => (
                <li key={index} className='text-muted-foreground'>
                  {lecture.title} - {lecture?.id} min
                </li>
              ))}
            </ul>
          ) : (
            <p>No lectures available.</p>
          )}
        </Tabs.TabPane>
      </Tabs>
    </div>
  )
}
