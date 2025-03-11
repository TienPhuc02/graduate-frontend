import RecommendCourse from '@/components/pages/HomePage/RecommendCourse.tsx'
import Hero from '@/components/pages/HomePage/Hero.tsx'
import Benefits from '@/components/pages/HomePage/Benefits.tsx'
import FAQ from '@/components/pages/HomePage/FAQ.tsx'

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
