import Benefits from '@/components/pages/HomePage/Benefits'
import RecommendCourse from '@/components/pages/HomePage/RecommendCourse'
// import HeaderHomePage from '@/components/layout/HeaderHomePage'
import Hero from '../../components/pages/HomePage/Hero'
const HomePage = () => {
  return (
    <>
      {/* <HeaderHomePage /> */}
      <div className='container mx-auto'>
        <Hero />
        <Benefits />
        <RecommendCourse />
      </div>
    </>
  )
}

export default HomePage
