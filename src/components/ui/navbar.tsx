'use client'
/* eslint-disable react/react-in-jsx-scope */
import useToken from '@/custom-hook/useToken'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Link } from 'react-scroll'
import { Button } from './button'

export const Navbar = () => {
  const { push } = useRouter()
  const [underlineVisible, setUnderlineVisible] = useState(false)
  const { token } = useToken()

  const handleTextAnimationComplete = () => {
    setUnderlineVisible(true)
  }

  const [navItems, setNavItems] = useState([
    'Home',
    'Vote',
    'Visi Misi',
    'Tata Cara',
    'FAQ',
  ])

  useEffect(() => {
    if (token === '') {
      setNavItems(['Home', 'Visi Misi', 'Tata Cara', 'FAQ'])
    }
  }, [])

  const [open, setOpen] = useState(false)

  return (
    <div className="absolute w-full max-w-[1920px] px-10 md:px-20 top-10 z-30">
      <AnimatePresence>
        <div
          className={`absolute p-10 w-fit lg:hidden bg-white right-10 md:right-20 top-24 shadow-md rounded-md flex flex-col font-manrope ${open ? 'flex' : 'hidden'}`}
        >
          <div className="gap-2 flex flex-col font-semibold">
            {navItems.map((item, index) =>
              ['visi misi', 'tata cara', 'faq', 'home'].includes(
                item.toLowerCase()
              ) ? (
                <Link
                  key={index}
                  activeClass="active"
                  to={item.toLowerCase()}
                  spy={true}
                  smooth={true}
                  offset={-150}
                  duration={500}
                >
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5, delay: index * 0.2 }}
                    className="group transition duration-300 cursor-pointer list-none"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.9 }}
                    onAnimationComplete={handleTextAnimationComplete}
                  >
                    {item}
                    {underlineVisible && (
                      <motion.span
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        exit={{ scaleX: 0 }}
                        transition={{ duration: 0.5 }}
                        className="block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-purple-secondary"
                      />
                    )}
                  </motion.li>
                </Link>
              ) : (
                <motion.a
                  href={`/${item.toLowerCase() !== 'home' ? item.toLowerCase() : ''}`}
                  key={index}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  className="group transition duration-300 cursor-pointer list-none"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.9 }}
                  onAnimationComplete={handleTextAnimationComplete}
                >
                  {item}
                  {underlineVisible && (
                    <motion.span
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      exit={{ scaleX: 0 }}
                      transition={{ duration: 0.5 }}
                      className="block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-purple-secondary"
                    />
                  )}
                </motion.a>
              )
            )}
          </div>
          {token === '' ? (
            <Button
              onClick={() => {
                push('/login')
              }}
              variant={'default'}
              className="hover:scale-[1.05] transition duration-200 ease-in-out hidden lg:flex"
            >
              Login
            </Button>
          ) : null}
        </div>
      </AnimatePresence>
      <nav
        className={`bg-white px-10 w-full h-20 border shadow-md rounded-xl flex items-center z-30 justify-between font-manrope `}
      >
        <div className="font-semibold flex gap-10 items-center">
          <Image
            src={'/logo-smanika-osis.png'}
            alt="SMANIKA OSIS Logo"
            width={50}
            height={200}
            className="w-20 h-14"
          />
          <div className={`gap-10 hidden lg:flex`}>
            {navItems.map((item, index) =>
              ['visi misi', 'tata cara', 'faq', 'home'].includes(
                item.toLowerCase()
              ) ? (
                <Link
                  key={index}
                  activeClass="active"
                  to={item.toLowerCase()}
                  spy={true}
                  smooth={true}
                  offset={-150}
                  duration={500}
                >
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5, delay: index * 0.2 }}
                    className="group transition duration-300 cursor-pointer list-none"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.9 }}
                    onAnimationComplete={handleTextAnimationComplete}
                  >
                    {item}
                    {underlineVisible && (
                      <motion.span
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        exit={{ scaleX: 0 }}
                        transition={{ duration: 0.5 }}
                        className="block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-purple-secondary"
                      />
                    )}
                  </motion.li>
                </Link>
              ) : (
                <motion.a
                  href={`/${item.toLowerCase() !== 'home' ? item.toLowerCase() : ''}`}
                  key={index}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  className="group transition duration-300 cursor-pointer list-none"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.9 }}
                  onAnimationComplete={handleTextAnimationComplete}
                >
                  {item}
                  {underlineVisible && (
                    <motion.span
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      exit={{ scaleX: 0 }}
                      transition={{ duration: 0.5 }}
                      className="block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-purple-secondary"
                    />
                  )}
                </motion.a>
              )
            )}
          </div>
        </div>
        <div>
          {token === '' ? (
            <Button
              onClick={() => {
                push('/login')
              }}
              variant={'default'}
              className="hover:scale-[1.05] transition duration-200 ease-in-out hidden lg:flex"
            >
              Login
            </Button>
          ) : null}
        </div>
        <div className="w-[24px] h-[24px] flex gap-2 flex-col cursor-pointer lg:hidden">
          <Menu
            onClick={() => {
              setOpen(!open)
            }}
          />
        </div>
      </nav>
    </div>
  )
}
