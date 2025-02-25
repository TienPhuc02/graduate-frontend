import { TextAnimate } from '@/components/ui/text-animate'

const RecommendCourse = () => {
  return (
    <>
      <div className='flex justify-between items-center'>
        <TextAnimate text='Đề xuất khóa học dành cho bạn' className='text-2xl mt-5' type='whipInUp' />
        <div></div>
      </div>
    </>
  )
}

export default RecommendCourse
