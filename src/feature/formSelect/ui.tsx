import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@shadcdn/select"
import { Controller, Control, FieldValues, Path } from "react-hook-form"
import { FormControl, FormItem, FormLabel, FormMessage } from "@shadcdn/form"
import { BadgeInfo } from "lucide-react"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@shadcdn/tooltip"
import { SelectOption } from "@shared/types"

interface FormSelectProps<T extends FieldValues> {
    name: Path<T>
    control: Control<T>
    label?: string
    placeholder?: string
    options: SelectOption[]
    tooltipText?: string
    disabled?: boolean
}

export const FormSelect = <T extends FieldValues>({
    name,
    control,
    label,
    placeholder = "Выберите",
    options,
    tooltipText,
    disabled
}: FormSelectProps<T>) => {
    return (
        <Controller
            name={name}
            control={control}
            render={({ field }) => {
                return (
                    <FormItem>
                        {label && (
                            <div className="flex items-center gap-1">
                                <FormLabel>{label}</FormLabel>
                                {tooltipText && (
                                    <TooltipProvider>
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <BadgeInfo className="w-4 h-4 text-muted-foreground cursor-help" />
                                            </TooltipTrigger>
                                            <TooltipContent>
                                                <p>{tooltipText}</p>
                                            </TooltipContent>
                                        </Tooltip>
                                    </TooltipProvider>
                                )}
                            </div>
                        )}

                        <Select disabled={disabled} onValueChange={field.onChange} value={field.value}>
                            <FormControl>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder={placeholder} />
                                </SelectTrigger>
                            </FormControl>
                            <FormMessage />
                            <SelectContent>
                                {options.length > 0 ?
                                    options.map((option) => (
                                        <SelectItem key={option.value} value={option.value}>
                                            {option.label}
                                        </SelectItem>
                                    )) : <p >
                                        Ничего не найдено
                                    </p>
                                }
                            </SelectContent>
                        </Select>
                    </FormItem>
                )
            }}
        />
    )
}
