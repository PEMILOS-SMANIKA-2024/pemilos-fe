/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/react-in-jsx-scope */
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { Element } from 'react-scroll'

interface PaslonCardProps {
  item: paslonProps
  openVisiMisi: number | null
  setOpenVisiMisi: (item: number | null) => void
}

const cardVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { type: 'spring', stiffness: 300, damping: 20 },
  },
}

const imageVariants = {
  hover: { scale: 1.1 },
}

const textVariants = {
  hover: { color: '#6149D4' },
}

const arrowVariants = {
  hover: { x: 5 }, // Move the arrow to the right on hover
  click: { x: 10 }, // Move the arrow further on click
}

interface paslonProps {
  nomorUrut: number
  nama: string
  image: string
  visi: string
  misi: string[]
  videoLink?: string
}

const paslonData: paslonProps[] = [
  {
    nomorUrut: 1,
    nama: 'Andrew & Aryo',
    image: 'osis-1.png',
    visi: 'Menjadikan OSIS sebagai organisasi yang inspiratif, kreatif, dan inovatif, guna menciptakan lingkungan sekolah yang harmonis, berprestasi, dan berbudaya.',
    misi: [
      'Misi dari Andrew & Aryo adalah memperjuangkan hak-hak siswa dan siswi SMANIKA',
      'Misi kedua dari Andrew & Aryo adalah memperjuangkan hak-hak siswa dan siswi SMANIKA',
      'Misi ketiga dari Andrew & Aryo adalah memperjuangkan hak-hak siswa dan siswi SMANIKA',
    ],
    videoLink:
      'https://www.youtube.com/embed/dQw4w9WgXcQ?si=B8OGkM156KWZ01wQ?autoplay=1',
  },
  {
    nomorUrut: 2,
    nama: 'Dode /& Reksa',
    image: 'osis-2.png',
    visi: 'Menjadikan OSIS sebagai organisasi yang inspiratif, kreatif, dan inovatif, guna menciptakan lingkungan sekolah yang harmonis, berprestasi, dan berbudaya.',
    misi: [
      'Misi dari Dode & Reksa adalah memperjuangkan hak-hak siswa dan siswi SMANIKA',
      'Misi kedua dari Dode & Reksa adalah memperjuangkan hak-hak siswa dan siswi SMANIKA',
      'Misi ketiga dari Dode & Reksa adalah memperjuangkan hak-hak siswa dan siswi SMANIKA',
    ],
    videoLink:
      'https://www.youtube.com/embed/dQw4w9WgXcQ?si=B8OGkM156KWZ01wQ?autoplay=1',
  },
  {
    nomorUrut: 3,
    nama: 'Ganjar & Mahfud',
    image: 'osis-3.png',
    visi: 'Menjadikan OSIS sebagai organisasi yang inspiratif, kreatif, dan inovatif, guna menciptakan lingkungan sekolah yang harmonis, berprestasi, dan berbudaya.',
    misi: [
      'Misi dari Ganjar & Mahfud',
      'Misi kedua dari Ganjar & Mahfud',
      'Misi ketiga dari Ganjar & Mahfud',
    ],
    videoLink:
      'https://www.youtube.com/embed/dQw4w9WgXcQ?si=B8OGkM156KWZ01wQ?autoplay=1',
  },
]

export const VisiMisiModule = () => {
  const [openVisiMisi, setOpenVisiMisi] = useState<number | null>(1)

  const PaslonCard: React.FC<PaslonCardProps> = ({
    item,
    openVisiMisi,
    setOpenVisiMisi,
  }) => {
    const handleClick = () => {
      if (typeof openVisiMisi === 'number' && openVisiMisi === item.nomorUrut) {
        setOpenVisiMisi(null)
      } else {
        setCurrent(item.nomorUrut)
        setOpenVisiMisi(item.nomorUrut)
      }
    }

    return (
      <motion.div
        key={item.nomorUrut}
        className="bg-white border-2 z-20 border-black/10 shadow-md rounded-xl p-10 md:p-12 flex flex-col items-center gap-5 duration-300 cursor-pointer"
        variants={cardVariants}
        animate="visible"
        whileHover="hover"
        whileTap="click"
        onClick={handleClick}
      >
        <motion.div
          className="flex relative w-full h-52 bg-white"
          variants={imageVariants}
        >
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
        </motion.div>
        <div className="flex flex-col gap-2">
          <h1 className="font-bold text-xl text-black-primary">{item.nama}</h1>
          <p className="font-medium text-black-secondary text-sm">
            Calon Ketua dan Wakil Ketua OSIS Nomor Urut {item.nomorUrut}
          </p>
          <div className="mt-4 flex gap-2 duration-300">
            <motion.span
              className="font-bold text-sm duration-200"
              variants={textVariants}
            >
              Cek Visi Misi
            </motion.span>
            <motion.div variants={arrowVariants}>
              <ArrowRight className="w-4" />
            </motion.div>
          </div>
        </div>
      </motion.div>
    )
  }

  // Carousel Setup
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
    <Element name="visi-misi">
      <section className="font-manrope flex flex-col gap-10 my-10 relative">
        <h1 className="font-extrabold text-3xl md:text-5xl text-center">
          Yuk, Cek <b className="text-purple-primary">Visi Misi</b>
          <br />
          Masing-masing <b className="text-purple-primary">Calon</b>
        </h1>
        {/* <VisiMisiCards /> */}
        <div className="flex flex-col gap-10">
          <div className="hidden lg:flex flex-col lg:flex-row gap-5 justify-center">
            {paslonData.map((item, index) => (
              <motion.div
                key={index}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                transition={{ duration: 0.5, delay: index * 0.2 }}
              >
                <PaslonCard
                  item={item}
                  openVisiMisi={openVisiMisi}
                  setOpenVisiMisi={setOpenVisiMisi}
                />
              </motion.div>
            ))}
          </div>
          <div className="flex flex-col gap-4 items-center w-full lg:hidden">
            <Carousel className="w-full max-w-xs" setApi={setApi}>
              <CarouselContent>
                {paslonData.map((item, index) => (
                  <CarouselItem key={index}>
                    <motion.div
                      variants={cardVariants}
                      initial="hidden"
                      animate="visible"
                    >
                      <PaslonCard
                        item={item}
                        openVisiMisi={openVisiMisi}
                        setOpenVisiMisi={setOpenVisiMisi}
                      />
                    </motion.div>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
            <div className="w-full flex justify-center">
              {current} / {count}
            </div>
          </div>
          <AnimatePresence>
            {openVisiMisi != null && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="bg-white border-2 border-black/10 rounded-xl p-7 md:p-12 flex flex-col gap-5 duration-300 hover:shadow-lg hover:scale-[102%] delay-100 cursor-pointer"
              >
                <h1 className="font-extrabold text-2xl text-black-primary">
                  VISI
                </h1>
                <p className="font-semibold text-black-secondary">
                  {paslonData[openVisiMisi - 1].visi}
                </p>
                <h1 className="font-extrabold text-2xl text-black-primary">
                  MISI
                </h1>
                {paslonData[openVisiMisi - 1].misi.map((item, index) => {
                  return (
                    <div
                      className="w-full px-5 md:px-10 py-5 text-white bg-purple-primary rounded-md cursor-pointer hover:scale-[101%] duration-150 transition-all"
                      key={index}
                    >
                      <p className="font-medium text-sm">{item}</p>
                    </div>
                  )
                })}
                <iframe
                  className="w-full aspect-video self-stretch md:min-h-96 rounded-md"
                  src="https://www.youtube.com/embed/dQw4w9WgXcQ?si=B8OGkM156KWZ01wQ?autoplay=1"
                  allowFullScreen
                  allow="autoplay; encrypted-media"
                  title="Product Overview Video"
                  aria-hidden="true"
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </Element>
  )
}
