import React from "react"
import { Button, buttonVariants } from "@shadcdn/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@shadcdn/tooltip"
import { VariantProps } from "class-variance-authority"

type IconButtonWithTooltipProps = {
    icon: React.ReactNode
    tooltip: string
    onClickButton: () => void
} & React.ComponentProps<"button"> & VariantProps<typeof buttonVariants> & { asChild?: boolean }

const IconButtonWithTooltip: React.FC<IconButtonWithTooltipProps> = ({ icon, tooltip, onClickButton, ...props }) => {
    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <Button onClick={onClickButton} variant="outline" size="icon" {...props}>
                        {icon}
                    </Button>
                </TooltipTrigger>
                <TooltipContent side="top">
                    <p>{tooltip}</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}

export default IconButtonWithTooltip
