import { useQuery } from '@tanstack/react-query'
import { Image } from 'antd'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
// import { CourseDetailSkeleton } from '../DetailCourse/CourseDetailSkeleton'
import { getCoursesAPI } from '../../../services/ApiService'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../ui/select'
import { Input } from '../../ui/input'
import { Button } from '../../ui/button'
import { Card, CardContent } from '../../ui/card'
import CustomPagination from '../../common/CustomPagination'
import { Loader } from 'lucide-react'
import { Label } from '../../ui/label'

interface SortOption {
  label: string
  value: string
}

const AllCourses: React.FC = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const initialSearchQuery = searchParams.get('search') || ''
  const [searchQuery, setSearchQuery] = useState<string>(initialSearchQuery)
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [pageSize] = useState<number>(10)
  const [selectedCategory, setSelectedCategory] = useState<string>('')
  const [status, setStatus] = useState<string>('')
  const [sort, setSort] = useState<string>('')
  const [minPrice, setMinPrice] = useState<string>('')
  const [maxPrice, setMaxPrice] = useState<string>('')
  const [startDate, setStartDate] = useState<string>('')
  const [endDate, setEndDate] = useState<string>('')

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
    queryKey: [
      'getAllCourses',
      searchQuery,
      selectedCategory,
      status,
      minPrice,
      maxPrice,
      startDate,
      endDate,
      sort,
      currentPage
    ] as const,
    queryFn: () =>
      getCoursesAPI({
        page: currentPage,
        pageSize,
        title: searchQuery || undefined,
        status: status !== 'All' ? status : undefined,
        category: selectedCategory !== 'All' ? selectedCategory : undefined,
        minPrice: minPrice ? Number(minPrice) : undefined,
        maxPrice: maxPrice ? Number(maxPrice) : undefined,
        startDate: startDate || undefined,
        endDate: endDate || undefined,
        sort: sort || undefined
      })
  })
  useEffect(() => {
    const params = new URLSearchParams(searchParams)
    if (searchQuery) {
      params.set('search', searchQuery)
    } else {
      params.delete('search')
    }
    navigate(`?${params.toString()}`, { replace: true })
  }, [searchQuery, navigate, searchParams])
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

  const handleSortChange = (value: string) => {
    setSort(value)
    setCurrentPage(1)
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  // Reset all filters
  const handleResetFilters = () => {
    setSearchQuery('')
    setSelectedCategory('')
    setStatus('')
    setSort('')
    setMinPrice('')
    setMaxPrice('')
    setStartDate('')
    setEndDate('')
    setCurrentPage(1)
  }

  // if (isLoading) return <CourseDetailSkeleton />
  if (error) return <p>Error fetching courses: {error.message}</p>

  const courses: IAdminCourse[] = coursesData?.results || []
  const totalCourses: number = coursesData?.meta?.totalCourses || 0

  return (
    <div className='container mx-auto pt-[100px]'>
      <div className='mb-6'>
        {/* Prominent Search Bar */}
        <div className='mb-6'>
          <Input
            placeholder='Tìm kiếm khóa học...'
            value={searchQuery}
            onChange={handleSearchChange}
            className='w-full text-lg py-6 px-4 rounded-lg border-2 border-primary shadow-lg focus:ring-2 focus:ring-primary focus:border-primary dark:bg-neutral-800 dark:text-white dark:border-gray-700 dark:focus:ring-primary transition-all duration-300'
          />
        </div>

        {/* Filters */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
          <div>
            <Select onValueChange={handleStatusChange} value={status}>
              <SelectTrigger className='dark:bg-neutral-800 dark:text-white dark:border-gray-700'>
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
          </div>

          <div>
            <Select onValueChange={handleSortChange} value={sort}>
              <SelectTrigger className='dark:bg-neutral-800 dark:text-white dark:border-gray-700'>
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
          <div>
            <Input
              type='number'
              placeholder='Giá tối thiểu'
              value={minPrice}
              onChange={(e) => {
                setMinPrice(e.target.value)
                setCurrentPage(1)
              }}
              className='dark:bg-neutral-800 dark:text-white dark:border-gray-700'
            />
          </div>
          <div>
            <Input
              type='number'
              placeholder='Giá tối đa'
              value={maxPrice}
              onChange={(e) => {
                setMaxPrice(e.target.value)
                setCurrentPage(1)
              }}
              className='dark:bg-neutral-800 dark:text-white dark:border-gray-700'
            />
          </div>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 mt-4'>
          <div>
            <Label>Ngày bắt đầu</Label>
            <Input
              type='date'
              value={startDate}
              onChange={(e) => {
                setStartDate(e.target.value)
                setCurrentPage(1)
              }}
              className='dark:bg-neutral-800 dark:text-white dark:border-gray-700'
            />
          </div>
          <div>
            <Label>Ngày kết thúc</Label>
            <Input
              type='date'
              value={endDate}
              onChange={(e) => {
                setEndDate(e.target.value)
                setCurrentPage(1)
              }}
              className='dark:bg-neutral-800 dark:text-white dark:border-gray-700'
            />
          </div>
        </div>

        {/* Reset Filters Button */}
        <div className='mt-4 flex justify-end'>
          <Button
            onClick={handleResetFilters}
            variant='outline'
            className='border-red-500 text-red-500 hover:bg-red-50 dark:border-red-400 dark:text-red-400 dark:hover:bg-red-900/20'
          >
            Xóa tất cả bộ lọc
          </Button>
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

      {isLoading ? (
        <div className='flex justify-center'>
          <Loader className='w-8 h-8 animate-spin' />
        </div>
      ) : courses.length > 0 ? (
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
