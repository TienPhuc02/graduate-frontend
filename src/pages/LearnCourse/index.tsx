import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useCourseStore } from '@/stores/useCourseStore'
import { useFetchCourse } from '@/hooks/useFetchCourse'

const LearnCourse = () => {
  const { id } = useParams()
  const { fetchCourseById } = useFetchCourse()
  const { course, selectedLesson, setSelectedLesson, loading, error } = useCourseStore()
  console.log('🚀 ~ LearnCourse ~ selectedLesson:', selectedLesson)

  useEffect(() => {
    if (id) fetchCourseById(id)
  }, [id])

  if (loading) return <p className='text-center text-lg'>Đang tải...</p>
  if (error) return <p className='text-center text-red-500'>{error}</p>
  if (!course) return <p className='text-center text-lg'>Không tìm thấy khóa học</p>

  return (
    <div className='grid grid-cols-12 gap-6 p-6  min-h-screen pt-[100px]'>
      <div className='col-span-8'>
        {selectedLesson ? (
          <Card className='shadow-lg'>
            <CardHeader>
              <CardTitle className='text-2xl font-semibold'>{selectedLesson.title}</CardTitle>
            </CardHeader>
            <CardContent className='space-y-6'>
              {selectedLesson.contentType.includes('VIDEO') && selectedLesson.contentUrl && (
                <div className='aspect-video'>
                  <video key={selectedLesson.contentUrl} controls className='w-full rounded-lg shadow-sm'>
                    <source src={selectedLesson.contentUrl} type='video/mp4' />
                    Trình duyệt của bạn không hỗ trợ video.
                  </video>
                </div>
              )}

              {/* Hiển thị PDF */}
              {selectedLesson.contentType.includes('PDF') && selectedLesson.pdfUrl && (
                <div className='border rounded-lg overflow-hidden'>
                  <iframe src={selectedLesson.pdfUrl} title='PDF Lesson' className='w-full h-[600px]'></iframe>
                </div>
              )}

              {/* Hiển thị ContentText */}
              {selectedLesson.contentType.includes('TEXT') && selectedLesson.contentText && (
                <div
                  className='prose max-w-none border p-4 rounded-lg shadow-sm'
                  dangerouslySetInnerHTML={{ __html: selectedLesson.contentText }}
                />
              )}
            </CardContent>
          </Card>
        ) : (
          <Card className='shadow-lg'>
            <CardContent className='pt-6'>
              <p className='text-lg text-gray-600'>Vui lòng chọn một bài học từ danh sách bên phải để bắt đầu học.</p>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Danh sách bài học bên phải */}
      <div className='col-span-4'>
        <Card className='shadow-lg sticky top-6 max-h-[calc(100vh-3rem)] overflow-y-auto'>
          <CardHeader>
            <CardTitle className='text-xl font-semibold'>Nội dung khóa học</CardTitle>
          </CardHeader>
          <CardContent>
            <Accordion type='single' collapsible className='w-full'>
              {course.lectureCourses.map((lecture) => (
                <AccordionItem key={lecture.id} value={lecture.id}>
                  <AccordionTrigger className='text-lg font-medium'>{lecture.title}</AccordionTrigger>
                  <AccordionContent>
                    <div className='space-y-2'>
                      {lecture.lessons.map((lesson) => (
                        <Button
                          key={lesson.id}
                          variant={selectedLesson?.id === lesson.id ? 'default' : 'outline'}
                          onClick={() => setSelectedLesson(lesson)}
                          className='w-full text-left justify-start py-2 px-4'
                        >
                          {lesson.title}
                        </Button>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default LearnCourse
