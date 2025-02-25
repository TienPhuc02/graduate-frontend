import {
  AwardIcon,
  BookOpenIcon,
  GraduationCapIcon,
  MessageCircleIcon,
  RefreshCcwIcon,
  UserCheckIcon
} from 'lucide-react'

export const BENEFITS = [
  {
    title: 'Khoá Học Miễn Phí',
    icon: (
      <div className='bg-blue-100 rounded-xl flex items-center justify-center w-10 h-10'>
        <GraduationCapIcon className='text-blue-600' />
      </div>
    ),
    description:
      'Chúng tôi cung cấp nhiều khóa học miễn phí nhằm hỗ trợ giáo dục cho các cộng đồng có hoàn cảnh khó khăn.'
  },
  {
    title: 'Truy Cập Trọn Đời',
    icon: (
      <div className='bg-green-100 rounded-xl flex items-center justify-center w-10 h-10'>
        <RefreshCcwIcon className='text-green-600' />
      </div>
    ),
    description:
      'Tất cả các khóa học mà bạn đã đăng ký có thể được truy cập trọn đời, giúp bạn học tập thoải mái mà không bị áp lực về thời gian.'
  },
  {
    title: 'Nhóm Tư Vấn',
    icon: (
      <div className='bg-yellow-100 rounded-xl flex items-center justify-center w-10 h-10'>
        <MessageCircleIcon className='text-yellow-600' />
      </div>
    ),
    description: 'Có một nhóm tư vấn giúp bạn đặt câu hỏi và thảo luận với các học viên khác về những chủ đề liên quan.'
  },
  {
    title: 'Chứng Chỉ và Danh Mục Dự Án',
    icon: (
      <div className='bg-purple-100 rounded-xl flex items-center justify-center w-10 h-10'>
        <AwardIcon className='text-purple-600' />
      </div>
    ),
    description: 'Sau khi hoàn thành khóa học, bạn sẽ nhận được chứng chỉ và danh mục các dự án đã hoàn thành.'
  },
  {
    title: 'Lộ Trình Học Tập Bài Bản',
    icon: (
      <div className='bg-red-100 rounded-xl flex items-center justify-center w-10 h-10'>
        <BookOpenIcon className='text-red-600' />
      </div>
    ),
    description:
      'Các khóa học được thiết kế từ cơ bản đến nâng cao, giúp mọi người có thể học tập một cách có hệ thống với dịch vụ của chúng tôi.'
  },
  {
    title: 'Giảng Viên Kinh Nghiệm',
    icon: (
      <div className='bg-indigo-100 rounded-xl flex items-center justify-center w-10 h-10'>
        <UserCheckIcon className='text-indigo-600' />
      </div>
    ),
    description:
      'Chúng tôi có đội ngũ giảng viên giàu kinh nghiệm, đến từ các ngành công nghiệp với chuyên môn đã được kiểm chứng.'
  }
]
