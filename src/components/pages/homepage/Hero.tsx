import Marquee from 'react-fast-marquee'
import { Input } from '../../ui/input'
import { Button } from '../../ui/button'
import Microsoft from '../../common/icons/Microsoft'
import AmazonWebServices from '../../common/icons/AWSIcon'
import Appwrite from '../../common/icons/AppWriteIcon'
import Docker from '../../common/icons/DockerIcon'
import GmailIcon from '../../common/icons/GmailIcon'
import GoogleIcon from '../../common/icons/GoogleIcon'
import Linux from '../../common/icons/LinuxIcon'
import IntelliJIDEA from '../../common/icons/IntelliJIcon'
import DeveloperStudentClub from '../../common/icons/GoogleDeveloperClubIcon'
import Notion from '../../common/icons/NotionIcon'
import MetaMask from '../../common/icons/MetaMaskIcon'
import PostgreSQL from '../../common/icons/PostgreIcon'
import Adobe from '../../common/icons/AdobeIcon'
import Figma from '../../common/icons/Figma'
import Photoshop from '../../common/icons/PhotoshopIcon'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

export default function Hero() {
  const navigate = useNavigate()
  const [searchInput, setSearchInput] = useState<string>('')

  const handleSearch = () => {
    if (searchInput.trim()) {
      navigate(`/courses?search=${encodeURIComponent(searchInput.trim())}`)
    } else {
      navigate('/courses')
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }

  return (
    <div className='w-full flex flex-col items-center justify-center px-4'>
      <div className='max-w-8xl mx-auto text-center space-y-8 pt-[100px]'>
        <div className='text-4xl md:text-5xl lg:text-6xl font-bold mx-auto'>
          <div>Nâng tầm tương lai của bạn với các khóa học được thiết kế để</div>
          <div className='text-blue-600 relative'>
            <div>phù hợp với lựa chọn của bạn</div>
            <svg
              className='absolute -bottom-2 right-0 w-full h-4 text-blue-400'
              viewBox='0 0 100 20'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path d='M0 15 Q 25 5, 50 15 T 100 15' stroke='currentColor' strokeWidth='4' fill='none' />
            </svg>
          </div>
        </div>
        <div className='text-gray-600 max-w-2xl mx-auto text-lg'>
          Chúng tôi kết nối các giảng viên hàng đầu thế giới, nội dung tương tác và cộng đồng hỗ trợ để giúp bạn đạt
          được mục tiêu cá nhân và nghề nghiệp của mình.
        </div>

        <div className='flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto'>
          <Input
            type='text'
            placeholder='Tìm kiếm khóa học'
            className='h-12'
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <Button className='h-12 px-8' onClick={handleSearch}>
            Tìm kiếm
          </Button>
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
    </div>
  )
}
