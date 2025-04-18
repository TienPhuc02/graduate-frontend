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
    email: string
    password: string
    phoneNumber: number
    address?: string
    isVerified?: boolean
    totalAmount?: string
    comments?: IAdminComment[]
    enrolledCourses?: IAdminCourse[]
    orders?: IAdminOrderItem[]
    profilePicture?: string
    resetPasswordToken?: string
    resetPasswordExpires?: Date
    socialProvider?: ESocialType
    isDeleted?: boolean
    deletedAt?: Date
    createdAt?: Date
    updatedAt?: Date
  }
  export interface IAdminBlog {
    id: string
    title: string
    content: string
    categoryBlog: string
    author: IAdminUser
    viewsBlog: number
    isPublished: EBlogStatus
    comments: string[]
    thumbnail: string
    isDeleted: boolean
    deletedAt: string
    createdAt: string
    updatedAt: string
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
    description?: string
    category: ECourseCategory
    qna: { question: string; answer: string }[]
    requirements?: string[]
    status?: ECourseStatus
    isDeleted?: boolean
    benefits?: string[]
    level: ECourseLevel
    price?: number
    thumbnail?: string
    describe?: string
    createdAt: Date
    updatedAt: Date
    deletedAt: Date
    rating: number
    enrolledUsers: IAdminUser[]
    lectureCourses: IAdminLecture[]
    viewsCourse: number
    duration?: number
    comments: IAdminComment[]
    orderItems: IAdminOrderItem[]
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
    startDate?: string
    endDate?: string
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
    user: IAdminUser
    course?: string | null
    blog?: string | null
    text: string
    likesCount: number
    course: IAdminCourse
    parentCommentId?: string | null
    isEdited: boolean
    isDeleted: boolean
    deletedAt?: string | null
    createdAt: string
    updatedAt?: string | null
    status: 'pending' | 'approved' | 'rejected'
    replies?: IAdminComment[]
  }
  export interface IAdminComment {
    id: string
    user: User
    course?: Course | null
    blog?: Blog | null
    text: string
    likesCount: number
    parentCommentId?: string | null
    parentComment?: IAdminComment | null
    replies?: IAdminComment[]
    isEdited: boolean
    isDeleted: boolean
    deletedAt?: Date | null
    createdAt: Date
    updatedAt: Date
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
