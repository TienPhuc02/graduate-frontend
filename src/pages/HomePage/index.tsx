import Benefits from '@/components/feature/homepage/Benefits'
import RecommendCourse from '@/components/feature/homepage/RecommendCourse'
import HeaderHomePage from '@/components/layout/HeaderHomePage'

const HomePage = () => {
  return (
    <>
      <HeaderHomePage />
      <div className='container mx-auto'>
        <Benefits />
        <RecommendCourse />
      </div>
    </>
  )
}

export default HomePage
