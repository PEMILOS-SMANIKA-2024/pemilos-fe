/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { toast } from '@/components/ui/use-toast'
import { checkExpired, fetchWithToken } from '@/custom-hook/custom-fetch'
import useToken from '@/custom-hook/useToken'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

interface VoteConfirmationDialogProps {
  children?: React.ReactNode
  openDialog: boolean
  setOpenDialog: (open: boolean) => void
  disable?: boolean
  calonId: number
}

export const VoteConfirmationDialog: React.FC<VoteConfirmationDialogProps> = ({
  children,
  openDialog,
  setOpenDialog,
  calonId,
  disable = false,
}) => {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Dialog
        open={openDialog && !disable}
        onOpenChange={(open) => {
          setOpenDialog(open)
        }}
      >
        {children && <DialogTrigger asChild>{children}</DialogTrigger>}
        <DialogContent className="min-w-[300px] p-10">
          <DialogHeader>
            <DialogTitle>
              Yakin Untuk Memilih Kandidat Nomor {calonId}?
            </DialogTitle>
            <DialogDescription>
              Pilihan anda tidak bisa diubah!
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex flex-col-reverse gap-2">
            <DialogClose>
              <Button isAnimated variant={'outline'} className="w-full">
                Tidak Yakin
              </Button>
            </DialogClose>
            <DialogClose>
              <Button
                onClick={() => {
                  setOpen(true)
                  console.log(calonId)
                }}
                isAnimated
                variant={'default'}
                className="w-full"
              >
                Yakin
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <TokenConfirmationDialog
        openDialog={open}
        setOpenDialog={setOpen}
        calonId={calonId}
      />
    </>
  )
}

export const TokenConfirmationDialog: React.FC<VoteConfirmationDialogProps> = ({
  children,
  calonId,
  openDialog,
  setOpenDialog,
  disable = false,
}) => {
  const { replace } = useRouter()
  const { token, decoded, expirationDate } = useToken()

  async function voteCalon() {
    const tokenExpired = checkExpired(expirationDate)

    toast({
      title: 'Vote',
      description: 'Sedang memproses vote ...',
      variant: 'default',
    })

    if (tokenExpired) {
      toast({
        title: 'Sesi anda sudah expired!',
        description: 'Mengarahkan ke halaman login ...',
        variant: 'destructive',
      })

      const response = async () => {
        await fetchWithToken(`/auth/logout/${decoded.id}`, token, {
          method: 'POST',
          body: JSON.stringify({
            voteToken: tokenInput,
          }),
        })

        localStorage.removeItem('token')
      }
      response()

      setTimeout(() => {
        replace('/login')
      }, 500)
    }

    const response = await fetchWithToken(
      `/vote/${calonId}/${decoded.id}/${tokenInput}`,
      token,
      {
        method: 'POST',
      }
    )

    if (response.message) {
      toast({
        title: 'Vote Gagal',
        description: response.message,
        variant: 'destructive',
      })
      return
    }

    if (response.result) {
      toast({
        title: 'Vote Berhasil',
        description: 'Berhasil vote!',
        variant: 'default',
      })
    } else {
      toast({
        title: 'Vote',
        description: 'vote Gagal!',
        variant: 'destructive',
      })
      return
    }

    const newToken = (response.result as { token: string }).token
    localStorage.setItem('token', newToken)

    setTimeout(() => {
      const url = window.location.href.replace(window.location.pathname, '')
      replace(url)
    }, 200)
  }

  const [tokenInput, setTokenInput] = useState('')
  return (
    <Dialog
      open={openDialog && !disable}
      onOpenChange={(open) => {
        setOpenDialog(open)
      }}
    >
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="min-w-[300px] p-10">
        <DialogHeader>
          <DialogTitle>Masukkan Vote Token</DialogTitle>
          <DialogDescription>
            Jika token salah, harap menghubungi admin untuk meminta token baru
          </DialogDescription>
        </DialogHeader>
        <div className="w-full">
          <Input
            onChange={(e) => {
              setTokenInput(e.target.value)
            }}
            placeholder="Masukkan token ..."
            type="number"
          />
        </div>
        <DialogFooter className="flex flex-col-reverse gap-2">
          <DialogClose>
            <Button isAnimated variant={'outline'} className="w-full">
              Batalkan
            </Button>
          </DialogClose>
          <DialogClose>
            <Button
              isAnimated
              onClick={async () => {
                await voteCalon()
              }}
              variant={'default'}
              className="w-full"
            >
              Vote!
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
