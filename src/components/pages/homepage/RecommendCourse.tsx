import { useQuery } from '@tanstack/react-query'
import { Image } from 'antd'
import { ArrowRight, Loader } from 'lucide-react'

import { Link, useNavigate } from 'react-router-dom'
import { getCoursesAPI } from '../../../services/ApiService'
import { TextAnimate } from '../../ui/text-animate'
import { Card, CardContent } from '../../ui/card'
import { ECourseStatus } from '../../../types/enum'

const RecommendCourse = () => {
  const navigate = useNavigate()
  const {
    data: courses,
    isLoading,
    error
  } = useQuery({
    queryKey: ['getRecommendCourses'],
    queryFn: () => getCoursesAPI({ page: 1, pageSize: 3, status: ECourseStatus.ACTIVE })
  })

  if (isLoading)
    return (
      <p>
        <Loader className='w-8 h-8 animate-spin' />.
      </p>
    )
  if (error) return <p>Error fetching courses: {error.message}</p>

  return (
    <>
      <div className='flex justify-between items-center'>
        <TextAnimate text='Đề xuất khóa học dành cho bạn' className='text-2xl mt-5' type='whipInUp' />
        <Link to='/courses' className='flex items-center text-blue-500 hover:underline'>
          Xem tất cả khóa học <ArrowRight className='w-4 h-4 ml-1' />
        </Link>
      </div>

      <div className='flex overflow-x-auto gap-4 mt-6'>
        {courses && courses.results && courses?.results?.length > 0 ? (
          courses?.results?.map((course: IAdminCourse) => (
            <Card
              key={course.id}
              onClick={() => navigate(`/course/${course.id}`)}
              className='max-w-[310px] cursor-pointer shadow-md bg-white dark:bg-neutral-900 dark:border dark:border-gray-700'
            >
              <CardContent className='p-3 text-gray-900 dark:text-white'>
                <Image
                  src={course.thumbnail || '/images/default-course.jpg'}
                  alt={course.title}
                  width={280}
                  height={160}
                  className='rounded-lg'
                />
                <h3 className='text-lg font-semibold mt-2'>{course.title}</h3>
                <p className='text-sm text-gray-500 dark:text-gray-400'>
                  Giảng viên: {course.instructor?.firstName || 'N/A'} {course.instructor?.lastName || 'N/A'}
                </p>
                <p className='text-sm text-gray-600 dark:text-gray-300 mt-1'>
                  Giá:{' '}
                  {course.price
                    ? new Intl.NumberFormat('vi-VN', {
                        style: 'currency',
                        currency: 'VND'
                      }).format(Number(course.price))
                    : 'Miễn phí'}
                </p>
                <p className='text-sm text-yellow-500'>⭐ {course.rating || 'Chưa có đánh giá'}</p>
              </CardContent>
            </Card>
          ))
        ) : (
          <p>Không có khóa học nào để đề xuất.</p>
        )}
      </div>
    </>
  )
}

export default RecommendCourse
