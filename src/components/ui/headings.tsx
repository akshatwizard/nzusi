import { cn } from "@/lib/utils";
import { ComponentProps, ReactNode } from "react";

type PageHeadingProps = ComponentProps<"h1"> & {
    children: ReactNode
    className?: string
}

export function PageHeading({ children, className, ...rest }: PageHeadingProps) {
    return (
        <h1
            className={cn("text-3xl lg:text-5xl md:text-4xl", className)}
            {...rest}
        >
            {children}
        </h1>
    )
}