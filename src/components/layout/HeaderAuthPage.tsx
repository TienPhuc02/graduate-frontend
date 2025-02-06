import { Link } from 'react-router-dom'
import LogoIcon from '../common/icons/LogoIcon'
import { ModeToggle } from '../common/ModeToggle'

const HeaderAuthPage = () => {
  return (
    <>
      <div className='h-[40px] border-b flex justify-between px-[20px]'>
        <Link to='/'>
          <LogoIcon className='w-6 h-6 cursor-pointer' />
        </Link>
        <ModeToggle />
      </div>
    </>
  )
}

export default HeaderAuthPage
