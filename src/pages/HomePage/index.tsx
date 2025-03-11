import Benefits from "@/components/pages/HomePage/Benefits"
import FAQSection from "@/components/pages/HomePage/FAQ"
import Hero from "@/components/pages/HomePage/Hero"
import RecommendCourse from "@/components/pages/HomePage/RecommendCourse"

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
