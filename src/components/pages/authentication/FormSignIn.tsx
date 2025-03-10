import { Button } from '@/components/ui/button'
import { CardContent, CardFooter } from '@/components/ui/card'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Divider } from 'antd'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { GithubOutlined } from '@ant-design/icons'
import { Eye, EyeOff } from 'lucide-react'
import GoogleIcon from '@/components/common/icons/GoogleIcon'
import { useState } from 'react'
import { loginAPI } from '@/services/ApiService'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'
import { Link, useNavigate } from 'react-router-dom'

const FormSignIn = () => {
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate()
  const signInSchema = z.object({
    email: z.string().min(2).max(50),
    password: z.string().min(2).max(50)
  })

  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  })

  const handleGoogleSignIn = () => {
    window.location.href = `${import.meta.env.VITE_AUTH_GOOGLE}`
  }

  const handleGithubSignIn = () => {
    window.location.href = `${import.meta.env.VITE_AUTH_GITHUB}`
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }
  const mutation = useMutation({
    mutationFn: async ({ email, password }: { email: string; password: string }) => {
      return await loginAPI(email, password)
    },
    onSuccess: async (data) => {

      if (data?.data?.accessToken) {
        toast('🎉 Đăng nhập thành công!')
        form.reset()
        navigate('/')
        localStorage.setItem('access_token', data.data.accessToken)
      } else {
        toast('❌ Đăng nhập thất bại!', {
          description: 'Phản hồi từ server không hợp lệ!'
        })
      }
    },
    onError: (error: any) => {
      toast('❌ Đăng nhập thất bại!', {
        description: error?.response?.data?.message || 'Có lỗi xảy ra, vui lòng thử lại!'
      })
    }
  })

  function onSubmit(values: { email: string; password: string }) {
    mutation.mutate(values)
    form.reset()
  }
  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className=''>
          <CardContent className='space-y-2'>
            <div className='space-y-1'>
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
            </div>
            <div className='space-y-1'>
              <FormField
                control={form.control}
                name='password'
                render={({ field }) => (
                  <FormItem>
                    <Label htmlFor='password'>Mật khẩu</Label>
                    <FormControl>
                      <div className='relative'>
                        <Input
                          id='password'
                          type={showPassword ? 'text' : 'password'}
                          placeholder='Nhập mật khẩu'
                          {...field}
                        />
                        <button
                          type='button'
                          onClick={togglePasswordVisibility}
                          className='absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5'
                        >
                          {showPassword ? (
                            <EyeOff className='h-4 w-4 text-gray-500' />
                          ) : (
                            <Eye className='h-4 w-4 text-gray-500' />
                          )}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
          <Link to='forgot-password'>
            <div className='flex justify-end underline pr-6 text-[14px] text-[#71717a] mb-[10px] cursor-pointer'>
              Quên mật khẩu?
            </div>
          </Link>
          <CardFooter className='!p-3'>
            <Button type='submit' className='w-full' disabled={mutation.isPending}>
              {mutation.isPending ? 'Đang đăng nhập...' : 'Đăng Nhập'}
            </Button>
          </CardFooter>
        </form>
      </Form>
      <Divider plain className='!my-0'>
        Or
      </Divider>
      <div className='flex flex-col gap-4 items-center justify-center w-full'>
        <Button variant='outline' className='w-full' onClick={handleGoogleSignIn}>
          <GoogleIcon />
          <p className='font-normal'>Đăng nhập với Google</p>
        </Button>
        <Button variant='outline' className='w-full' onClick={handleGithubSignIn}>
          <GithubOutlined />
          <p className='font-normal'>Đăng nhập với Github</p>
        </Button>
      </div>
    </>
  )
}

export default FormSignIn
