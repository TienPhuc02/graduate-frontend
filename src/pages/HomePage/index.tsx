import Benefits from '@/components/pages/HomePage/Benefits'
import RecommendCourse from '@/components/pages/HomePage/RecommendCourse'
import Hero from '../../components/pages/HomePage/Hero'
import FAQSection from '@/components/pages/HomePage/FAQ'
const HomePage = () => {
  return (
    <>
      <div className='container mx-auto pb-[200px]'>
        <Hero />
        <Benefits />
        <RecommendCourse />
        <FAQSection />
      </div>
    </>
  )
}

export default HomePage
