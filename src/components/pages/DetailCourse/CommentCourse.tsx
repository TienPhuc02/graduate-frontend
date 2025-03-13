import {  useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Avatar } from 'antd'
import { formatDistanceToNow } from 'date-fns'
import { vi } from 'date-fns/locale'
import { Button } from '../../ui/button'
import { Form, FormControl, FormField, FormItem, FormMessage } from '../../ui/form'
import { Input } from '../../ui/input'
import useUserStore from '@/stores/userStore'
import { createCommentAPI } from '@/services/ApiService'
import { useFetchComment } from '@/hooks/useFetchComment'
import { useCommentStore } from '@/stores/useCommentStore'

interface CommentSectionProps {
  courseId: string
}

const commentSchema = z.object({
  content: z.string().min(1, 'Nội dung bình luận không được để trống')
})

type CommentFormValues = z.infer<typeof commentSchema>

export const CommentCourse = ({ courseId }: CommentSectionProps) => {
  const { user } = useUserStore()
  const { refetch } = useFetchComment(courseId)
  const { comments } = useCommentStore()
  const [replyingCommentId, setReplyingCommentId] = useState<string | null>(null)

  const form = useForm<CommentFormValues>({
    resolver: zodResolver(commentSchema),
    defaultValues: { content: '' }
  })

  const replyForm = useForm<CommentFormValues>({
    resolver: zodResolver(commentSchema),
    defaultValues: { content: '' }
  })

  const createCommentMutation = useMutation({
    mutationFn: (data: { userId: string; courseId: string; text: string; parentCommentId?: string }) =>
      createCommentAPI(data),
    onSuccess: () => {
      refetch()
      form.reset()
      replyForm.reset()
      setReplyingCommentId(null)
    }
  })

  const onSubmitComment = (values: CommentFormValues) => {
    if (user) {
      createCommentMutation.mutate({
        userId: user.id!,
        courseId,
        text: values.content
      })
    }
  }

  const onSubmitReply = (values: CommentFormValues, parentId: string) => {
    if (user) {
      createCommentMutation.mutate({
        userId: user.id!,
        courseId,
        text: values.content,
        parentCommentId: parentId
      })
    }
  }

  return (
    <div>
      <h2 className='text-2xl font-semibold mb-4 mt-5'>Bình luận</h2>

      {/* Form nhập bình luận luôn hiển thị */}
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
          <Button type='submit' className='mt-2' disabled={createCommentMutation.isPending}>
            Gửi bình luận
          </Button>
        </form>
      </Form>

      {/* Kiểm tra nếu có bình luận thì hiển thị danh sách */}
      {comments.length > 0 ? (
        comments.map((comment) => (
          <div key={comment.id} className='mt-4 border-l-2 pl-4'>
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
                <p className='mt-1' dangerouslySetInnerHTML={{ __html: comment.text }} />
                <Button
                  variant='link'
                  className='p-0 h-auto text-sm text-blue-500'
                  onClick={() => setReplyingCommentId(comment.id)}
                >
                  Trả lời
                </Button>

                {replyingCommentId === comment.id && (
                  <Form {...replyForm}>
                    <form
                      onSubmit={replyForm.handleSubmit((values) => onSubmitReply(values, comment.id))}
                      className='mt-2'
                    >
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
                        <Button type='submit' disabled={createCommentMutation.isPending}>
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
          </div>
        ))
      ) : (
        <p>Chưa có bình luận nào. Hãy là người đầu tiên bình luận!</p>
      )}
    </div>
  )
}
