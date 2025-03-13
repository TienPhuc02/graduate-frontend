import { getCourseByIdAPI } from '@/services/ApiService'
import { useCourseStore } from '@/stores/useCourseStore'

export const useFetchCourse = () => {
  const { setCourse, setLoading, setError, setSelectedLesson } = useCourseStore()

  const fetchCourseById = async (id: string) => {
    setLoading(true)
    setError(null)

    try {
      const response = await getCourseByIdAPI(id)

      if (!response || !response.lectureCourses || response.lectureCourses.length === 0) {
        throw new Error('Khóa học không có bài giảng')
      }

      const firstLecture = response.lectureCourses[0]
      const firstLesson = firstLecture.lessons?.[0] || null

      setCourse(response)
      setSelectedLesson(firstLesson)
    } catch (error) {
      setError('Không thể tải khóa học')
    } finally {
      setLoading(false)
    }
  }

  return { fetchCourseById }
}
