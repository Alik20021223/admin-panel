// components/MultiSelect.tsx
import { Popover, PopoverContent, PopoverTrigger } from "@shadcdn/popover"
import { Command, CommandItem, CommandList } from "@shadcdn/command"
import { Button } from "@shadcdn/button"
import { Badge } from "@shadcdn/badge"
import { Check, ChevronDown, X } from "lucide-react"
import * as React from "react"
import { Label } from "@shadcdn/label"

type Option = {
    label: string
    value: string
}

interface MultiSelectProps {
    options: Option[]
    value: string[]
    onChange: (value: string[]) => void
    label: string;
    placeholder?: string
}

export function MultiSelect({ options, value, onChange, placeholder = "Выбрать...", label }: MultiSelectProps) {
    const [open, setOpen] = React.useState(false)

    const toggleSelect = (val: string) => {
        const newValue = value.includes(val)
            ? value.filter((v) => v !== val)
            : [...value, val]
        onChange(newValue)
    }

    const removeSelected = (val: string) => {
        onChange(value.filter((v) => v !== val))
    }

    return (
        <div className="w-full gap-2 flex flex-col">
            <Label>
                {label}
            </Label>
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-between">
                        {value.length > 0
                            ? `Выбрано: ${value.length}`
                            : placeholder}
                        <ChevronDown className="ml-2 h-4 w-4" />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[300px] p-0">
                    <Command>
                        <CommandList>
                            {options.map((option) => (
                                <CommandItem
                                    key={option.value}
                                    onSelect={() => toggleSelect(option.value)}
                                    className="cursor-pointer"
                                >
                                    <div className="flex items-center justify-between w-full">
                                        <span>{option.label}</span>
                                        {value.includes(option.value) && <Check className="w-4 h-4 text-primary" />}
                                    </div>
                                </CommandItem>
                            ))}
                        </CommandList>
                    </Command>
                </PopoverContent>
            </Popover>

            {value.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                    {value.map((val) => {
                        const label = options.find((o) => o.value === val)?.label ?? val
                        return (
                            <Badge
                                key={val}
                                variant="secondary"
                                className="flex items-center gap-1"
                            >
                                {label}
                                <span
                                    className="ml-1 cursor-pointer"
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        removeSelected(val)
                                    }}
                                >
                                    <X className="w-3 h-3" />
                                </span>
                            </Badge>

                        )
                    })}
                </div>
            )}
        </div>
    )
}
