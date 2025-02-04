import LogoIcon from '@/components/common/LogoIcon'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import FormSignIn from '@/components/features/Auth/FormSignIn'
import FormSignUp from '@/components/features/Auth/FormSignUp'
import HeaderAuthPage from '@/components/layout/HeaderAuthPage'

const AuthenticationPage = () => {
  return (
    <>
      <HeaderAuthPage />
      <div className='bg-[#F4F4F5] min-h-[calc(100vh-40px)] pt-[10px] dark:bg-[#27272A]'>
        <Card className='max-w-[500px] mx-auto'>
          <CardHeader>
            <LogoIcon />
            <CardTitle className='text-[30px]'>Getting Started</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue='sign-in' className='max-w-[400px] mx-auto'>
              <TabsList className='grid w-full grid-cols-2 '>
                <TabsTrigger value='sign-in'>Sign In</TabsTrigger>
                <TabsTrigger value='sign-up'>Create account</TabsTrigger>
              </TabsList>
              <TabsContent value='sign-in'>
                <Card>
                  <CardHeader>
                    <CardDescription>
                      Access your account quickly and securely. Sign in to continue where you left off and explore all
                      your features.
                    </CardDescription>
                  </CardHeader>
                  <FormSignIn />
                </Card>
              </TabsContent>
              <TabsContent value='sign-up'>
                <Card>
                  <CardHeader>
                    <CardDescription>
                      Welcome back! Please log in to access your account and enjoy seamless, secure access to all your
                      features.
                    </CardDescription>
                  </CardHeader>
                  <FormSignUp />
                </Card>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </>
  )
}

export default AuthenticationPage
