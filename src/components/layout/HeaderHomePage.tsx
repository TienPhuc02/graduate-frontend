import { Link, useLocation, useNavigate } from 'react-router-dom'
import LogoIcon from '../common/icons/LogoIcon'
import { Button } from '../ui/button'
import { ModeToggle } from '../common/ModeToggle'

import { animate } from 'framer-motion'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu'
import useUserStore from '../../stores/userStore'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { logoutAPI } from '../../services/ApiService'
import { useOrderStore } from '@/stores/userOrderStore'
import { useCourseStore } from '@/stores/useCourseStore'

const smoothScrollTo = (element: HTMLElement) => {
  const targetPosition = element.getBoundingClientRect().top + window.scrollY
  animate(window.scrollY, targetPosition, {
    duration: 0.8,
    ease: 'easeInOut',
    onUpdate: (latest) => window.scrollTo(0, latest)
  })
}

const HeaderHomePage = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const { user, logout } = useUserStore()
  const { order } = useOrderStore()
  const { course } = useCourseStore()
  console.log("🚀 ~ HeaderHomePage ~ user:", user)
  const handleNavClick = (event: React.MouseEvent, path: string) => {
    event.preventDefault()
    const sectionId = path.substring(1)
    if (location.pathname !== '/') {
      navigate('/')
      setTimeout(() => {
        const section = document.getElementById(sectionId)
        if (section) smoothScrollTo(section)
      }, 100)
    } else {
      const section = document.getElementById(sectionId)
      if (section) smoothScrollTo(section)
    }
  }
  const handleLogout = async () => {
    try {
      if (user?.socialProvider === 'GOOGLE' || user?.socialProvider === 'GITHUB') {
        await fetch('/auth/strategies/login', {
          method: 'GET',
          credentials: 'include'
        })
      } else {
        await logoutAPI()
      }

      logout()
      localStorage.removeItem('access_token')
      navigate('/')
    } catch (error) {
      logout()
      localStorage.removeItem('access_token')
      navigate('/')
    }
  }

  const navLinks = [
    { name: 'Trang Chủ', path: '/' },
    { name: 'Giới Thiệu', path: '#' },
    { name: 'Khóa Học', path: '/courses' },
    { name: 'Câu Hỏi Thường Gặp', path: '#faq' },
    { name: 'Blog', path: '/blogs' }
  ]

  const linkClass =
    'group inline-flex h-9 w-max items-center justify-center rounded-md bg-white px-4 py-2 text-base font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50'

  return (
    <div className='border-b w-full fixed dark:bg-black z-50 bg-white'>
      <div className='container mx-auto h-[60px] flex items-center justify-between'>
        <Link to='/' className='flex gap-[10px] items-center justify-center cursor-pointer'>
          <LogoIcon className='h-6 w-6' />
          <span className='font-medium text-2xl'>EduGo</span>
        </Link>

        <nav>
          <div className='ml-auto flex gap-2'>
            {navLinks.map(({ name, path }) =>
              path.startsWith('#') ? (
                <a key={path} href={path} onClick={(e) => handleNavClick(e, path)} className={linkClass}>
                  {name}
                </a>
              ) : (
                <Link key={path} to={path} className={linkClass}>
                  {name}
                </Link>
              )
            )}

            {!user ? (
              <Link to='/authentication'>
                <Button variant='outline' className='justify-self-end'>
                  Đăng nhập
                </Button>
              </Link>
            ) : (
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Avatar>
                    <AvatarImage src={user.profilePicture || 'https://i.pravatar.cc/150'} alt={user?.firstName} />
                    <AvatarFallback>{user?.firstName.charAt(0) + user?.lastName.charAt(0)!}</AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent align='end'>
                  <DropdownMenuItem asChild>
                    <Link to='/my-profile'>Cập nhật thông tin</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to='/my-cart'>Giỏ hàng</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to='/my-course'>Khóa học của tôi</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleLogout} className='text-red-500'>
                    Đăng xuất
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}

            <ModeToggle />
          </div>
        </nav>
      </div>
    </div>
  )
}

export default HeaderHomePage
