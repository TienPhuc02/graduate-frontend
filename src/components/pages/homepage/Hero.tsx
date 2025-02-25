import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import Microsoft from '@/components/common/icons/Microsoft'
import Marquee from 'react-fast-marquee'
export default function Hero() {
  return (
    <section className='w-full min-h-[80vh] flex flex-col items-center justify-center px-4 '>
      <div className='container max-w-8xl mx-auto text-center space-y-8 mt-[100px]'>
        <h1 className='text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mx-auto'>
          <div data-aos='zoom-in'>Nâng tầm tương lai của bạn với các khóa học được thiết kế để </div>
          <span className='text-blue-600 relative'>
            <div data-aos='zoom-in'> phù hợp với lựa chọn của bạn</div>
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

        <p className='text-gray-600 max-w-2xl mx-auto text-lg'>
          <div data-aos='fade-right' data-aos-offset='300' data-aos-easing='ease-in-sine'>
            Chúng tôi kết nối các giảng viên hàng đầu thế giới, nội dung tương tác và cộng đồng hỗ trợ để giúp bạn đạt
            được mục tiêu cá nhân và nghề nghiệp của mình.
          </div>
        </p>

        <div className='flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto'>
          <Input type='text' placeholder='Tìm kiếm khóa học' className='h-12' />
          <Button className='h-12 px-8'>Tìm kiếm</Button>
        </div>

        <div className='pt-16 space-y-4'>
          <p className='text-sm text-gray-500'>Được tin tưởng bởi học viên từ</p>
          <Marquee>
            <div className='flex flex-wrap justify-center items-center gap-8 opacity-75'>
              <Microsoft className='w-10 h-10' />
              <Microsoft className='w-10 h-10' />
              <Microsoft className='w-10 h-10' />
              <Microsoft className='w-10 h-10' />
              <Microsoft className='w-10 h-10' />
            </div>
          </Marquee>
        </div>
      </div>
    </section>
  )
}
