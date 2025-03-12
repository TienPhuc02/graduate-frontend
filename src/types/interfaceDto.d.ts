import { ECourseCategory, ECourseLevel, ECourseStatus, ETypeUser } from './enum'

export {}

declare global {
  //auth
  export interface IRegisterUserDTO {
    firstName: string
    lastName: string
    email: string
    password: string
    address: string
    phoneNumber: number
  }
  export interface ILoginUserDTO {
    email: string
    password: string
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
  export interface ICreateUserDTO {
    role: ETypeUser
    firstName: string
    lastName: string
    email: string
    phoneNumber: number
    address: string
    profilePicture: string
  }
  export interface IUpdateUserDTO {
    role: ETypeUser
    firstName: string
    lastName: string
    phoneNumber: number
    address: string
    profilePicture: string
  }
  export interface ICreateCourseDTO {
    instructor: User
    title: string
    description: string
    status: ECourseStatus
    category: ECourseCategory
    level: ECourseLevel
    price: number
    thumbnail: string
    requirements: string[]
    benefits: string[]
    qna: Qna[]
  }
  export interface IUpdateCourseDTO extends ICreateCourseDTO {}
  export interface ICreateLessonDTO {
    title?: string
    contentType?: EContentLessonType[]
    contentUrl?: string
    pdfUrl?: string
    lectureCourseId: string
    contentText?: string
    order?: number
    isDeleted?: boolean
    deletedAt?: Date
  }
  export interface IUpdateLessonDTO extends ICreateLessonDTO {}
  export interface Qna {
    question: string
    answer: string
  }
  export interface ICreateHistoryDTO {
    courseId: string
    userId: string
    isDeleted?: boolean
  }
  export interface ICreateBlogDTO {
    title: string
    content: string
    categoryBlog: string
    authorId: string
    isPublished?: boolean
    thumbnail?: string
  }
  export interface ICreateCouponDTO {
    code: string
    discountPercentage: number
    expiryDate: Date
  }
  export interface IUpdateOrderDTO {
    totalAmount?: number
    status?: 'pending' | 'processing' | 'completed' | 'cancelled'
    couponId?: string
  }
  export interface ICreateOrderDTO {
    userId: string
    totalAmount: number
    status: 'pending' | 'processing' | 'completed' | 'cancelled'
    orderItems: { productId: string;  quantity: number }[]
    couponId?: string
  }
  export interface IUpdateCouponDTO {
    code?: string
    discountPercentage?: number
    expiryDate?: Date
    isDeleted?: boolean
  }
  export interface ICreateCommentDTO {
    userId: string
    courseId: string
    text: string
  }

  export interface IUpdateCommentDTO {
    text?: string
  }

  export interface IUpdateBlogDTO {
    title?: string
    content?: string
    categoryBlog?: string
    isPublished?: boolean
    thumbnail?: string
  }
  export interface ICreateOrderItemDTO {
    orderId: string
    courseId: string
    price: number
    quantity?: number
  }
  export interface IUpdateHistoryDTO {
    courseId?: string
    isDeleted?: boolean
    deletedAt?: Date | null
  }
  export interface IUpdateOrderItemDTO {
    price?: number
    quantity?: number
  }
  namespace Express {
    export interface Request {
      currentUser?: IUserPayload
    }
    export interface Response {
      currentUser?: IUserPayload
    }
  }
}
