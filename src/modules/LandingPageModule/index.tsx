/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/react-in-jsx-scope */
import { Button } from '@/components/ui/button'
import useToken from '@/custom-hook/useToken'
import { ArrowDown, User, Vote } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Background } from './components/background'
import { motion } from 'framer-motion'
import { childVariants, containerVariants } from './components/stagger'
import { Navbar } from '@/components/ui/navbar'

export default function LandingPageModule() {
  const { push } = useRouter()
  const { token, decoded } = useToken()

  const text1 =
    'Website Resmi Pemilihan Calon Ketua dan Wakil Ketua OSIS SMA Negeri 1 Sumbawa Besar Periode 2024/2025'.split(
      ' '
    )

  return (
    <section className="w-full h-screen relative overflow-hidden flex justify-center items-center font-manrope">
      <Navbar />
      <Background />
      {token && (
        <div className="fixed top-4 right-4 z-30">
          <Button variant={'outline'} className="px-10 py-5 bg-white">
            <User />
            Hello, {decoded.name.split(' ').slice(0, 2).join(' ')}!
          </Button>
        </div>
      )}
      <div className="gap-4 z-20 flex flex-col items-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{
            type: 'spring',
            stiffness: 260,
            damping: 20,
          }}
        >
          <Image
            src={'/logo-smanika-osis.png'}
            alt="SMANIKA OSIS Logo"
            width={100}
            height={200}
            className=""
          />
        </motion.div>
        <motion.div
          className="w-full flex justify-center items-center"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{
            type: 'spring',
            stiffness: 260,
            damping: 20,
          }}
        >
          <motion.div
            whileHover={{
              scale: 1.1,
              transition: { duration: 0.2 },
            }}
            className="w-full flex justify-center items-center"
          >
            <Image
              src={'/smanika-memilih.png'}
              alt="SMANIKA Memilih"
              width={500}
              height={200}
              className="w-[70%] sm:w-[60%] md:w-[50%] lg:w-[60%]"
            />
          </motion.div>
        </motion.div>
        <div className="font-manrope font-semibold w-[70%] text-center">
          {text1.map((el, i) => (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                duration: 0.25,
                delay: i / 10,
              }}
              key={i}
            >
              {el}{' '}
            </motion.span>
          ))}
        </div>
        <motion.div
          className="flex flex-col sm:flex-row gap-4"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={childVariants}>
            <Button variant={'outline'} isAnimated>
              <ArrowDown className="w-5" />
              <span>Lihat Calon</span>
            </Button>
          </motion.div>
          <motion.div variants={childVariants}>
            <Button
              isAnimated
              className="w-full"
              onClick={() => {
                const token = localStorage.getItem('token')

                if (token) {
                  push('/vote')
                  return
                }

                push('/login')
              }}
            >
              <Vote className="w-5" />
              <span>{token ? 'Vote' : 'Login'}</span>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
