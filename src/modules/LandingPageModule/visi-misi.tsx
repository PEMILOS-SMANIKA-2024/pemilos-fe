'use client'
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/react-in-jsx-scope */
import { AnimatedSection } from '@/components/ui/animated-section'
import { AnimatedTitle } from '@/components/ui/animated-title'
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

const cardVariants = {
  hidden: {
    opacity: 0,
    scale: 0.9,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { type: 'spring', stiffness: 300, damping: 20 },
  },
}

interface paslonProps {
  nomorUrut: number
  nama: string
  image: string
  visi: string
  misi: string[]
  proker: string[]
}

const paslonData: paslonProps[] = [
  {
    nomorUrut: 1,
    nama: 'Zulfikar & Embun',
    image: 'osis-1.png',
    visi: 'Mewujudkan siswa-siswi SMAN 1 Sumbawa Besar yang berkarakter ( 3K + 3R ) Kreatif dalam pemunculan gagasan, Kolaboratif dengan tindakan, Komunikatif melalui penyampaian pesan, Religius pada kenyakinan, Relevan melalui bantuan, dan Revolusioner dalam menciptakan perubahan.',
    misi: [
      '1. Menciptakan toleransi antar umat beragama dalam menciptakan ketenangan dan perdamaian antar siswa-siswi SMAN 1 Sumbawa Besar.',
      '2. Memfasilitasi, mengembangkan, dan mengapresiasi minat dan bakat siswa/i SMAN 1 Sumbawa Besar dalam bidang olahraga, seni/budaya, keilmuan, keagamaan, dan peminatan bakat lainnya.',
      '3. Melibatkan seluruh anggota organisasi dan seluruh warga sekolah untuk menerapkan budaya kolaboratif dalam mencapai tujuan yang positif.',
      '4. Meningkatkan kinerja OSIS SMAN 1 Sumbawa Besar dengan pemanfaatan sistem teknologi komunikasi dan informasi dalam tujuan kemajuan sekolah.',
      '5. Memperkuat kehormanisan antar pengurus dan seluruh siswa-siswi sekolah untuk mewujudkan karakter produktif dalam berorganisasi.',
      '6. Menjadikan program kerja OSIS SMAN 1 Sumbawa Besar yang bermanfaat bagi sekolah dan masyarakat.',
    ],
    proker: [
      '1. SMANIKA DUTION - Duty Inspiration : Kompetisi Duta antar kelas X.XI.XII melalui perwakilan satu siswa yang menjadi role model dalam SMAN 1 SUMBAWA BESAR melalui bakat dan keahlian yang dimiliki oleh masing masing siswa-siswi.',
      '2. SMANIKA ENPRETION - Entreprise Competition : Kompetisi Memasak antar kelas X.XI.XII dalam membentuk jiwa kewirausahaan dan Kompetisi Berjualan dari hasil karya memasak peserta dalam menciptakan jiwa bisnis di lingkungan sekolah.',
      '3. SMANIKA ESCORATION - Extra School Collaboration : Lomba Antar Sekolah Menengah Atas dalam bidang komunikasi, kreativitas, keahlian akademik maupun non-akademik.',
      '4. SMANIKA FESDATION - Festival Ramadhan and Action : Kompetisi Bisnis Ramadhan dalam mengembangkan jiwa wirausaha pada saat bulan suci Ramadhan. Berbagi Takjil Bareng kelas X,XI dalam meraih keberkahan bulan suci Ramadhan dengan Bersedekah antar sesama. Buka Bersama Bareng kepengurusan OSIS-MPK REVION SMANIKA dalam menunjukkan kebersamaan dan kekompakan organisasi. Lomba Ramadhan Bareng seluruh siswa-siswi melalui lomba Kisah 25 Nabi, dan Ceramah Keagamaan.',
      '5. SMANIKA DAICLATION - Daily Class Selection : Seleksi Antar Kelas dalam membentuk kelas yang memiliki standar kebersihan dan ketertiban melalui seleksi serempak dengan penilaian yang berisikan poin poin dengan hitungan yang berstandar tinggi.',
      '6. SMANIKA FONPRETION - Food Enterpeneur and Action Bisnis : Organisasi dalam mengupayakan kedekatan akan masyarakat di luar lingkungan sekolah melalui bisnis berdagang dan lain-lain.',
      '7. SMANIKA INVETION - Integrity Value Innovation : \n Kegiatan rutin sekolah akhir semester melalui permainan dan lomba-lomba seperti Futsal, E-Sport, Kreasi budaya sumbawa, kreasi Olahraga, bidang komunikasi, dan lomba antar bapak/ibu guru SMAN 1 Sumbawa Besar',
    ],
  },
  {
    nomorUrut: 2,
    nama: 'Arvel & Icha',
    image: 'osis-2.png',
    visi: 'menjadikan OSIS sebagai wadah aspirasi dan garda terdepan dalam mewujudkan generasi emas yang unggul, berdaya saing tinggi, baik dalam segi akademik maupun non akademik dengan pemerbdayaan sumber daya pelajar yang berkompetensi global menuju transformasi pendidikan dan selaras untuk mewujudkan smanika yang berprestasi, partisipasi, kreasi inovasi, serta untuk mencapai generasi emas 2045.',
    misi: [
      '1. Menciptakan lingkungan SMANIKA menjadi lingkungan yang bersih, aman dan sehat, untuk membantu sekolah mewujudkan sekolah adiwiyata.',
      '2. Mengadakan kegiatan yang membangun karakter siswa melalui program volunteerisme, kegiatan sosial, dan budaya.',
      '3. Mengembangkan program yang mengintegrasikan ilmu pengetahuan, teknologi, dan seni untuk mengasah kreativitas siswa.',
      '4. menciptakan kolaborasi ekstrakurikuler dalam pelaksanaan kegiatan sekolah.',
      '5. Mengoptimalkan dan mengembangkan program kerja osis  sudah terlaksana atau belum terlaksana di kepungurusan osis sebelumnya.',
      '6. Memberikan kebebasan berekspresi, berpendapat dan berkreasi yang bertanggung jawab terhadapa siswa siswi sma negeri 1 sumbawa besar.',
    ],
    proker: [
      '1. SmanikaEntrepreneurship : Pameran kewirausahaan yang memamerkan produk dalam rangka menyukseskan pertumbuhan sektor ekonomi kreatif di mana tiap kelas akan menampilkan pertunjukan dan membuka stand sesuai dengan sektor-sektor ekonomi kreatif yang dipilih.',
      '2. SmanikaTalentShow: Pertunjukan bakat yang memberikan platform bagi siswa untuk menunjukkan keahlian mereka seperti Tari, Vocal, Catwalk, Monolog, Puisi.',
      '3. SmanikaChampionship: kompetisi antar sekolah menengah atas yang diwakili oleh tim terbaik pada sekolah berdasarkan hasil seleksi internal sekolah yang diadakan terlebih dahulu dengan tujuan meningkatkan solidaritas dan sportivitas antar sekolah seperti turnamen mobile legends, free fire, pubg dan kompetisi olahraga seperti futsal, volly, basket, badminton.',
      '4. SmanikaLangFest: Mengadakan lomba-lomba yang berkaitan dengan bahasa, seperti lomba pidato dalam berbagai bahasa, lomba spelling bee, dan lomba debat bilingual.',
      '5. SmanikaSSC: (Super Smart Competition) Mengasah keterampilan akademik, logika, dan kreativitas siswa melalui kompetisi yang menantang.',

    ],
  },
]

export const VisiMisiModule = () => {
  const [openVisiMisi, setOpenVisiMisi] = useState<number | null>(null)

  const PaslonCard: React.FC<PaslonCardProps> = ({
    item,
    openVisiMisi,
    setOpenVisiMisi,
  }) => {
    const handleClick = () => {
      if (typeof openVisiMisi === 'number' && openVisiMisi === item.nomorUrut) {
        setOpenVisiMisi(null)
      } else {
        setCurrent(item.nomorUrut - 1)
        setOpenVisiMisi(item.nomorUrut)
      }
    }

    return (
      <motion.div
        key={item.nomorUrut}
        className="bg-white border-2 z-20 border-black/10 shadow-md rounded-xl p-10 md:p-12 flex flex-col items-center gap-5 duration-300 cursor-pointer hover:scale-105"
        variants={cardVariants}
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
  const [current, setCurrent] = useState(1)

  useEffect(() => {
    if (!api) {
      return
    }

    setCurrent(api.selectedScrollSnap())

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap())
    })
  }, [api])

  return (
    <Element name="visi-misi">
      <AnimatedSection className="font-manrope flex flex-col gap-10 my-10 relative">
        <AnimatedTitle>
          Yuk, Cek <b className="text-purple-primary">Visi Misi</b>
          <br />
          Masing-masing <b className="text-purple-primary">Calon</b>
        </AnimatedTitle>
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
            <div className="w-full flex justify-center font-bold">
              {current + 1} / {paslonData.length}
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
                  {paslonData[current].visi}
                </p>
                <h1 className="font-extrabold text-2xl text-black-primary">
                  MISI
                </h1>
                {paslonData[current].misi.map((item, index) => {
                  return (
                    <div
                      className="w-full px-5 md:px-10 py-5 text-white bg-purple-primary rounded-md cursor-pointer hover:scale-[101%] duration-150 transition-all"
                      key={index}
                    >
                      <p className="font-medium text-sm">{item}</p>
                    </div>
                  )
                })}
                <h1 className="font-extrabold text-2xl text-black-primary">
                  PROGRAM KERJA
                </h1>
                {paslonData[current].proker.map((item, index) => {
                  return (
                    <div
                      className='w-full px-5 md:px-10 py-5 text-white bg-purple-primary rounded-md cursor-pointer hover:scale-[101%] duration-150 transition-all'
                      key={index}
                    >
                      <p className='font-medium text-sm'>{item}</p>
                    </div>
                  )
                })}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </AnimatedSection>
    </Element>
  )
}
