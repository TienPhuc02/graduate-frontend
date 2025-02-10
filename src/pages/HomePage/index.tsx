import Benefits from '@/components/feature/homepage/Benefits'
import RecommendCourse from '@/components/feature/homepage/RecommendCourse'
import HeaderHomePage from '@/components/layout/HeaderHomePage'
import Hero from '../../components/feature/homepage/Hero'

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
