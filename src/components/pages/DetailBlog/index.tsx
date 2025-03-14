import { useQuery } from '@tanstack/react-query'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
// import DOMPurify from 'dompurify'
// import parse from 'html-react-parser'
import { Skeleton } from '@/components/ui/skeleton'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { format } from 'date-fns'
import { getBlogByIdAPI } from '@/services/ApiService'

const DetailBlog = ({ blogId }: { blogId: string }) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['blog', blogId],
    queryFn: () => getBlogByIdAPI(blogId!),
    enabled: !!blogId
  })
  console.log('🚀 ~ DetailBlog ~ data:', data)

  if (isLoading) {
    return (
      <div className='container mx-auto py-10'>
        <Skeleton className='h-10 w-3/4 mb-4' />
        <Skeleton className='h-6 w-1/2 mb-2' />
        <Skeleton className='h-96 w-full' />
      </div>
    )
  }

  if (error) {
    return <div className='text-red-500 text-center py-10'>Lỗi khi tải dữ liệu bài viết</div>
  }

  const blog = data
  console.log('🚀 ~ DetailBlog ~ blog:', blog)
  //   const sanitizedContent = blog?.content ? DOMPurify.sanitize(blog.content) : 'Không có nội dung'
  return (
    <div className='container mx-auto py-10'>
      <Card className='max-w-3xl mx-auto shadow-md'>
        <CardHeader>
          <CardTitle className='text-2xl font-bold'>{blog?.title}</CardTitle>
          <div className='flex items-center gap-4 mt-2 object-cover'>
            <Avatar>
              <AvatarImage src={blog?.author?.profilePicture || '/default-avatar.png'} />
              <AvatarFallback>
                {blog?.author?.firstName} {blog?.author?.lastName}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className='font-semibold'>
                {' '}
                {blog?.author?.firstName} {blog?.author?.lastName}
              </p>
              <p className='text-sm text-gray-500'>{format(new Date(blog?.createdAt!), 'dd/MM/yyyy')}</p>
            </div>
          </div>
          <Badge variant='secondary' className='mt-3'>
            {blog?.categoryBlog}
          </Badge>
        </CardHeader>
        <CardContent>
          {blog?.thumbnail && (
            <img src={blog.thumbnail} alt='Thumbnail' className='w-full h-60 object-cover rounded-md mb-4' />
          )}
          {/* <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(blog?.content!) }} /> */}
          {/* <div className='prose max-w-none' dangerouslySetInnerHTML={{ __html: blog?.content }} /> */}
          {/* <div className='prose max-w-none' dangerouslySetInnerHTML={{ __html: sanitizedContent }} /> */}
        </CardContent>
      </Card>
      {blog && blog.content && (
        <div className='prose dark:prose-invert max-w-3xl mx-auto p-4'>
          <div dangerouslySetInnerHTML={{ __html: blog?.content }} />
        </div>
      )}
    </div>
  )
}

export default DetailBlog
