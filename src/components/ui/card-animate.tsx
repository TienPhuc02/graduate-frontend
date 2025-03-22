import { motion } from 'framer-motion'
export default function CardAnimate({
  title,
  description,
  icon
}: {
  title: string
  description: string
  icon: React.ReactNode
}) {
  return (
    <motion.div
      className='w-full mx-auto cursor-pointer'
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.05 }}
    >
      <div>
        <div className='w-full mx-auto cursor-pointer !h-[150px]'>
          <div className='bg-white dark:bg-gray-900 rounded-lg shadow-md overflow-hidden transition-transform duration-300 ease-in-out h-full group-hover:scale-105'>
            <div className='p-6'>
              <div className='flex gap-[10px] items-center'>
                {icon}
                <h3 className='text-lg font-medium text-gray-900 dark:text-gray-100'>{title}</h3>
              </div>
              <p className='text-gray-600 dark:text-gray-400 mt-2'>{description}</p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
