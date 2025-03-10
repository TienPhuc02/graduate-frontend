import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'
import { useNavigate } from 'react-router-dom'
import { updatePasswordAPI } from '@/services/ApiService'
function ResetForgotPassword() {
  const navigate = useNavigate()
  const resetForgotPasswordSchema = z.object({
    currentPassword: z.string().min(2).max(50),
    newPassword: z.string().min(2).max(50),
    confirmPassword: z.string().min(2).max(50)
  })
  const mutation = useMutation({
    mutationFn: (data: { currentPassword: string; newPassword: string; confirmPassword: string }) =>
      updatePasswordAPI(data),
    onSuccess: () => {
      toast('🎉 Cập nhật mật khẩu thành công!')
      form.reset()
      navigate('/authentication')
    },
    onError: (error: any) => {
      toast('❌ Cập nhật mật khẩu thất bại!', {
        description: error?.response?.data?.message || 'Có lỗi xảy ra, vui lòng thử lại!'
      })
    }
  })
  const form = useForm<z.infer<typeof resetForgotPasswordSchema>>({
    resolver: zodResolver(resetForgotPasswordSchema),
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    }
  })
  function onSubmit(values: { currentPassword: string; newPassword: string; confirmPassword: string }) {
    mutation.mutate(values)
    form.reset()
  }

  return (
    <div className='min-h-screen flex items-center justify-center'>
      <div className='w-full max-w-md p-8 space-y-6  rounded-lg shadow-md'>
        <div className='text-center'>
          <h1 className='text-2xl font-bold '>Quên mật khẩu</h1>
          <p className='mt-2 text-sm '>Nhập địa chỉ email của bạn để thiết lập lại mật khẩu của bạn.</p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-2'>
            <FormField
              control={form.control}
              name='currentPassword'
              render={({ field }) => (
                <FormItem>
                  <Label htmlFor='currentPassword'>Mật khẩu hiện tại</Label>
                  <FormControl>
                    <Input id='currentPassword' placeholder='example@gmail.com' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='newPassword'
              render={({ field }) => (
                <FormItem>
                  <Label htmlFor='newPassword'>Mật khẩu mới</Label>
                  <FormControl>
                    <Input id='newPassword' placeholder='example@gmail.com' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='confirmPassword'
              render={({ field }) => (
                <FormItem>
                  <Label htmlFor='confirmPassword'>Nhập lại mật khẩu</Label>
                  <FormControl>
                    <Input id='confirmPassword' placeholder='example@gmail.com' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type='submit' className='w-full' disabled={mutation.isPending}>
              {mutation.isPending ? 'Đang gửi...' : 'Gửi liên kết đặt lại'}
            </Button>
          </form>
        </Form>
        <div className='text-center'>
          <div className='text-sm cursor-pointer'>Quay lại Đăng nhập</div>
        </div>
      </div>
    </div>
  )
}

export default ResetForgotPassword
