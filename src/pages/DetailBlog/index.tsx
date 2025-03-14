import DetailBlog from '@/components/pages/DetailBlog'
import { useParams } from 'react-router-dom'

const DetailBlogPage = () => {
  const { id } = useParams<{ id: string }>()

  if (!id) return <div>Invalid Course ID</div>
  return (
    <div>
      <DetailBlog blogId={id} />
    </div>
  )
}

export default DetailBlogPage
