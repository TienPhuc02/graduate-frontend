import { motion } from 'framer-motion'
import { TextAnimate } from '../../ui/text-animate'
import { BENEFITS } from '../../../constants'
import CardAnimate from '../../ui/card-animate'
const container = {
  hidden: { opacity: 1, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.2
    }
  }
}
const Benefits = () => {
  return (
    <>
      <TextAnimate text='Lợi ích khi tham gia EduGo' className='text-center text-3xl' type='rollIn'></TextAnimate>
      <motion.div className='grid grid-cols-3 gap-[30px]' variants={container} initial='hidden' animate='visible'>
        {BENEFITS.map((_, index) => {
          return <CardAnimate icon={_.icon} key={index} title={_.title} description={_.description} />
        })}
      </motion.div>
    </>
  )
}

export default Benefits
