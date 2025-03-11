import createInstanceAxios from './CustomizeService'

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
export const logoutAPI = () => {
  const urlBackend = '/auth/logout'
  return axios.post<IBackendRes<any>>(urlBackend, {
    headers: {
      delay: 1000
    }
  })
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

export const getCoursesAPI = async (params: GetCoursesParams) => {
  console.log('🚀 ~ getCoursesAPI ~ params:', params)

  const query = new URLSearchParams()

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined) query.append(key, value.toString())
  })

  const urlBackend = `/course?${query.toString()}`
  const response = await axios.get<IBackendRes<IModelPaginate<IAdminCourse>>>(urlBackend)

  console.log('🚀 ~ getCoursesAPI ~ response:', response)

  return response.data
}
export const getMe = async (): Promise<IBackendRes<IUserLogin>> => {
  const urlBackend = '/auth/me'
  const response = await axios.get<IBackendRes<IUserLogin>>(urlBackend, {
    headers: { delay: 1000 }
  })
  return response
}
export const getCourseByIdAPI = async (idCourse: string) => {
  const urlBackend = `/course/${idCourse}`
  const response = await axios.get<IBackendRes<IAdminCourse>>(urlBackend)
  console.log('🚀 ~ getCourseByIdAPI ~ response:', response)
  return response.data
}
export const getBlogsAPI = async (params: GetBlogsParams) => {
  console.log('🚀 ~ getCoursesAPI ~ params:', params)

  const query = new URLSearchParams()

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined) query.append(key, value.toString())
  })

  const urlBackend = `/blog?${query.toString()}`
  const response = await axios.get<IBackendRes<IModelPaginate<IAdminBlog>>>(urlBackend)

  console.log('🚀 ~ getCoursesAPI ~ response:', response)

  return response.data
}
export const createCommentAPI = ({
  userId,
  courseId,
  blogId,
  text,
  parentCommentId
}: {
  userId: string
  courseId?: string
  blogId?: string
  text: string
  parentCommentId?: string
}) => {
  const urlBackend = `/comment`
  return axios.post<IBackendRes<IAdminComment>>(urlBackend, {
    userId,
    courseId,
    blogId,
    text,
    parentCommentId
  })
}
