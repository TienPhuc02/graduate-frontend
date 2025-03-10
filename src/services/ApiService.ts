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

interface GetCoursesParams {
  page: number
  pageSize: number
  title?: string
  status?: string
  category?: string
  sort?: string
}
interface GetBlogsParams {
  page: number
  pageSize: number
  title?: string
  isPublished?: string
  categoryBlog?: string
  sort?: string
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
