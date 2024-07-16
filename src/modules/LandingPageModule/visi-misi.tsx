/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import Image from 'next/image'
import { useEffect, useState } from 'react'

interface PaslonCardProps {
  item: number
}

/* eslint-disable react/react-in-jsx-scope */
export const VisiMisiSection = () => {
  const [openVisiMisi, setOpenVisiMisi] = useState<number | null>(null)
  const PaslonCard: React.FC<PaslonCardProps> = ({ item }) => {
    return (
      <div
        key={item}
        className="bg-white border-2 border-black rounded-md  p-10 flex flex-col items-center gap-5 duration-300 hover:shadow-lg delay-100 cursor-pointer"
      >
        <div className="flex relative w-full h-52 hover:opacity-80 duration-300">
          <Image
            src={'/osis-2.png'}
            alt="OSIS Logo"
            width={300}
            height={300}
            className="w-40 absolute bottom-0 right-0 z-20"
          />
          <Image
            src={'/osis-1.png'}
            alt="OSIS Logo"
            width={300}
            height={300}
            className="w-40 absolute bottom-0"
          />
        </div>
        <div className="">
          <h1 className="font-bold text-xl">Andrew & Aryo</h1>
          <p className="font-medium text-[#5F5F5F]">
            Calon Ketua dan Wakil Ketua OSIS Nomor Urut {item + 1}
          </p>
          <div className="mt-4 flex gap-2 hover:gap-5 duration-300">
            <span
              className="font-bold text-sm hover:text-[#6149D4] duration-200"
              onClick={() => {
                if (typeof openVisiMisi === 'number' && openVisiMisi === item) {
                  setOpenVisiMisi(null)
                } else {
                  setOpenVisiMisi(item)
                }
              }}
            >
              Cek Visi Misi
            </span>
            <ArrowRight className="w-4" />
          </div>
        </div>
      </div>
    )
  }

  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!api) {
      return
    }

    setCount(api.scrollSnapList().length)
    setCurrent(api.selectedScrollSnap() + 1)

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap() + 1)
    })
  }, [api])

  return (
    <section className="font-manrope px-10 flex flex-col gap-10 my-10">
      <h1 className="font-extrabold text-5xl">Yuk, cek Visi Misi!</h1>
      <div className="hidden lg:flex flex-col lg:flex-row justify-around gap-5">
        {[1, 2, 3].map((item) => {
          return <PaslonCard item={item} key={item} />
        })}
      </div>
      <div className="flex flex-col gap-4 items-center w-full lg:hidden">
        <Carousel className="w-full max-w-xs" setApi={setApi}>
          <CarouselContent>
            {Array.from({ length: 5 }).map((_, index) => (
              <CarouselItem key={index}>
                <PaslonCard item={index} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
        <div className="w-full flex justify-center">
          {current} / {count}
        </div>
      </div>
      <AnimatePresence>
        {openVisiMisi && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="bg-white border-2 border-black rounded-md p-10 flex flex-col gap-5 duration-300 hover:shadow-lg hover:scale-[102%] delay-100 cursor-pointer"
          >
            <h1 className="font-bold text-xl">Visi</h1>
            <p className="font-medium text-[#5F5F5F]">
              Visi dari Andrew & Aryo adalah mewujudkan SMANIKA yang lebih baik
            </p>
            <h1 className="font-bold text-xl">Misi</h1>
            <p className="font-medium text-[#5F5F5F]">
              Misi dari Andrew & Aryo adalah memperjuangkan hak-hak siswa dan
              siswi SMANIKA
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
