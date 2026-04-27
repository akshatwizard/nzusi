import { cn } from "@/lib/utils"
import { ComponentProps, ReactNode } from "react"

type SectionProps = ComponentProps<"section"> & {
    children: ReactNode
    className?: string
}

type WrapperProps = ComponentProps<"div"> & {
    children: ReactNode
    className?: string
}

export function Section({ children, className, ...rest }: SectionProps) {
    return (
        <section
            className={cn("w-full lg:px-12 md:px-8 px-4 bg-fun-blue-50", className)}
            {...rest}
        >
            {children}
        </section>
    )
}

export function Wrapper({ children, className, ...rest }: WrapperProps) {
    return (
        <div className={cn("w-full max-w-7xl mx-auto lg:py-20 md:py-16 py-12 flex flex-col lg:gap-16 md:gap-14 gap-12", className)}
            {...rest}>
            {children}
        </div>
    )
}