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

interface VoteConfirmationDialogProps {
  children?: React.ReactNode
  onSubmit: () => void
  openDialog: boolean
  setOpenDialog: (open: boolean) => void
  disable?: boolean
}

export const VoteConfirmationDialog: React.FC<VoteConfirmationDialogProps> = ({
  children,
  onSubmit,
  openDialog,
  setOpenDialog,
  disable = false,
}) => {
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
          <DialogTitle>Yakin untuk memilih paslon ini?</DialogTitle>
          <DialogDescription>Pilihan anda tidak bisa diubah!</DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex flex-col-reverse gap-2">
          <DialogClose>
            <Button isAnimated variant={'outline'} className="w-full">
              Tidak Yakin
            </Button>
          </DialogClose>
          <DialogClose>
            <Button
              isAnimated
              onClick={onSubmit}
              variant={'default'}
              className="w-full"
            >
              Yakin
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
