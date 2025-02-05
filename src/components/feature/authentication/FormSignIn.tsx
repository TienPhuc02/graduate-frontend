import { Button } from '@/components/ui/button'
import { CardContent, CardFooter } from '@/components/ui/card'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Divider } from 'antd'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { GithubOutlined, GoogleOutlined } from '@ant-design/icons'
const FormSignIn = () => {
  const signInSchema = z.object({
    username: z.string().min(2).max(50),
    password: z.string().min(2).max(50)
  })
  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      username: '',
      password: ''
    }
  })
  function onSubmit(values: z.infer<typeof signInSchema>) {
    console.log(values)
    form.reset()
  }
  const handleGoogleSignIn = () => {
    window.location.href = 'http://localhost:8000/auth/google'
  }
  const handleGithubSignIn = () => {
    window.location.href = 'http://localhost:8000/auth/github'
  }
  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className=''>
          <CardContent className='space-y-2'>
            <div className='space-y-1'>
              <FormField
                control={form.control}
                name='username'
                render={({ field }) => (
                  <FormItem>
                    <Label htmlFor='username'>Username</Label>
                    <FormControl>
                      <Input id='username' placeholder='@peduarte' {...field} />
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
                    <Label htmlFor='password'>Password</Label>
                    <FormControl>
                      <Input id='password' placeholder='@peduarte' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
          <div className='flex justify-end underline pr-6 text-[14px] text-[#71717a] mb-[10px] cursor-pointer'>
            Forgot password?
          </div>
          <CardFooter>
            <Button type='submit' className='w-full'>
              Sign In
            </Button>
          </CardFooter>
        </form>
      </Form>
      <Divider plain className='!my-0'>
        Or
      </Divider>
      <div className='flex flex-col gap-4 items-center justify-center w-full'>
        <Button variant='outline' className='w-full' onClick={handleGoogleSignIn}>
          <GoogleOutlined />
          <p className='font-normal'>Sign in with Google</p>
        </Button>
        <Button variant='outline' className='w-full' onClick={handleGithubSignIn}>
          <GithubOutlined />
          <p className='font-normal'>Sign in with Github</p>
        </Button>
      </div>
    </>
  )
}

export default FormSignIn
