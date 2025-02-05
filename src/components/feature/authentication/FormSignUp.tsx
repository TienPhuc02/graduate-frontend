import { Button } from '@/components/ui/button'
import { CardContent, CardFooter } from '@/components/ui/card'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
const FormSignUp = () => {
  const signInSchema = z.object({
    firstName: z.string().optional(),
    lastName: z.string().optional(),
    email: z.string().optional(),
    password: z.string().optional(),
    address: z.string().optional(),
    phoneNumber: z.number().optional()
  })
  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      address: ''
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
            <div className='flex gap-[10px]'>
              <div className='space-y-1'>
                <FormField
                  control={form.control}
                  name='firstName'
                  render={({ field }) => (
                    <FormItem>
                      <Label htmlFor='firstName'>First Name</Label>
                      <FormControl>
                        <Input id='firstName' placeholder='firstName' {...field} />
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
                      <Label htmlFor='lastName'>Last Name</Label>
                      <FormControl>
                        <Input id='lastName' placeholder='lastName' {...field} />
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
                    <Label htmlFor='email'>Email Address</Label>
                    <FormControl>
                      <Input id='email' placeholder='email' {...field} />
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
                      <Input id='password' placeholder='password' {...field} />
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
                    <Label htmlFor='address'>Address Location</Label>
                    <FormControl>
                      <Input id='address' placeholder='address' {...field} />
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
                    <Label htmlFor='phoneNumber'>Phone Number</Label>
                    <FormControl>
                      <Input id='phoneNumber' placeholder='phoneNumber' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button type='submit' className='w-full'>
              Sign Up
            </Button>
          </CardFooter>
        </form>
      </Form>
    </>
  )
}

export default FormSignUp
