import Benefits from '../../components/pages/homepage/Benefits'
import FAQ from '../../components/pages/homepage/FAQ'
import Hero from '../../components/pages/homepage/Hero'
import RecommendCourse from '../../components/pages/homepage/RecommendCourse'

const HomePage = () => {
  return (
    <>
      <div className='container'>
        <Hero />
        <Benefits />
        <RecommendCourse />
        <FAQ />
      </div>
    </>
  )
}

export default HomePage
