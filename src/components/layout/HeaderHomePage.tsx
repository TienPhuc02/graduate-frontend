import { Link } from 'react-router-dom'
import LogoIcon from '../common/icons/LogoIcon'
import { Button } from '../ui/button'
import { ModeToggle } from '../common/ModeToggle'

const navLinks = [
  { name: 'Home', path: '#' },
  { name: 'About', path: '#' },
  { name: 'Courses', path: '#' },
  { name: 'FAQ', path: '#' },
  { name: 'Blog', path: '#' }
]

const linkClass =
  'group inline-flex h-9 w-max items-center justify-center rounded-md bg-white px-4 py-2 text-base font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50 dark:data-[active]:bg-gray-800/50 dark:data-[state=open]:bg-gray-800/50'

const HeaderHomePage = () => {
  return (
    <div className='border-b w-full'>
      <div className='container mx-auto h-[60px] flex items-center justify-between'>
        <Link to='/' className='flex gap-[10px] items-center justify-center cursor-pointer'>
          <LogoIcon className='h-6 w-6' />
          <span className='font-medium text-2xl'>EduGo</span>
        </Link>
        <nav>
          <div className='ml-auto flex gap-2'>
            {navLinks.map(({ name, path }) => (
              <Link key={name} to={path} className={linkClass}>
                {name}
              </Link>
            ))}
            <Button variant='outline' className='justify-self-end'>
              Sign in
            </Button>
            <ModeToggle />
          </div>
        </nav>
      </div>
    </div>
  )
}

export default HeaderHomePage
