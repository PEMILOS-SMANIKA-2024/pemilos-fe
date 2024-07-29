'use client'
/* eslint-disable react/react-in-jsx-scope */
import { fetchWithToken } from '@/custom-hook/customFetch'
import useToken from '@/custom-hook/useToken'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown, DoorClosed, Menu } from 'lucide-react'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import { useState } from 'react'
import { scroller } from 'react-scroll'
import { Button } from './button'
import { Separator } from './separator'
import { toast } from './use-toast'
import { Popover, PopoverContent, PopoverTrigger } from './popover'

export const NavbarItem = ({
  name,
  onClick,
  index,
}: {
  name: string
  onClick: () => void
  index: number
}) => {
  const [underlineVisible, setUnderlineVisible] = useState(false)

  const handleTextAnimationComplete = () => {
    setUnderlineVisible(true)
  }
  return (
    <motion.li
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5, delay: index * 0.2 }}
      className="group transition duration-300 cursor-pointer list-none"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.9 }}
      onAnimationComplete={handleTextAnimationComplete}
      onClick={onClick}
    >
      {name}
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
  )
}

export const Navbar = () => {
  const { push } = useRouter()
  const { token, decoded } = useToken()
  const pathname = usePathname()

  const [open, setOpen] = useState(false)

  async function logout() {
    toast({
      title: 'Logout',
      description: 'Sedang logout ...',
      variant: 'default',
    })

    const response = await fetchWithToken(`/auth/logout/${decoded.id}`, token, {
      method: 'POST',
    })

    if (response.result) {
      localStorage.removeItem('token')
      toast({
        title: 'Logout',
        description: 'Berhasil logout',
        variant: 'default',
      })

      setTimeout(() => {
        push('/login')
      })
    } else {
      toast({
        title: 'Logout',
        description: 'Gagal logout',
        variant: 'destructive',
      })
      localStorage.removeItem('token')
      setTimeout(() => {
        push('/login')
      })
    }
  }

  return (
    <div className="absolute w-full max-w-[1920px] px-10 md:px-20 top-10 z-30">
      <AnimatePresence>
        <div
          className={`absolute p-10 w-fit lg:hidden bg-white right-10 md:right-20 top-24 shadow-md rounded-md flex flex-col font-manrope ${open ? 'flex' : 'hidden'}`}
        >
          <div className="gap-2 flex flex-col font-semibold text-black-secondary">
            {token !== '' && (
              <div className="flex flex-col text-purple-primary font-bold">
                Hello, {decoded.username}!
                <Separator />
              </div>
            )}
            <NavbarItem
              name="Home"
              onClick={() => {
                if (pathname === '/') {
                  scroller.scrollTo('home', {
                    smooth: true,
                    offset: -150,
                  })
                } else {
                  push('/')
                }
              }}
              index={0}
            />
            {token !== '' && (
              <NavbarItem
                name="Vote"
                onClick={() => {
                  if (pathname === '/vote') {
                    scroller.scrollTo('vote', {
                      smooth: true,
                      offset: -150,
                    })
                  } else {
                    push('/vote')
                  }
                }}
                index={1}
              />
            )}
            <NavbarItem
              name="Visi Misi"
              onClick={() => {
                if (pathname === '/vote') {
                  push('/')
                } else {
                  scroller.scrollTo('visi-misi', {
                    smooth: true,
                    offset: -50,
                  })
                }
              }}
              index={2}
            />
            <NavbarItem
              name="Tata Cara"
              onClick={() => {
                if (pathname === '/vote') {
                  push('/')
                } else {
                  scroller.scrollTo('tata-cara', {
                    smooth: true,
                    offset: -150,
                  })
                }
              }}
              index={3}
            />
            <NavbarItem
              name="FAQ"
              onClick={() => {
                if (pathname === '/vote') {
                  push('/')
                } else {
                  scroller.scrollTo('faq', {
                    smooth: true,
                    offset: -150,
                  })
                }
              }}
              index={4}
            />

            <div className="text-[#FF0000] flex-col cursor-pointer">
              <Separator />
              <div
                onClick={logout}
                className="flex gap-2 hover:scale-105 duration-200"
              >
                <DoorClosed className="w-4 " />
                <span>Logout</span>
              </div>
            </div>
          </div>
          {token === '' && (
            <Button
              onClick={() => {
                push('/login')
              }}
              variant={'default'}
              className="hover:scale-[1.05] transition duration-200 ease-in-out hidden lg:flex"
            >
              Login
            </Button>
          )}
        </div>
      </AnimatePresence>
      <motion.nav
        exit={{ opacity: 0, y: -20 }}
        transition={{
          type: 'spring',
          stiffness: 260,
          damping: 40,
          duration: 0.5,
        }}
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
          <div className="gap-10 hidden lg:flex">
            <NavbarItem
              name="Home"
              onClick={() => {
                if (pathname === '/') {
                  scroller.scrollTo('home', {
                    smooth: true,
                    offset: -150,
                  })
                } else {
                  push('/')
                }
              }}
              index={0}
            />
            {token !== '' && (
              <NavbarItem
                name="Vote"
                onClick={() => {
                  if (pathname === '/vote') {
                    scroller.scrollTo('vote', {
                      smooth: true,
                      offset: -150,
                    })
                  } else {
                    push('/vote')
                  }
                }}
                index={1}
              />
            )}
            <NavbarItem
              name="Visi Misi"
              onClick={() => {
                if (pathname === '/vote') {
                  push('/')
                } else {
                  scroller.scrollTo('visi-misi', {
                    smooth: true,
                    offset: -50,
                  })
                }
              }}
              index={2}
            />
            <NavbarItem
              name="Tata Cara"
              onClick={() => {
                if (pathname === '/vote') {
                  push('/')
                } else {
                  scroller.scrollTo('tata-cara', {
                    smooth: true,
                    offset: -150,
                  })
                }
              }}
              index={3}
            />
            <NavbarItem
              name="FAQ"
              onClick={() => {
                if (pathname === '/vote') {
                  push('/')
                } else {
                  scroller.scrollTo('faq', {
                    smooth: true,
                    offset: -150,
                  })
                }
              }}
              index={4}
            />
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
          ) : (
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger>
                <div
                  onClick={() => {
                    // setOpen(!open)
                  }}
                  className="hidden lg:flex gap-2 text-purple-primary font-bold cursor-pointer relative"
                >
                  <span>Hello, {decoded.username}!</span>
                  <ChevronDown
                    style={{
                      transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
                      transition: 'transform 0.3s ease',
                    }}
                  />
                </div>
              </PopoverTrigger>
              <PopoverContent className="w-[200px] font-manrope font-semibold text-[#FF0000]">
                <div
                  onClick={logout}
                  className="flex gap-2 hover:scale-105 duration-200 justify-center cursor-pointer"
                >
                  <DoorClosed className="w-4 " />
                  <span>Logout</span>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>
        <div className="w-[24px] h-[24px] flex gap-2 flex-col cursor-pointer lg:hidden">
          <Popover>
            <PopoverTrigger>
              <Menu
                onClick={() => {
                  // setOpen(!open)
                }}
              />
            </PopoverTrigger>
            <PopoverContent
              className="font-manrope w-[200px] p-10 mr-10 md:mr-20 lg:hidden"
              sideOffset={50}
              alignOffset={100}
            >
              <div className="gap-2 flex flex-col font-semibold text-black-secondary">
                {token !== '' && (
                  <div className="flex flex-col text-purple-primary font-bold">
                    Hello, {decoded.username}!
                    <Separator />
                  </div>
                )}
                <NavbarItem
                  name="Home"
                  onClick={() => {
                    if (pathname === '/') {
                      scroller.scrollTo('home', {
                        smooth: true,
                        offset: -150,
                      })
                    } else {
                      push('/')
                    }
                  }}
                  index={0}
                />
                {token !== '' && (
                  <NavbarItem
                    name="Vote"
                    onClick={() => {
                      if (pathname === '/vote') {
                        scroller.scrollTo('vote', {
                          smooth: true,
                          offset: -150,
                        })
                      } else {
                        push('/vote')
                      }
                    }}
                    index={1}
                  />
                )}
                <NavbarItem
                  name="Visi Misi"
                  onClick={() => {
                    if (pathname === '/vote') {
                      push('/')
                    } else {
                      scroller.scrollTo('visi-misi', {
                        smooth: true,
                        offset: -50,
                      })
                    }
                  }}
                  index={2}
                />
                <NavbarItem
                  name="Tata Cara"
                  onClick={() => {
                    if (pathname === '/vote') {
                      push('/')
                    } else {
                      scroller.scrollTo('tata-cara', {
                        smooth: true,
                        offset: -150,
                      })
                    }
                  }}
                  index={3}
                />
                <NavbarItem
                  name="FAQ"
                  onClick={() => {
                    if (pathname === '/vote') {
                      push('/')
                    } else {
                      scroller.scrollTo('faq', {
                        smooth: true,
                        offset: -150,
                      })
                    }
                  }}
                  index={4}
                />
                <div className="text-[#FF0000] flex-col cursor-pointer">
                  <Separator />
                  <div
                    onClick={logout}
                    className="flex gap-2 hover:scale-105 duration-200"
                  >
                    <DoorClosed className="w-4 " />
                    <span>Logout</span>
                  </div>
                </div>
              </div>
              {token === '' && (
                <Button
                  onClick={() => {
                    push('/login')
                  }}
                  variant={'default'}
                  className="hover:scale-[1.05] transition duration-200 ease-in-out hidden lg:flex"
                >
                  Login
                </Button>
              )}
            </PopoverContent>
          </Popover>
        </div>
      </motion.nav>
    </div>
  )
}
