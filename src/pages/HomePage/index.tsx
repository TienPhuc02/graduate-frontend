import AboutUs from '@/components/feature/homepage/AboutUs'
import Benefits from '@/components/feature/homepage/Benefits'
import HeaderHomePage from '@/components/layout/HeaderHomePage'

const HomePage = () => {
  return (
    <>
      <HeaderHomePage />
      <div className='container mx-auto mt-[100px]'>
        <Benefits />
        <AboutUs />
      </div>
    </>
  )
}

export default HomePage
