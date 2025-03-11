import { Avatar, Rate } from 'antd'

import { CourseDetailSkeleton } from './CourseDetailSkeleton'

import { useQuery, useMutation } from '@tanstack/react-query'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { useState } from 'react'
import { formatDistanceToNow } from 'date-fns'
import { vi } from 'date-fns/locale'
import { createCommentAPI, getCourseByIdAPI } from '../../../services/ApiService'
import { Button } from '../../ui/button'
import { Form, FormControl, FormField, FormItem, FormMessage } from '../../ui/form'
import { Input } from '../../ui/input'
import { Badge } from '../../ui/badge'
import { Card, CardContent, CardHeader } from '../../ui/card'
import { Separator } from '../../ui/separator'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../../ui/accordion'

interface CourseDetailProps {
  courseId: string
}
// interface Comment {
//   id: string
//   content: string
//   user: { id: string; firstName: string; lastName: string; profilePicture?: string }
//   createdAt: string
//   replies: Comment[]
//   parent?: Comment | null
//   isDeleted: boolean
//   status: 'pending' | 'approved' | 'rejected'
// }
// Schema validation cho form bình luận
const commentSchema = z.object({
  content: z.string().min(1, 'Nội dung bình luận không được để trống')
})

type CommentFormValues = z.infer<typeof commentSchema>

export const CourseDetail = ({ courseId }: CourseDetailProps) => {
  const {
    data: courseResponse,
    isLoading,
    error,
    refetch
  } = useQuery({
    queryKey: ['course', courseId],
    queryFn: () => getCourseByIdAPI(courseId)
  })
  console.log('🚀 ~ CourseDetail ~ courseResponse:', courseResponse)

  // Giả định userId của người dùng hiện tại (lấy từ context hoặc state)
  const userId = 'current-user-id' // Thay bằng logic lấy userId thực tế

  // Form để tạo bình luận mới
  const form = useForm<CommentFormValues>({
    resolver: zodResolver(commentSchema),
    defaultValues: { content: '' }
  })

  // Form để trả lời bình luận
  const [replyingCommentId, setReplyingCommentId] = useState<string | null>(null)
  const replyForm = useForm<CommentFormValues>({
    resolver: zodResolver(commentSchema),
    defaultValues: { content: '' }
  })

  // Hàm ánh xạ dữ liệu từ IAdminComment sang Comment
  const mapToComment = (data: IAdminComment): IComment => ({
    id: data.id,
    content: data.text,
    user: {
      id: userId, // Giả định tạm thời, cần API lấy thông tin user nếu có
      firstName: 'Người dùng', // Giả định tạm thời
      lastName: '', // Giả định tạm thời
      profilePicture: undefined // Giả định tạm thời
    },
    createdAt: data.createdAt,
    replies: [], // Sẽ được xây dựng lại trong buildCommentTree
    parent: null, // Sẽ được xây dựng lại trong buildCommentTree
    isDeleted: data.isDeleted,
    status: data.status
  })

  // Hàm xây dựng cấu trúc cây từ danh sách bình luận phẳng
  const buildCommentTree = (comments: IAdminComment[]): IComment[] => {
    const commentMap: { [key: string]: IComment } = {}
    const tree: IComment[] = []

    // Ánh xạ tất cả bình luận thành dạng Comment và lưu vào map
    comments.forEach((comment) => {
      commentMap[comment.id] = mapToComment(comment)
    })

    // Xây dựng cấu trúc cây
    comments.forEach((comment) => {
      if (comment.parentCommentId) {
        const parent = commentMap[comment.parentCommentId]
        if (parent) {
          parent.replies.push(commentMap[comment.id])
          commentMap[comment.id].parent = parent
        }
      } else {
        tree.push(commentMap[comment.id])
      }
    })

    return tree
  }

  // Mutation để tạo bình luận mới
  const createCommentMutation = useMutation({
    mutationFn: ({
      userId,
      courseId,
      text,
      parentCommentId
    }: {
      userId: string
      courseId?: string
      text: string
      parentCommentId?: string
    }) => createCommentAPI({ userId, courseId, text, parentCommentId }),
    onSuccess: () => {
      // Làm mới dữ liệu khóa học để lấy danh sách bình luận mới
      refetch()
      form.reset()
      replyForm.reset()
      setReplyingCommentId(null)
    },
    onError: (error) => {
      console.error('Error creating comment:', error)
    }
  })

  const onSubmitComment = (values: CommentFormValues) => {
    createCommentMutation.mutate({
      userId,
      courseId,
      text: values.content
    })
  }

  const onSubmitReply = (values: CommentFormValues, parentId: string) => {
    createCommentMutation.mutate({
      userId,
      courseId,
      text: values.content,
      parentCommentId: parentId
    })
  }

  if (isLoading) return <CourseDetailSkeleton />
  if (error) return <div>Error fetching course: {error.message}</div>
  if (!courseResponse) return <div>Course not found</div>

  const course: IAdminCourse = courseResponse

  // Xây dựng cấu trúc cây từ danh sách bình luận
  const commentTree = buildCommentTree(course.comments)

  // Lọc các bình luận không bị xóa và có trạng thái approved
  const visibleComments = commentTree.filter((comment) => !comment.isDeleted && comment.status === 'approved')

  const renderComments = (comments: IComment[], level = 0) => {
    return comments.map((comment) => (
      <div key={comment.id} className={`ml-${level * 4} mt-4 border-l-2 pl-4`}>
        <div className='flex items-start gap-3'>
          <Avatar src={comment.user?.profilePicture} alt={comment.user?.firstName} />
          <div className='flex-1'>
            <div className='flex items-center gap-2'>
              <span className='font-semibold'>
                {comment.user?.firstName} {comment.user?.lastName}
              </span>
              <span className='text-sm text-muted-foreground'>
                {formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true, locale: vi })}
              </span>
            </div>
            <p className='mt-1' dangerouslySetInnerHTML={{ __html: comment.content }} />
            <Button
              variant='link'
              className='p-0 h-auto text-sm text-blue-500'
              onClick={() => setReplyingCommentId(comment.id)}
            >
              Trả lời
            </Button>

            {/* Form trả lời bình luận */}
            {replyingCommentId === comment.id && (
              <Form {...replyForm}>
                <form onSubmit={replyForm.handleSubmit((values) => onSubmitReply(values, comment.id))} className='mt-2'>
                  <FormField
                    control={replyForm.control}
                    name='content'
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            placeholder='Viết câu trả lời...'
                            {...field}
                            className='dark:bg-neutral-800 dark:text-white dark:border-gray-700'
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className='mt-2 flex gap-2'>
                    <Button type='submit' size='sm'>
                      Gửi
                    </Button>
                    <Button type='button' variant='outline' size='sm' onClick={() => setReplyingCommentId(null)}>
                      Hủy
                    </Button>
                  </div>
                </form>
              </Form>
            )}
          </div>
        </div>

        {/* Hiển thị các bình luận con (replies) */}
        {comment.replies && comment.replies.length > 0 && (
          <div className='mt-4'>
            {renderComments(
              comment.replies.filter((reply) => !reply.isDeleted && reply.status === 'approved'),
              level + 1
            )}
          </div>
        )}
      </div>
    ))
  }

  return (
    <div className='container mx-auto py-8'>
      {/* Phần thông tin khóa học */}
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
        <div className='my-8'>
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

      {/* <Separator className='my-8' /> */}

      {/* Phần bình luận */}
      <div>
        <h2 className='text-2xl font-semibold mb-4'>Bình luận</h2>

        {/* Form để tạo bình luận mới */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmitComment)} className='mb-6'>
            <FormField
              control={form.control}
              name='content'
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder='Viết bình luận của bạn...'
                      {...field}
                      className='dark:bg-neutral-800 dark:text-white dark:border-gray-700'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type='submit' className='mt-2'>
              Gửi bình luận
            </Button>
          </form>
        </Form>

        {/* Hiển thị danh sách bình luận */}
        {visibleComments.length > 0 ? (
          renderComments(visibleComments)
        ) : (
          <p>Chưa có bình luận nào. Hãy là người đầu tiên bình luận!</p>
        )}
      </div>
    </div>
  )
}
