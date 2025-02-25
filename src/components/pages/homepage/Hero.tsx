import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import Microsoft from '@/components/common/icons/Microsoft'
import Marquee from 'react-fast-marquee'
import AmazonWebServices from '@/components/common/icons/AWSIcon'
import Appwrite from '@/components/common/icons/AppWriteIcon'
import Docker from '@/components/common/icons/DockerIcon'
import GmailIcon from '@/components/common/icons/GmailIcon'
import GoogleIcon from '@/components/common/icons/GoogleIcon'
import Linux from '@/components/common/icons/LinuxIcon'
import IntelliJIDEA from '@/components/common/icons/IntelliJIcon'
import Notion from '@/components/common/icons/NotionIcon'
import DeveloperStudentClub from '@/components/common/icons/GoogleDeveloperClubIcon'
import MetaMask from '@/components/common/icons/MetaMaskIcon'
import PostgreSQL from '@/components/common/icons/PostgreIcon'
import Adobe from '@/components/common/icons/AdobeIcon'
import Figma from '@/components/common/icons/Figma'
import Photoshop from '@/components/common/icons/PhotoshopIcon'
export default function Hero() {
  return (
    <section className='w-full min-h-[80vh] flex flex-col items-center justify-center px-4 '>
      <div className='container max-w-8xl mx-auto text-center space-y-8 mt-[100px]'>
        <h1 className='text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mx-auto'>
          <div data-aos='zoom-out-down'>Nâng tầm tương lai của bạn với các khóa học được thiết kế để </div>
          <span className='text-blue-600 relative'>
            <div data-aos='zoom-out-down'>phù hợp với lựa chọn của bạn</div>
            <svg
              className='absolute -bottom-2 right-0 w-full h-4 text-blue-400'
              viewBox='0 0 100 20'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path d='M0 15 Q 25 5, 50 15 T 100 15' stroke='currentColor' strokeWidth='4' fill='none' />
            </svg>
          </span>
        </h1>

        <div data-aos='zoom-out-up'>
          <p className='text-gray-600 max-w-2xl mx-auto text-lg'>
            Chúng tôi kết nối các giảng viên hàng đầu thế giới, nội dung tương tác và cộng đồng hỗ trợ để giúp bạn đạt
            được mục tiêu cá nhân và nghề nghiệp của mình.
          </p>
        </div>

        <div className='flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto'>
          <Input type='text' placeholder='Tìm kiếm khóa học' className='h-12' />
          <Button className='h-12 px-8'>Tìm kiếm</Button>
        </div>

        <div className='pt-16 space-y-4'>
          <p className='text-sm text-gray-500'>Được tin tưởng bởi học viên từ</p>
          <Marquee>
            <div className='flex flex-wrap justify-center items-center gap-8 opacity-75'>
              <Microsoft className='w-10 h-10' />
              <AmazonWebServices className='w-10 h-10' />
              <Appwrite className='w-10 h-10' />
              <Docker className='w-10 h-10' />
              <GmailIcon className='w-10 h-10' />
              <GoogleIcon className='w-10 h-10' />
              <Linux className='w-10 h-10' />
              <IntelliJIDEA className='w-10 h-10' />
              <DeveloperStudentClub className='!w-10 !h-10' />
              <Notion className='w-10 h-10' />
              <MetaMask className='!w-10 !h-10' />
              <PostgreSQL className='!w-10 !h-10' />
              <Adobe className='!w-10 !h-10' />
              <Figma className='!w-10 !h-10' />
              <Photoshop className='!w-10 !h-10' />
            </div>
          </Marquee>
        </div>
      </div>
    </section>
  )
}
