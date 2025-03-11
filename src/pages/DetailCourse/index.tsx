import { CourseDetail } from '../../components/pages/DetailCourse'
import { useParams } from 'react-router-dom'

const CourseDetailPage = () => {
  const { id } = useParams<{ id: string }>()

  if (!id) return <div>Invalid Course ID</div>

  return (
    <div className='pt-[50px]'>
      <CourseDetail courseId={id} />
    </div>
  )
}

export default CourseDetailPage
