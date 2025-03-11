import { Skeleton } from '../../ui/skeleton'

export const CourseDetailSkeleton = () => {
  return (
    <div className='container mx-auto py-8'>
      <Skeleton className='h-64 w-full mb-4' />
      <Skeleton className='h-8 w-3/4 mb-2' />
      <Skeleton className='h-4 w-1/2 mb-4' />
      <Skeleton className='h-6 w-1/4 mb-2' />
      <Skeleton className='h-4 w-full mb-2' />
      <Skeleton className='h-4 w-full mb-2' />
      <Skeleton className='h-10 w-32 mt-4' />
    </div>
  )
}
