// components/course/CourseDetail.tsx
import { useQuery } from '@tanstack/react-query'
import { getCourseByIdAPI } from '../../../services/ApiService'
import { CourseDetailSkeleton } from './CourseDetailSkeleton'
import { CourseHeader } from './CourseHeader'
import { CourseSidebar } from './CourseSidebar'
import { CourseContent } from './CourseContent'
import { CommentCourse } from './CommentCourse'

interface CourseDetailProps {
  courseId: string
}

export const CourseDetail = ({ courseId }: CourseDetailProps) => {
  const {
    data: courseResponse,
    isLoading,
    error
  } = useQuery({
    queryKey: ['course', courseId],
    queryFn: () => getCourseByIdAPI(courseId)
  })

  if (isLoading) return <CourseDetailSkeleton />
  if (error) return <div>Error fetching course: {error.message}</div>
  if (!courseResponse) return <div>Course not found</div>

  const course = courseResponse

  return (
    <div className='container mx-auto py-8'>
      <div className='flex flex-col md:flex-row gap-6'>
        <CourseHeader course={course} />
        <CourseSidebar course={course} />
      </div>
      <CourseContent course={course} />
      <CommentCourse courseId={courseId}  />
    </div>
  )
}
