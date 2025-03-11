// import { motion } from 'framer-motion'

import Benefits from "../../components/pages/homepage/benefits"
import FAQ from "../../components/pages/homepage/faq"
import Hero from "../../components/pages/homepage/hero"
import RecommendCourse from "../../components/pages/homepage/recommendCourse"

// import { useQuery } from '@tanstack/react-query'
// import { Image } from 'antd'
// import { ArrowRight, HelpCircle } from 'lucide-react'

// import { Link, useNavigate } from 'react-router-dom'
// import Marquee from 'react-fast-marquee'
// import Microsoft from '../../components/common/icons/Microsoft'
// import AmazonWebServices from '../../components/common/icons/AWSIcon'
// import Appwrite from '../../components/common/icons/AppWriteIcon'
// import Docker from '../../components/common/icons/DockerIcon'
// import GmailIcon from '../../components/common/icons/GmailIcon'
// import GoogleIcon from '../../components/common/icons/GoogleIcon'
// import Linux from '../../components/common/icons/LinuxIcon'
// import IntelliJIDEA from '../../components/common/icons/IntelliJIcon'
// import DeveloperStudentClub from '../../components/common/icons/GoogleDeveloperClubIcon'
// import Notion from '../../components/common/icons/NotionIcon'
// import MetaMask from '../../components/common/icons/MetaMaskIcon'
// import PostgreSQL from '../../components/common/icons/PostgreIcon'
// import Adobe from '../../components/common/icons/AdobeIcon'
// import Figma from '../../components/common/icons/Figma'
// import { Input } from '../../components/ui/input'
// import { TextAnimate } from '../../components/ui/text-animate'
// import { Card, CardContent } from '../../components/ui/card'
// import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../../components/ui/accordion'
// import { BENEFITS } from '../../constants'
// import CardAnimate from '../../components/ui/card-animate'
// import Photoshop from '../../components/common/icons/PhotoshopIcon'
// import { Button } from '../../components/ui/button'
// import { getCoursesAPI } from '../../services/ApiService'
// const faqs = [
//   {
//     question: 'Làm thế nào để đăng ký khóa học?',
//     answer:
//       "Bạn có thể đăng ký khóa học bằng cách nhấn vào nút 'Đăng ký' trên trang chi tiết khóa học và làm theo hướng dẫn."
//   },
//   {
//     question: 'Có thể học offline không?',
//     answer: 'Các khóa học chủ yếu là online, tuy nhiên một số nội dung có thể tải xuống để học offline.'
//   },
//   {
//     question: 'Tôi có thể nhận chứng chỉ sau khi hoàn thành khóa học không?',
//     answer: 'Có! Sau khi hoàn thành tất cả bài giảng và bài kiểm tra, bạn sẽ nhận được chứng chỉ.'
//   }
// ]

// const container = {
//   hidden: { opacity: 1, scale: 0 },
//   visible: {
//     opacity: 1,
//     scale: 1,
//     transition: {
//       delayChildren: 0.3,
//       staggerChildren: 0.2
//     }
//   }
// }
const HomePage = () => {
  //   const navigate = useNavigate()
  //   const {
  //     data: courses,
  //     isLoading,
  //     error
  //   } = useQuery({
  //     queryKey: ['getRecommendCourses'],
  //     queryFn: () => getCoursesAPI({ page: 1, pageSize: 3 })
  //   })

  //   if (isLoading) return <p>Loading...</p>
  //   if (error) return <p>Error fetching courses: {error.message}</p>
  return (
    <>
      {/* <div className='container mx-auto pb-[200px]'>
        <div className='w-full flex flex-col items-center justify-center px-4'>
          <div className='max-w-8xl mx-auto text-center space-y-8 pt-[100px]'>
            <div className='text-4xl md:text-5xl lg:text-6xl font-bold mx-auto'>
              <div data-aos='zoom-out-up'>Nâng tầm tương lai của bạn với các khóa học được thiết kế để</div>
              <div className='text-blue-600 relative'>
                <div data-aos='zoom-out-up'>phù hợp với lựa chọn của bạn</div>
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
            <div className='text-gray-600 max-w-2xl mx-auto text-lg' data-aos='zoom-out-up'>
              Chúng tôi kết nối các giảng viên hàng đầu thế giới, nội dung tương tác và cộng đồng hỗ trợ để giúp bạn đạt
              được mục tiêu cá nhân và nghề nghiệp của mình.
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
        </div>
        <>
          <TextAnimate text='Lợi ích khi tham gia EduGo' className='text-center text-3xl' type='rollIn'></TextAnimate>
          <motion.div className='grid grid-cols-3 gap-[30px]' variants={container} initial='hidden' animate='visible'>
            {BENEFITS.map((_, index) => {
              return <CardAnimate icon={_.icon} key={index} title={_.title} description={_.description} />
            })}
          </motion.div>
        </>
        <>
          <div className='flex justify-between items-center'>
            <TextAnimate text='Đề xuất khóa học dành cho bạn' className='text-2xl mt-5' type='whipInUp' />
            <Link to='/courses' className='flex items-center text-blue-500 hover:underline'>
              Xem tất cả khóa học <ArrowRight className='w-4 h-4 ml-1' />
            </Link>
          </div>

          <div className='flex overflow-x-auto gap-4 mt-6'>
            {courses && courses.results && courses?.results?.length > 0 ? (
              courses?.results?.map((course: IAdminCourse) => (
                <Card
                  key={course.id}
                  onClick={() => navigate(`/course/${course.id}`)}
                  className='min-w-[280px] cursor-pointer shadow-md bg-white dark:bg-neutral-900 dark:border dark:border-gray-700'
                >
                  <CardContent className='p-3 text-gray-900 dark:text-white'>
                    <Image
                      src={course.thumbnail || '/images/default-course.jpg'}
                      alt={course.title}
                      width={280}
                      height={160}
                      className='rounded-lg'
                    />
                    <h3 className='text-lg font-semibold mt-2'>{course.title}</h3>
                    <p className='text-sm text-gray-500 dark:text-gray-400'>
                      Giảng viên: {course.instructor?.firstName || 'N/A'} {course.instructor?.lastName || 'N/A'}
                    </p>
                    <p className='text-sm text-gray-600 dark:text-gray-300 mt-1'>
                      Giá:{' '}
                      {course.price
                        ? new Intl.NumberFormat('vi-VN', {
                            style: 'currency',
                            currency: 'VND'
                          }).format(Number(course.price))
                        : 'Miễn phí'}
                    </p>
                    <p className='text-sm text-yellow-500'>⭐ {course.rating || 'Chưa có đánh giá'}</p>
                  </CardContent>
                </Card>
              ))
            ) : (
              <p>Không có khóa học nào để đề xuất.</p>
            )}
          </div>
        </>
        <section id='faq' className='py-16 bg-gray-100 dark:bg-neutral-900 mt-[100px]'>
          <div className='container mx-auto px-4 max-w-4xl'>
            <div className='text-center mb-10'>
              <h2 className='text-3xl font-bold text-gray-900 dark:text-white flex items-center justify-center gap-2'>
                <HelpCircle className='text-blue-500 w-7 h-7' />
                Câu Hỏi Thường Gặp
              </h2>
              <p className='text-gray-600 dark:text-gray-400 mt-2'>
                Những câu hỏi phổ biến nhất về nền tảng học tập của chúng tôi.
              </p>
            </div>

            <Card className='shadow-lg'>
              <CardContent className='p-6'>
                <Accordion type='single' collapsible>
                  {faqs.map((faq, index) => (
                    <AccordionItem key={index} value={`faq-${index}`} className='border-b last:border-0'>
                      <AccordionTrigger className='text-lg font-medium'>{faq.question}</AccordionTrigger>
                      <AccordionContent className='text-gray-700 dark:text-gray-300'>{faq.answer}</AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          </div>
        </section> */}
      <Hero />
      <Benefits />
      <RecommendCourse />
      <FAQ />
    </>
  )
}

export default HomePage
