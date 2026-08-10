import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "radix-ui"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex shrink-0 items-center justify-center gap-2 text-sm font-bold uppercase tracking-wide whitespace-nowrap transition-all duration-200 ease-out outline-none border-2 focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground border-black shadow-[4px_4px_0px_0px_#121212] hover:bg-primary/90 active:translate-x-[2px] active:translate-y-[2px] active:shadow-none",
        secondary:
          "bg-secondary text-secondary-foreground border-black shadow-[4px_4px_0px_0px_#121212] hover:bg-secondary/90 active:translate-x-[2px] active:translate-y-[2px] active:shadow-none",
        accent:
          "bg-accent text-accent-foreground border-black shadow-[4px_4px_0px_0px_#121212] hover:bg-accent/90 active:translate-x-[2px] active:translate-y-[2px] active:shadow-none",
        outline:
          "bg-white text-foreground border-black shadow-[4px_4px_0px_0px_#121212] hover:bg-muted active:translate-x-[2px] active:translate-y-[2px] active:shadow-none",
        destructive:
          "bg-destructive text-white border-black shadow-[4px_4px_0px_0px_#121212] hover:bg-destructive/90 active:translate-x-[2px] active:translate-y-[2px] active:shadow-none",
        ghost:
          "border-transparent text-foreground hover:bg-muted",
        link: "border-transparent text-primary underline-offset-4 hover:underline",
        board: "border-transparent hover:bg-green-500/10 hover:text-green-500/70",
        boardActive: "border-transparent bg-green-500/10 text-green-500/70",
      },
      shape: {
        square: "rounded-none",
        pill: "rounded-full",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        xs: "h-6 gap-1 px-2 text-xs has-[>svg]:px-1.5 [&_svg:not([class*='size-'])]:size-3",
        sm: "h-8 gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-11 px-6 has-[>svg]:px-4",
        icon: "size-9",
        "icon-xs": "size-6 [&_svg:not([class*='size-'])]:size-3",
        "icon-sm": "size-8",
        "icon-lg": "size-11",
      },
    },
    defaultVariants: {
      variant: "default",
      shape: "square",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  shape = "square",
  size = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot.Root : "button"

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, shape, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }