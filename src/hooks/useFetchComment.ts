import { getCommentsAPI } from '@/services/ApiService'
import { useCommentStore } from '@/stores/useCommentStore'
import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'

export const useFetchComment = (courseId: string) => {
  console.log('🚀 ~ useFetchComment ~ courseId:', courseId)
  const { setComments } = useCommentStore()

  const { data, isSuccess, isLoading, error, refetch } = useQuery({
    queryKey: ['comments', courseId],
    queryFn: () => getCommentsAPI({ courseId }),
    staleTime: 1000 * 60 * 5
  })

  useEffect(() => {
    if (isSuccess && data?.results) {
      setComments(data.results)
    }
  }, [isSuccess, data?.results, setComments])

  return { data, isLoading, error, refetch }
}
