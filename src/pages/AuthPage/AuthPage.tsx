import LogoIcon from '../../components/common/icons/LogoIcon'
import { Card, CardContent, CardDescription, CardHeader } from '../../components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs'
import FormSignIn from '../../components/pages/AuthPage/FormSignIn'
import FormSignUp from '../../components/pages/AuthPage/FormSignUp'
import { Link } from 'react-router-dom'
import { useState } from 'react'

const AuthPage = () => {
  const [activeTab, setActiveTab] = useState('sign-in')
  return (
    <div className='bg-[#F4F4F5] min-h-[calc(100vh-40px)] pt-[10px] dark:bg-[#27272A]'>
      <Card className='max-w-[500px] mx-auto shadow-md'>
        <CardHeader>
          <Link to='/'>
            <LogoIcon className='w-6 h-6 cursor-pointer' />
          </Link>
        </CardHeader>
        <CardContent>
          <Tabs
            defaultValue={activeTab}
            onValueChange={setActiveTab}
            value={activeTab}
            className='max-w-[400px] mx-auto'
          >
            <TabsList className='grid w-full grid-cols-2 '>
              <TabsTrigger value='sign-in'>Đăng Nhập</TabsTrigger>
              <TabsTrigger value='sign-up'>Tạo Tài Khoản</TabsTrigger>
            </TabsList>
            <TabsContent value='sign-in'>
              <Card>
                <CardHeader className='p-3'>
                  <CardDescription>
                    Truy cập tài khoản của bạn nhanh chóng và an toàn. Đăng nhập để tiếp tục từ nơi bạn đã dừng lại và
                    khám phá tất cả các tính năng.
                  </CardDescription>
                </CardHeader>
                <FormSignIn />
              </Card>
            </TabsContent>
            <TabsContent value='sign-up'>
              <Card>
                <CardHeader className='p-3'>
                  <CardDescription>
                    Chào mừng bạn quay lại! Vui lòng đăng nhập để truy cập tài khoản của bạn và tận hưởng trải nghiệm
                    liền mạch, an toàn với tất cả các tính năng.
                  </CardDescription>
                </CardHeader>
                <FormSignUp onRegisterSuccess={() => setActiveTab('sign-in')} />
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}

export default AuthPage
