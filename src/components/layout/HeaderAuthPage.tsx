import LogoIcon from '../common/LogoIcon'
import { ModeToggle } from '../common/ModeToggle'

const HeaderAuthPage = () => {
  return (
    <>
      <div className='h-[40px] border-b flex justify-between px-[20px]'>
        <LogoIcon />
        <ModeToggle />
      </div>
    </>
  )
}

export default HeaderAuthPage
