import { create } from 'zustand'
import { getCourseByIdAPI } from '@/services/ApiService'

interface CourseState {
  course: IAdminCourse | null
  loading: boolean
  error: string | null
  fetchCourseByUserId: (idCourse: string) => Promise<void>
}

export const useCourseStore = create<CourseState>((set) => ({
  course: null,
  loading: false,
  error: null,
  fetchCourseByUserId: async (idCourse: string) => {
    set({ loading: true, error: null })
    try {
      const response = await getCourseByIdAPI(idCourse)
      set({ course: response, loading: false })
    } catch (error) {
      set({ error: 'Không thể tải khóa học', loading: false })
    }
  }
}))
