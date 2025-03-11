import ReactPaginate from 'react-paginate'
import { Button } from '../../components/ui/button'

interface PaginationProps {
  currentPage: number
  pageSize: number
  total: number
  onPageChange: (selected: number) => void
}

const CustomPagination: React.FC<PaginationProps> = ({ currentPage, pageSize, total, onPageChange }) => {
  const pageCount = Math.ceil(total / pageSize)

  return (
    <ReactPaginate
      previousLabel={<Button variant='outline'>« Trước</Button>}
      nextLabel={<Button variant='outline'>Sau »</Button>}
      breakLabel='...'
      pageCount={pageCount}
      forcePage={currentPage - 1}
      marginPagesDisplayed={2}
      pageRangeDisplayed={3}
      onPageChange={(data) => onPageChange(data.selected + 1)}
      containerClassName='flex items-center justify-center gap-2 mt-4'
      pageClassName='py-1 px-3 rounded-md border bg-background text-foreground '
      activeClassName='bg-primary text-primary-foreground border-primary'
      previousClassName='mr-2'
      nextClassName='ml-2'
      disabledClassName='opacity-50 cursor-not-allowed'
    />
  )
}

export default CustomPagination
