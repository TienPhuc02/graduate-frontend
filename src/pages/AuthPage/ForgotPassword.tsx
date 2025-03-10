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
import { forgotPasswordAPI } from '@/services/ApiService'
function ForgotPassword() {
  const navigate = useNavigate()
  const forgotPasswordSchema = z.object({
    email: z.string().min(2).max(50)
  })
  const mutation = useMutation({
    mutationFn: ({ email }: { email: string }) => forgotPasswordAPI({ email }),
    onSuccess: (data) => {
      toast('🎉 gửi link liên kết thành công!')
      console.log('🚀 ~ onSuccess: ~ data:', data)
      form.reset()
      navigate('/authentication/reset-forgotPassword')
    },
    onError: (error: any) => {
      toast('❌ Gửi liên kết thất bại!', {
        description: error?.response?.data?.message || 'Có lỗi xảy ra, vui lòng thử lại!'
      })
    }
  })
  const form = useForm<z.infer<typeof forgotPasswordSchema>>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: ''
    }
  })
  function onSubmit(values: { email: string }) {
    console.log('🚀 ~ onSubmit ~ values:', values)
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
              name='email'
              render={({ field }) => (
                <FormItem>
                  <Label htmlFor='email'>Địa chỉ Email</Label>
                  <FormControl>
                    <Input id='email' placeholder='example@gmail.com' {...field} />
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

export default ForgotPassword
