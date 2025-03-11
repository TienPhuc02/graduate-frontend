// components/course/CommentSection.tsx
import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Avatar } from 'antd'
import { formatDistanceToNow } from 'date-fns'
import { vi } from 'date-fns/locale'
import { Button } from '../../ui/button'
import { Form, FormControl, FormField, FormItem, FormMessage } from '../../ui/form'
import { Input } from '../../ui/input'
import { createCommentAPI } from '../../../services/ApiService'

interface CommentSectionProps {
  courseId: string
  comments: IAdminComment[]
}

const commentSchema = z.object({
  content: z.string().min(1, 'Nội dung bình luận không được để trống')
})

type CommentFormValues = z.infer<typeof commentSchema>

export const CommentCourse = ({ courseId, comments }: CommentSectionProps) => {
  const queryClient = useQueryClient()
  const userId = 'current-user-id'
  const [replyingCommentId, setReplyingCommentId] = useState<string | null>(null)
  const form = useForm<CommentFormValues>({
    resolver: zodResolver(commentSchema),
    defaultValues: { content: '' }
  })

  const replyForm = useForm<CommentFormValues>({
    resolver: zodResolver(commentSchema),
    defaultValues: { content: '' }
  })

  const mapToComment = (data: IAdminComment): IComment => ({
    id: data.id,
    content: data.text,
    user: {
      id: userId,
      firstName: 'Người dùng',
      lastName: '',
      profilePicture: undefined
    },
    createdAt: data.createdAt,
    replies: [],
    parent: null,
    isDeleted: data.isDeleted,
    status: data.status
  })

  const buildCommentTree = (comments: IAdminComment[]): IComment[] => {
    const commentMap: { [key: string]: IComment } = {}
    const tree: IComment[] = []

    comments.forEach((comment) => {
      commentMap[comment.id] = mapToComment(comment)
    })

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
      queryClient.invalidateQueries({ queryKey: ['course', courseId] })
      form.reset()
      replyForm.reset()
      setReplyingCommentId(null)
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

  const commentTree = buildCommentTree(comments)
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
    <div>
      <h2 className='text-2xl font-semibold mb-4 mt-5'>Bình luận</h2>

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

      {visibleComments.length > 0 ? (
        renderComments(visibleComments)
      ) : (
        <p>Chưa có bình luận nào. Hãy là người đầu tiên bình luận!</p>
      )}
    </div>
  )
}
