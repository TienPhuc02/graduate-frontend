import createInstanceAxios from '@/services/CustomizeService'

const axios = createInstanceAxios(`${import.meta.env.VITE_BACKEND_URL}`)
export const loginAPI = (email: string, password: string) => {
  const urlBackend = '/auth/login'
  return axios.post<IBackendRes<ILogin>>(
    urlBackend,
    { email, password },
    {
      headers: {
        delay: 1000
      }
    }
  )
}
export const registerAPI = (data: IRegisterUserDTO) => {
  const urlBackend = '/auth/register'
  return axios.post<IBackendRes<any>>(urlBackend, data, {
    headers: {
      delay: 1000
    }
  })
}
export const forgotPasswordAPI = ({ email }: { email: string }) => {
  const urlBackend = '/auth/forgot-password'
  return axios.post<IBackendRes<any>>(
    urlBackend,
    { email },
    {
      headers: {
        delay: 1000
      }
    }
  )
}
export const updatePasswordAPI = ({
  currentPassword,
  newPassword,
  confirmPassword
}: {
  currentPassword: string
  newPassword: string
  confirmPassword: string
}) => {
  const urlBackend = '/auth/update-password'
  return axios.post<IBackendRes<any>>(
    urlBackend,
    {
      currentPassword,
      newPassword,
      confirmPassword
    },
    {
      headers: {
        delay: 1000
      }
    }
  )
}

//course

export const getCoursesAPI = async (queryKey: string[]) => {
  const query = queryKey[1] || ''
  const urlBackend = `/course?${query}`
  const response = await axios.get<IBackendRes<IModelPaginate<IAdminCourse>>>(urlBackend)
  return response.data.results
}

export const getCourseByIdAPI = (idCourse: string) => {
  const urlBackend = `/course/${idCourse}`
  return axios.get<IBackendRes<IAdminCourse>>(urlBackend)
}
export const createCourseAPI = (file: File, data: ICreateCourseDTO) => {
  const bodyFormData = new FormData()

  bodyFormData.append('instructor', data.instructor)
  bodyFormData.append('title', data.title)
  bodyFormData.append('description', data.description)
  bodyFormData.append('category', data.category)
  bodyFormData.append('level', data.level)
  bodyFormData.append('price', String(data.price))

  if (file) {
    bodyFormData.append('thumbnail', file)
  }

  data.requirements.forEach((req: { requirement: string }, index: number) => {
    bodyFormData.append(`requirements[${index}]`, req.requirement)
  })

  data.benefits.forEach((ben: { benefit: string }, index: number) => {
    bodyFormData.append(`benefits[${index}]`, ben.benefit)
  })

  data.qna.forEach((qa: { question: string; answer: string }, index: number) => {
    bodyFormData.append(`qna[${index}][question]`, qa.question)
    bodyFormData.append(`qna[${index}][answer]`, qa.answer)
  })

  return axios.post('/course', bodyFormData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}

export const updateCourseAPI = (idCourse: string, file: File, data: IUpdateCourseDTO) => {
  const bodyFormData = new FormData()

  bodyFormData.append('instructor', data.instructor)
  bodyFormData.append('title', data.title)
  bodyFormData.append('description', data.description)
  bodyFormData.append('category', data.category)
  bodyFormData.append('level', data.level)
  bodyFormData.append('price', String(data.price))

  if (file) {
    bodyFormData.append('thumbnail', file)
  }

  data.requirements.forEach((req: { requirement: string }, index: number) => {
    bodyFormData.append(`requirements[${index}]`, req.requirement)
  })

  data.benefits.forEach((ben: { benefit: string }, index: number) => {
    bodyFormData.append(`benefits[${index}]`, ben.benefit)
  })

  data.qna.forEach((qa: { question: string; answer: string }, index: number) => {
    bodyFormData.append(`qna[${index}][question]`, qa.question)
    bodyFormData.append(`qna[${index}][answer]`, qa.answer)
  })

  return axios.put(`/course/${idCourse}`, bodyFormData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}
export const deleteCourseAPI = (idCourse: string) => {
  const urlBackend = `/course/${idCourse}`
  return axios.post<IBackendRes<IAdminCourse>>(urlBackend)
}
