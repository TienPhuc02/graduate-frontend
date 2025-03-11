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
  const query = new URLSearchParams()

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined) query.append(key, value.toString())
  })

  const urlBackend = `/course?${query.toString()}`
  const response = await axios.get<IBackendRes<IModelPaginate<IAdminCourse>>>(urlBackend)

  return response.data
}
export const getMe = async (): Promise<IBackendRes<IAdminUser>> => {
  const urlBackend = '/auth/me'
  const response = await axios.get<IBackendRes<IAdminUser>>(urlBackend, {
    headers: { delay: 1000 }
  })
  return response
}
export const getCourseByIdAPI = async (idCourse: string) => {
  const urlBackend = `/course/${idCourse}`
  const response = await axios.get<IBackendRes<IAdminCourse>>(urlBackend)
  return response.data
}
export const getBlogsAPI = async (params: GetBlogsParams) => {
  const query = new URLSearchParams()

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined) query.append(key, value.toString())
  })

  const urlBackend = `/blog?${query.toString()}`
  const response = await axios.get<IBackendRes<IModelPaginate<IAdminBlog>>>(urlBackend)

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
export const createOrderItemAPI = async (data: ICreateOrderItemDTO) => {
  const urlBackend = `/orderItem`
  const response = await axios.post<IBackendRes<IAdminOrderItem>>(urlBackend, data)
  return response.data
}
export const createOrderAPI = async (data: ICreateOrderDTO) => {
  const urlBackend = `/order`
  const response = await axios.post<IBackendRes<IAdminOrder>>(urlBackend, data)
  return response.data
}
