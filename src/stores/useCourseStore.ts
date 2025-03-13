import { create } from 'zustand'

interface CourseState {
  course: IAdminCourse | null
  selectedLesson: IAdminLesson | null
  loading: boolean
  error: string | null
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
  setCourse: (course: IAdminCourse | null) => void
  setSelectedLesson: (lesson: IAdminLesson) => void
}

export const useCourseStore = create<CourseState>((set) => ({
  course: null,
  selectedLesson: null,
  loading: false,
  error: null,

  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
  setCourse: (course) => set({ course }),
  setSelectedLesson: (lesson) => set({ selectedLesson: lesson })
}))
