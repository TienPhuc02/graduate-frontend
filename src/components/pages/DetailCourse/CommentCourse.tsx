import { useState } from 'react'
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

const buildCommentTree = (comments: any[]) => {
  const sortedComments = [...comments].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())

  const map: { [key: string]: any } = {}
  const tree: any[] = []

  sortedComments.forEach((comment) => {
    map[comment.id] = { ...comment, children: [] }
  })

  sortedComments.forEach((comment) => {
    if (comment.parentCommentId) {
      map[comment.parentCommentId].children.push(map[comment.id])
      map[comment.parentCommentId].children.sort(
        (a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      )
    } else {
      tree.push(map[comment.id])
    }
  })

  return tree
}

const CommentItem = ({
  comment,
  level = 0,
  replyingCommentId,
  setReplyingCommentId,
  replyForm,
  onSubmitReply,
  createCommentMutation
}: {
  comment: any
  level?: number
  replyingCommentId: string | null
  setReplyingCommentId: (id: string | null) => void
  replyForm: any
  onSubmitReply: (values: CommentFormValues, parentId: string) => void
  createCommentMutation: any
}) => {
  return (
    <div
      key={comment.id}
      className={`mt-4 border-l-2 pl-4 ${level > 0 ? `ml-${level * 8} border-neutral-500` : 'border-neutral-700'}`}
    >
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
                onSubmit={replyForm.handleSubmit((values: CommentFormValues) => onSubmitReply(values, comment.id))}
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

      {/* Render comment con đệ quy */}
      {comment.children && comment.children.length > 0 && (
        <div>
          {comment.children.map((child: any) => (
            <CommentItem
              key={child.id}
              comment={child}
              level={level + 1}
              replyingCommentId={replyingCommentId}
              setReplyingCommentId={setReplyingCommentId}
              replyForm={replyForm}
              onSubmitReply={onSubmitReply}
              createCommentMutation={createCommentMutation}
            />
          ))}
        </div>
      )}
    </div>
  )
}

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

  // Tạo cấu trúc cây từ comments
  const commentTree = buildCommentTree(comments)

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

      {/* Hiển thị danh sách comment theo cấu trúc cây */}
      {commentTree.length > 0 ? (
        commentTree.map((comment) => (
          <CommentItem
            key={comment.id}
            comment={comment}
            replyingCommentId={replyingCommentId}
            setReplyingCommentId={setReplyingCommentId}
            replyForm={replyForm}
            onSubmitReply={onSubmitReply}
            createCommentMutation={createCommentMutation}
          />
        ))
      ) : (
        <p>Chưa có bình luận nào. Hãy là người đầu tiên bình luận!</p>
      )}
    </div>
  )
}
