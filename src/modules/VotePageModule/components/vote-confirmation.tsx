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
}

export const VoteConfirmationDialog: React.FC<VoteConfirmationDialogProps> = ({
  children,
  onSubmit,
  openDialog,
  setOpenDialog,
}) => {
  return (
    <Dialog
      open={openDialog}
      onOpenChange={(open) => {
        setOpenDialog(open)
      }}
    >
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="">
        <DialogHeader>
          <DialogTitle>Yakin untuk memilih paslon ini?</DialogTitle>
          <DialogDescription>Pilihan anda tidak bisa diubah!</DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex flex-col gap-2">
          <DialogClose>
            <Button
              onClick={() => {
                onSubmit()
              }}
              variant={'default'}
            >
              Yakin
            </Button>
          </DialogClose>
          <DialogClose>
            <Button variant={'destructive'}>Tidak Yakin</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
