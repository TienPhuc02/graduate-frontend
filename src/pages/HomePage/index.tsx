import Benefits from '@/components/feature/homepage/Benefits'
import HeaderHomePage from '@/components/layout/HeaderHomePage'

const HomePage = () => {
  return (
    <>
      <HeaderHomePage />
      <div className='container mx-auto mt-[100px]'>
        <Benefits />
      </div>
    </>
  )
}

export default HomePage
