import { Button } from '@/components/ui/button'
import { CardContent, CardFooter } from '@/components/ui/card'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
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
          <div className='flex justify-end underline pr-6 text-[14px] text-[#71717a] mb-[10px]'>Forgot password?</div>
          <CardFooter>
            <Button type='submit' className='w-full'>
              Sign In
            </Button>
          </CardFooter>
        </form>
      </Form>
    </>
  )
}

export default FormSignIn
