import Benefits from '@/components/pages/homepage/Benefits'
import RecommendCourse from '@/components/pages/homepage/RecommendCourse'
import HeaderHomePage from '@/components/layout/HeaderHomePage'
import Hero from '../../components/pages/homepage/Hero'
const HomePage = () => {
  return (
    <>
      <HeaderHomePage />
      <div className='container mx-auto'>
        <Hero />
        <Benefits />
        <RecommendCourse />
      </div>
    </>
  )
}

export default HomePage
