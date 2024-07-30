'use client'
import { AnimatedTitle } from '@/components/ui/animated-title'
import { motion, useInView } from 'framer-motion'
import Image from 'next/image'
import { useRef } from 'react'
import { Element } from 'react-scroll'
import { containerVariants } from './components/stagger'

/* eslint-disable react/react-in-jsx-scope */
export const TataCaraModule = () => {
  const ref = useRef(null)
  const inView = useInView(ref, { once: false })

  return (
    <Element name="tata-cara">
      <main
        id="tata cara"
        className="font-manrope flex flex-col gap-6 md:gap-10"
      >
        <AnimatedTitle>
          Gimana Tuh <br /> Tata Cara
          <b className="text-purple-primary"> Pemilihannya?</b>
        </AnimatedTitle>
        <motion.div className="flex justify-center">
          <motion.div
            ref={ref}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex gap-5 w-full justify-center flex-wrap max-w-[1000px]"
          >
            {[1, 2, 3, 4, 5, 6].map((item) => {
              return (
                <motion.div
                  whileHover={{
                    rotateZ: 10,
                    marginTop: -10,
                    transition: { duration: 0.2 },
                  }}
                  initial={{ scale: 0 }}
                  animate={{ scale: inView ? 1 : 0 }}
                  whileTap={{ scale: 0.9 }}
                  key={item}
                  className="cursor-pointer transition-all hover:shadow-lg hover:scale-105 hover:rotate-6   duration-200 w-fit h-fit bg-white border-2 border-black/10 p-8 md:p-12 rounded-xl shadow-sm"
                >
                  <div className="flex flex-col w-full gap-2">
                    <div className="w-[200px] aspect-square relative overflow-hidden rounded-xl">
                      <Image
                        src={'/scc.jpeg'}
                        alt="SCC"
                        layout="fill"
                        objectFit="cover"
                        className="overflow-hidden"
                      />
                      <div className="w-10 aspect-square absolute bg-purple-primary top-5 left-5 rounded-full flex items-center justify-center font-bold text-white">
                        {item}
                      </div>
                    </div>
                    <h3 className="w-[200px] text-center font-bold text-lg">
                      Datang ke Tempat Pemilihan Suara
                    </h3>
                  </div>
                </motion.div>
              )
            })}
          </motion.div>
        </motion.div>
      </main>
    </Element>
  )
}
