// components/course/CourseHeader.tsx
// import { Badge, Rate } from 'antd'

import { Rate } from 'antd'
import { Badge } from '../../ui/badge'

interface CourseHeaderProps {
  course: IAdminCourse
}

export const CourseHeader = ({ course }: CourseHeaderProps) => {
  return (
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
  )
}
