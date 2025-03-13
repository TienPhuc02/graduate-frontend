import { getCommentsAPI } from '@/services/ApiService'
import { useCommentStore } from '@/stores/useCommentStore'
import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'

export const useFetchComment = (courseId: string) => {
  const { setComments } = useCommentStore()

  const { data, isSuccess, isLoading, error, refetch } = useQuery({
    queryKey: ['comments', courseId], // Thêm courseId vào queryKey
    queryFn: () => getCommentsAPI(courseId), // Truyền courseId để fetch dữ liệu chính xác
    staleTime: 1000 * 60 * 5
  })

  // Chỉ cập nhật store khi có dữ liệu mới
  useEffect(() => {
    if (isSuccess && data?.results) {
      setComments(data.results)
    }
  }, [isSuccess, data?.results, setComments])

  return { data, isLoading, error, refetch }
}
