import CardAnimate from '@/components/ui/card-animate'
import { TextAnimate } from '@/components/ui/text-animate'
import { motion } from 'framer-motion'
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
      <TextAnimate text='Benefits of Joining EduGo' className='text-center' type='rollIn'></TextAnimate>
      <motion.div className='grid grid-cols-3 gap-[30px]' variants={container} initial='hidden' animate='visible'>
        {[...Array(6)].map((_, index) => (
          <CardAnimate key={index} />
        ))}
      </motion.div>
    </>
  )
}

export default Benefits
