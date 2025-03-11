import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Card, CardContent } from '@/components/ui/card'
import { HelpCircle } from 'lucide-react'

const faqs = [
  {
    question: 'Làm thế nào để đăng ký khóa học?',
    answer:
      "Bạn có thể đăng ký khóa học bằng cách nhấn vào nút 'Đăng ký' trên trang chi tiết khóa học và làm theo hướng dẫn."
  },
  {
    question: 'Có thể học offline không?',
    answer: 'Các khóa học chủ yếu là online, tuy nhiên một số nội dung có thể tải xuống để học offline.'
  },
  {
    question: 'Tôi có thể nhận chứng chỉ sau khi hoàn thành khóa học không?',
    answer: 'Có! Sau khi hoàn thành tất cả bài giảng và bài kiểm tra, bạn sẽ nhận được chứng chỉ.'
  }
]

const FAQ = () => {
  return (
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
    </section>
  )
}

export default FAQ
