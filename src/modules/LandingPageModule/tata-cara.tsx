'use client'
import { AnimatedTitle } from '@/components/ui/animated-title'
import { motion, useInView } from 'framer-motion'
import Image from 'next/image'
import { useRef } from 'react'
import { Element } from 'react-scroll'
import { containerVariants } from './components/stagger'

/* eslint-disable react/react-in-jsx-scope */
interface tatacaraProps {
  cara: string;
  number: number;
}

const tatacaraItems : tatacaraProps [] = [
  {
    number: 1,
    cara: 'Datang ke lokasi (lapangan tenis) sesuai jadwal yang diberikan oleh panitia.'
  },
  { 
    number: 2,
    cara: 'Minta Token untuk melakukan pemilihan (Token hanya berlaku selama 10 menit).'
  },
  {
    number: 3,
    cara: 'Pergi ke bilik suara yang telah di sediakan panitia.'
  },
  {
    number: 4,
    cara: 'Masukan NISN, NIS dan Token pada kolom yang telah di sediakan.'
  },
  {
    number: 5,
    cara: 'Pilihlah Pasangan Calon yang terbaik menurutmu dan logout jika sudah selesai memilih.'
  },
  {
    number: 6,
    cara: 'Celupkan jari ke tinta cair yang di sediakan oleh panitia sebagai tanda kamu telah melakukan voting.'
  }
]

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
          {
            tatacaraItems.map((item, index) => {
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
                key={index} 
                className="cursor-pointer transition-all hover:shadow-lg hover:scale-105 hover:rotate-6 duration-200 w-fit h-[250px] bg-white border-2 border-black/10 p-5 rounded-xl shadow-sm"
              >
                <div className="flex flex-col w-full gap-2 items-center">
                    <div className="w-10 aspect-square bg-purple-primary rounded-full flex items-center justify-center font-bold text-white">
                      {item.number}
                    </div> 
                  </div>
                  <h3 className="w-[200px] text-center font-bold text-lg mt-3" >
                    {item.cara}
                  </h3>
              </motion.div>
              )
            }) 
          }
          </motion.div>
        </motion.div>
      </main>
    </Element>
  )
}
