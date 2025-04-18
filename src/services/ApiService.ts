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
export const getBlogByIdAPI = async (idBlog: string) => {
  const urlBackend = `/blog/${idBlog}`
  const response = await axios.get<IBackendRes<IAdminBlog>>(urlBackend)
  return response?.data
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
export const getCommentsAPI = async (params: { blogId?: string; courseId?: string }) => {
  const query = new URLSearchParams()
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined) query.append(key, value.toString())
  })
  const urlBackend = `/comment?${query.toString()}`
  const response = await axios.get<IBackendRes<IModelPaginate<IAdminComment>>>(urlBackend)
  return response.data
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
export const deleteOrderItemAPI = async (idOrderItem: string) => {
  const urlBackend = `/orderItem/${idOrderItem}`
  const response = await axios.delete<IBackendRes<IAdminOrderItem>>(urlBackend)
  return response.data
}
export const deleteOrderAPI = async (idOrder: string) => {
  const urlBackend = `/order/${idOrder}`
  const response = await axios.delete<IBackendRes<IAdminOrder>>(urlBackend)
  return response.data
}
export const getOrderItemsAPI = async (query?: string) => {
  const urlBackend = `/orderItem?${query}`
  const response = await axios.get<IBackendRes<IModelPaginate<IAdminOrderItem>>>(urlBackend)
  return response.data
}
export const getOrdersAPI = async (params?: { status?: string }) => {
  const query = new URLSearchParams()
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined) query.append(key, value.toString())
    })
  }
  const urlBackend = `/order?${query}`
  const response = await axios.get<IBackendRes<IModelPaginate<IAdminOrder>>>(urlBackend)

  return response.data
}
export const updateOrderAPI = async (idOrder: string, data: IUpdateOrderDTO) => {
  const urlBackend = `/order/${idOrder}`
  const response = await axios.put<IBackendRes<IAdminOrder>>(urlBackend, data)
  return response.data
}
