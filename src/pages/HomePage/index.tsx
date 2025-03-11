import RecommendCourse from '../../components/pages/HomePage/RecommendCourse'
import Hero from '../../components/pages/HomePage/Hero'
import Benefits from '../../components/pages/HomePage/RecommendCourse'
import FAQ from '../../components/pages/HomePage/FAQ'

const HomePage = () => {
  return (
    <>
      <div className='container mx-auto pb-[200px]'>
        <Hero />
        <Benefits />
        <RecommendCourse />
        <FAQ />
      </div>
    </>
  )
}

export default HomePage
