import { Button } from '@/components/ui/button'
import { CardContent, CardFooter } from '@/components/ui/card'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { registerAPI } from '@/services/ApiService'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { Eye, EyeOff } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'
interface FormSignUpProps {
  onRegisterSuccess?: () => void
}
const FormSignUp = ({ onRegisterSuccess }: FormSignUpProps) => {
  const [showPassword, setShowPassword] = useState(false)
  const signUpSchema = z.object({
    firstName: z.string(),
    lastName: z.string(),
    email: z.string(),
    password: z.string(),
    address: z.string(),
    phoneNumber: z.coerce.number()
  })

  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      address: '',
      phoneNumber: 0
    }
  })
  const mutation = useMutation({
    mutationFn: (data: IRegisterUserDTO) => registerAPI(data),
    onSuccess: async (data) => {
      console.log('Register success:', await data)
      toast('🎉 Đăng ký thành công!')
      form.reset()
      onRegisterSuccess?.()
    },
    onError: (error: any) => {
      toast('❌ Đăng ký thất bại!', {
        description: error?.response?.data?.message || 'Có lỗi xảy ra, vui lòng thử lại!'
      })
      console.error('Register error:', error)
    }
  })
  function onSubmit(values: z.infer<typeof signUpSchema>) {
    console.log('🚀 ~ onSubmit ~ values:', values)
    mutation.mutate(values)
    form.reset()
  }
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }
  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className=''>
          <CardContent className='space-y-2'>
            <div className='flex gap-[10px]'>
              <div className='space-y-1'>
                <FormField
                  control={form.control}
                  name='firstName'
                  render={({ field }) => (
                    <FormItem>
                      <Label htmlFor='firstName'>Họ</Label>
                      <FormControl>
                        <Input id='firstName' placeholder='Nhập họ' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className='space-y-1'>
                <FormField
                  control={form.control}
                  name='lastName'
                  render={({ field }) => (
                    <FormItem>
                      <Label htmlFor='lastName'>Tên</Label>
                      <FormControl>
                        <Input id='lastName' placeholder='Nhập tên' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div className='space-y-1'>
              <FormField
                control={form.control}
                name='email'
                render={({ field }) => (
                  <FormItem>
                    <Label htmlFor='email'>Địa Chỉ Email</Label>
                    <FormControl>
                      <Input id='email' placeholder='Nhập email' {...field} />
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
                    <Label htmlFor='password'>Mật Khẩu</Label>
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
            <div className='space-y-1'>
              <FormField
                control={form.control}
                name='address'
                render={({ field }) => (
                  <FormItem>
                    <Label htmlFor='address'>Địa Chỉ</Label>
                    <FormControl>
                      <Input id='address' placeholder='Nhập địa chỉ' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className='space-y-1'>
              <FormField
                control={form.control}
                name='phoneNumber'
                render={({ field }) => (
                  <FormItem>
                    <Label htmlFor='phoneNumber'>Số Điện Thoại</Label>
                    <FormControl>
                      <Input id='phoneNumber' placeholder='Nhập số điện thoại' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
          <CardFooter className='!p-3'>
            <Button type='submit' className='w-full'>
              Đăng Ký
            </Button>
          </CardFooter>
        </form>
      </Form>
    </>
  )
}

export default FormSignUp
