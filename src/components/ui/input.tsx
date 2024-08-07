import * as React from 'react'

import { cn } from '@/lib/utils'

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          'font-manrope px-6 py-6 focus:py-7 duration-200 font-semibold flex h-10 w-full rounded-xl border-2 border-black/10 bg-[#FAFAFA] outline-none text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-black/50 disabled:cursor-not-allowed disabled:opacity-50',
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = 'Input'

export { Input }
