import { useQuery } from '@tanstack/react-query'
import { Image } from 'antd'

import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

import { CourseDetailSkeleton } from '../DetailCourse/CourseDetailSkeleton'
import { getCoursesAPI } from '../../../services/ApiService'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../ui/select'
import { Input } from '../../ui/input'
import { Button } from '../../ui/button'
import { Card, CardContent } from '../../ui/card'
import CustomPagination from '../../common/CustomPagination'

// interface Instructor {
//   firstName?: string
//   lastName?: string
// }

interface SortOption {
  label: string
  value: string
}

const AllCourses: React.FC = () => {
  const navigate = useNavigate()

  const [searchQuery, setSearchQuery] = useState<string>('')
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [pageSize] = useState<number>(1)
  const [selectedCategory, setSelectedCategory] = useState<string>('')
  const [status, setStatus] = useState<string>('')
  const [sort, setSort] = useState<string>('')

  const categories: string[] = ['All', 'Frontend', 'Backend', 'Fullstack', 'DevOps', 'AI & Machine Learning']
  const statuses: string[] = ['All', 'active', 'inactive']
  const sortOptions: SortOption[] = [
    { label: 'Mới nhất', value: '-createdAt' },
    { label: 'Cũ nhất', value: 'createdAt' },
    { label: 'Giá tăng dần', value: 'price' },
    { label: 'Giá giảm dần', value: '-price' }
  ]

  const {
    data: coursesData,
    isLoading,
    error
  } = useQuery({
    queryKey: ['getAllCourses', searchQuery, selectedCategory, status, currentPage] as const,
    queryFn: () =>
      getCoursesAPI({
        page: currentPage,
        pageSize,
        title: searchQuery || undefined,
        status: status !== 'All' ? status : undefined,
        category: selectedCategory !== 'All' ? selectedCategory : undefined,
        sort: sort || undefined
      })
  })

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
    setCurrentPage(1)
  }

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category)
    setCurrentPage(1)
  }

  const handleStatusChange = (value: string) => {
    setStatus(value)
    setCurrentPage(1)
  }

  // Xử lý thay đổi sắp xếp
  const handleSortChange = (value: string) => {
    setSort(value)
    setCurrentPage(1)
  }

  // Xử lý thay đổi trang
  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  if (isLoading)
    return (
      <p>
        <CourseDetailSkeleton />
      </p>
    )
  if (error) return <p>Error fetching courses: {error.message}</p>

  const courses: IAdminCourse[] = coursesData?.results || []
  console.log('🚀 ~ courses:', courses)
  const totalCourses: number = coursesData?.meta?.totalCourses || 0
  console.log('🚀 ~ totalCourses:', totalCourses)

  return (
    <div className='container mx-auto pt-[100px]'>
      {/* Thanh tìm kiếm và các bộ lọc */}
      <div className='mb-6'>
        <div className='flex flex-col sm:flex-row gap-4 justify-center'>
          <Input
            placeholder='Tìm kiếm khóa học...'
            value={searchQuery}
            onChange={handleSearchChange}
            className='max-w-md dark:bg-neutral-800 dark:text-white dark:border-gray-700'
          />

          {/* Bộ lọc trạng thái */}
          <Select onValueChange={handleStatusChange} value={status}>
            <SelectTrigger className='w-[180px] dark:bg-neutral-800 dark:text-white dark:border-gray-700'>
              <SelectValue placeholder='Trạng thái' />
            </SelectTrigger>
            <SelectContent>
              {statuses.map((statusOption) => (
                <SelectItem key={statusOption} value={statusOption}>
                  {statusOption === 'All' ? 'Tất cả trạng thái' : statusOption}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Sắp xếp */}
          <Select onValueChange={handleSortChange} value={sort}>
            <SelectTrigger className='w-[180px] dark:bg-neutral-800 dark:text-white dark:border-gray-700'>
              <SelectValue placeholder='Sắp xếp' />
            </SelectTrigger>
            <SelectContent>
              {sortOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className='flex gap-3 mb-6 flex-wrap justify-center'>
        {categories.map((category) => (
          <Button
            key={category}
            onClick={() => handleCategoryChange(category)}
            variant={selectedCategory === category ? 'default' : 'outline'}
            className='dark:bg-neutral-800 dark:text-white dark:border-gray-700'
          >
            {category}
          </Button>
        ))}
      </div>

      {courses.length > 0 ? (
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
          {courses.map((course) => (
            <Card
              key={course.id}
              onClick={() => navigate(`/course/${course.id}`)}
              className='cursor-pointer shadow-md bg-white dark:bg-neutral-900 dark:border dark:border-gray-700'
            >
              <CardContent className='p-4 text-gray-900 dark:text-white'>
                <Image
                  src={course.thumbnail || '/images/default-course.jpg'}
                  alt={course.title}
                  width='100%'
                  height={160}
                  className='rounded-lg object-cover'
                />
                <h3 className='text-lg font-semibold mt-3'>{course.title}</h3>
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
          ))}
        </div>
      ) : (
        <p className='text-center text-gray-500 dark:text-gray-400'>Không tìm thấy khóa học nào.</p>
      )}

      {totalCourses > 0 && (
        <div className='flex justify-center mt-8'>
          <CustomPagination
            currentPage={currentPage}
            pageSize={pageSize}
            total={totalCourses}
            onPageChange={handlePageChange}
          />
        </div>
      )}
    </div>
  )
}

export default AllCourses
