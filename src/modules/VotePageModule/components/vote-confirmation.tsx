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
}

export const VoteConfirmationDialog: React.FC<VoteConfirmationDialogProps> = ({
  children,
  onSubmit,
}) => {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="">
        <DialogHeader>
          <DialogTitle>Yakin untuk memilih paslon ini?</DialogTitle>
          <DialogDescription>Pilihan anda tidak bisa diubah!</DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex flex-col gap-2">
          <Button
            onClick={() => {
              onSubmit()
            }}
            variant={'default'}
          >
            Yakin
          </Button>
          <DialogClose>
            <Button variant={'destructive'}>Tidak Yakin</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
