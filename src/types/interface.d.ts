export {}
declare global {
  export interface ICustomResponse<T> {
    success: boolean
    message: string
    data: T
  }

  //auth interface
  export interface ILogin {
    accessToken: string
    user: IUserLogin
  }
  export interface IUserLogin {
    id: string
    role: string
    firstName: string
    lastName: string
    email: string
    password: string
    phoneNumber: string
    address: string
    isVerified: boolean
    profilePicture: null
    resetPasswordToken: null
    resetPasswordExpires: null
    socialProvider: string
    isDeleted: boolean
  }
  export interface IUserPayload {
    id?: string
    role?: string
    firstName?: string
    lastName?: string
    email?: string
    phoneNumber?: number
    address?: string
    profilePicture?: string
    socialProvider?: string
  }

  //user interface
  export interface IAdminUser {
    id: string
    role: ETypeUser
    firstName: string
    lastName: string
    email?: string
    password?: string
    phoneNumber?: number
    address?: string
    isVerified: boolean
    orders: IAdminOrderItem[]
    profilePicture?: string
    resetPasswordToken?: string
    resetPasswordExpires?: Date
    socialProvider?: ESocialType
    isDeleted: boolean
    deletedAt?: Date
    createdAt?: Date
    updatedAt?: Date
  }
  export interface IAdminBlog {
    id: string
    title: string
    content: string
    categoryBlog: string
    author: {
      id: string
      firstName: string
      lastName: string
    }
    viewsBlog: number
    isPublished: EBlogStatus
    comments: string[]
    thumbnail: string
    isDeleted: boolean
    deletedAt: Date
    createdAt: Date
    updatedAt: Date
  }
  export interface ICreateUserDTO {
    role: ETypeUser
    firstName: string
    lastName: string
    email: string
    phoneNumber: string
    address: string
    profilePicture?: string
  }
  export interface IUpdateUserDTO {
    role: ETypeUser
    firstName: string
    lastName: string
    email?: string
    phoneNumber: string
    address: string
    profilePicture?: string
  }

  //course interface
  export interface IAdminCourse {
    id: string
    instructor: IAdminUser
    title: string
    description: string
    category: string
    comments: IAdminComment[]
    qna: Qna[]
    requirements: string[]
    status: boolean
    duration: number
    viewsCourse: number
    isDeleted: boolean
    benefits: string[]
    level: string
    price: string
    thumbnail: string
    describe: null
    createdAt: Date
    updatedAt: Date
    deletedAt: null
    rating: null
    lectureCourses: IAdminLecture[]
  }
  export interface Qna {
    answer: string
    question: string
  }

  export interface IAdminLecture {
    id: string
    course: Course
    title: string
    lessons: IAdminLesson[]
    createdAt: Date
    updatedAt: Date
    isDeleted: boolean
    deletedAt?: Date | null
  }
  export interface IAdminLecture {
    id: string
    course: Course
    title?: string
    lessons: IAdminLesson[]
    createdAt: Date
    updatedAt: Date
    isDeleted: boolean
    deletedAt?: Date | null
  }
  export interface GetCoursesParams {
    page: number
    pageSize: number
    title?: string
    status?: string
    category?: string
    sort?: string
    minPrice?: number
    maxPrice?: number
    startDate?: string
    endDate?: string
  }
  export interface GetBlogsParams {
    page: number
    pageSize: number
    title?: string
    isPublished?: string
    categoryBlog?: string
    sort?: string
  }
  export interface IAdminLesson {
    id: string
    lectureCourse: IAdminLecture
    title?: string
    contentType: EContentLessonType[]
    contentUrl?: string
    pdfUrl?: string
    contentText?: string
    order?: number
    createdAt: Date
    updatedAt: Date
    isDeleted: boolean
    deletedAt?: Date | null
  }
  export interface IAdminComment {
    id: string
    user: string
    course?: string | null
    blog?: string | null
    text: string
    likesCount: number
    parentCommentId?: string | null
    isEdited: boolean
    isDeleted: boolean
    deletedAt?: string | null
    createdAt: string
    updatedAt?: string | null
    status: 'pending' | 'approved' | 'rejected'
    replies?: IAdminComment[]
  }
  export interface IComment {
    id: string
    content: string
    user: { id: string; firstName: string; lastName: string; profilePicture?: string }
    createdAt: string
    replies: IComment[]
    parent?: IComment | null
    isDeleted: boolean
    status: 'pending' | 'approved' | 'rejected'
  }
  export interface IAdminOrderItem {
    id: string
    order: IAdminOrder
    course: IAdminCourse
    courseId: string
    totalAmount: number
    price: number
    isDeleted: boolean
    quantity?: number
    createdAt: string
    updatedAt: string
  }
  export interface IAdminOrder {
    id: string
    user: IAdminUser
    totalAmount: number
    status: 'pending' | 'processing' | 'completed' | 'cancelled'
    orderDate: Date
    orderItems: IAdminOrderItem[]
    coupon?: {
      id: string
      code: string
      discount: number
    } | null
    couponId?: string | null
    isDeleted: boolean
    createdAt: string
    updatedAt: string
    deletedAt?: string | null
  }
}
