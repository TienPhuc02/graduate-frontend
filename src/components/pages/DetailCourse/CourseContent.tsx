// components/course/CourseContent.tsx
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../../ui/accordion'
import { Badge } from '../../ui/badge'
import { Separator } from '../../ui/separator'

interface CourseContentProps {
  course: IAdminCourse
}

export const CourseContent = ({ course }: CourseContentProps) => {
  return (
    <>
      <div>
        <h2 className='text-2xl font-semibold mb-4'>Yêu cầu khóa học</h2>
        <ul className='list-disc pl-5'>
          {course?.requirements?.map((req, index) => (
            <li key={index} className='text-muted-foreground'>
              {req}
            </li>
          ))}
        </ul>
      </div>

      <Separator className='my-8' />

      <div>
        <h2 className='text-2xl font-semibold mb-4'>Những gì bạn sẽ học được</h2>
        <ul className='list-disc pl-5'>
          {course?.benefits?.map((benefit, index) => (
            <li key={index} className='text-muted-foreground'>
              {benefit}
            </li>
          ))}
        </ul>
      </div>

      <Separator className='my-8' />

      {course?.qna?.length > 0 && (
        <div className='my-8'>
          <h2 className='text-2xl font-semibold mb-4'>Hỏi đáp</h2>
          <Accordion type='multiple'>
            {course.qna.map((item, index) => (
              <AccordionItem key={index} value={`qna-${index}`}>
                <AccordionTrigger>{item.question}</AccordionTrigger>
                <AccordionContent>{item.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      )}

      <div>
        <h2 className='text-2xl font-semibold mb-4'>Nội dung khóa học</h2>
        <Accordion type='single' collapsible>
          {course.lectureCourses.map((lecture, index) => (
            <AccordionItem key={index} value={`lecture-${index}`}>
              <AccordionTrigger className='p-4 border-b text-lg font-semibold'>{lecture.title}</AccordionTrigger>
              <AccordionContent className='p-4 space-y-2'>
                {lecture.lessons.map((lesson, idx) => (
                  <div key={idx} className='flex items-center space-x-3'>
                    {lesson.contentType.map((type, typeIdx) => (
                      <Badge key={typeIdx}>{type}</Badge>
                    ))}
                    <p>{lesson.title}</p>
                  </div>
                ))}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </>
  )
}
