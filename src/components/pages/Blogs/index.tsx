import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useQuery } from '@tanstack/react-query'
import { Image, Pagination } from 'antd'
import { getBlogsAPI } from '@/services/ApiService'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import CustomPagination from '@/components/common/CustomPagination'
import { ECourseCategory, EBlogStatus } from '@/types/enum'

interface Author {
  firstName?: string
  lastName?: string
}

interface Blog {
  id: string
  title: string
  thumbnail?: string
  author?: Author
  viewsBlog?: number
  categoryBlog?: ECourseCategory
  isPublished?: EBlogStatus
  createdAt?: string
}

interface SortOption {
  label: string
  value: string
}

const AllBlogs: React.FC = () => {
  const navigate = useNavigate()

  const [searchQuery, setSearchQuery] = useState<string>('')
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [pageSize] = useState<number>(10)
  const [selectedCategory, setSelectedCategory] = useState<string>('')
  const [status, setStatus] = useState<string>('')
  const [sort, setSort] = useState<string>('')

  const categories: string[] = ['All', ...Object.values(ECourseCategory)]
  const statuses: string[] = ['All', ...Object.values(EBlogStatus)]
  const sortOptions: SortOption[] = [
    { label: 'Mới nhất', value: '-createdAt' },
    { label: 'Cũ nhất', value: 'createdAt' },
    { label: 'Lượt xem tăng dần', value: 'viewsBlog' },
    { label: 'Lượt xem giảm dần', value: '-viewsBlog' }
  ]

  const {
    data: blogsData,
    isLoading,
    error
  } = useQuery({
    queryKey: ['getAllBlogs', searchQuery, selectedCategory, status, currentPage] as const,
    queryFn: () =>
      getBlogsAPI({
        page: currentPage,
        pageSize,
        title: searchQuery || undefined,
        isPublished: status !== 'All' ? status : undefined,
        categoryBlog: selectedCategory !== 'All' ? selectedCategory : undefined,
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

  const handleSortChange = (value: string) => {
    setSort(value)
    setCurrentPage(1)
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  if (isLoading) return <p>Loading...</p>
  if (error) return <p>Error fetching blogs: {error.message}</p>

  const blogs: IAdminBlog[] = blogsData?.results || []
  const totalBlogs: number = blogsData?.meta?.totalBlogs || 0

  return (
    <div className='container mx-auto pt-[100px]'>
      <div className='mb-6'>
        <div className='flex flex-col sm:flex-row gap-4 justify-center'>
          <Input
            placeholder='Tìm kiếm bài viết...'
            value={searchQuery}
            onChange={handleSearchChange}
            className='max-w-md dark:bg-neutral-800 dark:text-white dark:border-gray-700'
          />

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

      {blogs.length > 0 ? (
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
          {blogs.map((blog) => (
            <Card
              key={blog.id}
              onClick={() => navigate(`/blog/${blog.id}`)}
              className='cursor-pointer shadow-md bg-white dark:bg-neutral-900 dark:border dark:border-gray-700'
            >
              <CardContent className='p-4 text-gray-900 dark:text-white'>
                <Image
                  src={blog.thumbnail || '/images/default-blog.jpg'}
                  alt={blog.title}
                  width='100%'
                  height={160}
                  className='rounded-lg object-cover'
                />
                <h3 className='text-lg font-semibold mt-3'>{blog.title}</h3>
                <p className='text-sm text-gray-500 dark:text-gray-400'>
                  Tác giả: {blog?.author?.firstName || 'N/A'} {blog.author?.lastName || 'N/A'}
                </p>
                <p className='text-sm text-gray-600 dark:text-gray-300 mt-1'>Lượt xem: {blog.viewsBlog || 0}</p>
                <p className='text-sm text-gray-600 dark:text-gray-300'>
                  Danh mục: {blog.categoryBlog || 'Chưa xác định'}
                </p>
                <p className='text-sm text-gray-600 dark:text-gray-300'>
                  Trạng thái: {blog.isPublished || 'Chưa xác định'}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <p className='text-center text-gray-500 dark:text-gray-400'>Không tìm thấy bài viết nào.</p>
      )}

      {totalBlogs > 0 && (
        <div className='flex justify-center mt-8'>
          <CustomPagination
            currentPage={currentPage}
            pageSize={pageSize}
            total={totalBlogs}
            onPageChange={handlePageChange}
          />
        </div>
      )}
    </div>
  )
}

export default AllBlogs
