"use client"

import * as React from "react"
import { Controller, Control, FieldValues, Path } from "react-hook-form"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@shadcdn/popover"
import {
    Command,
    CommandItem,
    CommandList,
    CommandInput,
    CommandEmpty,
    CommandGroup,
} from "@shadcdn/command"
import { Button } from "@shadcdn/button"
import { Badge } from "@shadcdn/badge"
import { FormItem, FormLabel, FormMessage } from "@shadcdn/form"
import { Check, ChevronDown, X } from "lucide-react"

interface Option {
    label: string
    value: string
    flag?: string
}

interface FormMultiSelectProps<T extends FieldValues> {
    name: Path<T>
    control: Control<T>
    label?: string
    placeholder?: string
    options: Option[]
    disabled?: boolean
}

export function FormMultiSelectCountry<T extends FieldValues>({
    name,
    control,
    label,
    placeholder = "Выбрать...",
    options,
    disabled,
}: FormMultiSelectProps<T>) {
    const [open, setOpen] = React.useState(false)

    return (
        <Controller
            name={name}
            control={control}
            render={({ field }) => {
                const toggleSelect = (val: string) => {
                    const exists = field.value?.includes(val)
                    const newValue = exists
                        ? field.value.filter((v: string) => v !== val)
                        : [...(field.value || []), val]
                    field.onChange(newValue)
                }

                const removeSelected = (val: string) => {
                    field.onChange(field.value.filter((v: string) => v !== val))
                }

                return (
                    <FormItem>
                        {label && <FormLabel>{label}</FormLabel>}
                        <Popover open={open} onOpenChange={setOpen}>
                            <PopoverTrigger asChild>
                                <Button
                                    type="button"
                                    variant="outline"
                                    role="combobox"
                                    aria-expanded={open}
                                    className="w-full justify-between"
                                    disabled={disabled}
                                >
                                    {field.value?.length
                                        ? `Выбрано: ${field.value.length}`
                                        : placeholder}
                                    <ChevronDown className="ml-2 h-4 w-4" />
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-full p-0 max-h-[300px] overflow-y-auto">
                                <Command>
                                    <CommandInput placeholder="Поиск..." className="h-9" />
                                    <CommandList>
                                        <CommandEmpty>Ничего не найдено.</CommandEmpty>
                                        <CommandGroup>
                                            {options.map((option) => (
                                                <CommandItem
                                                    key={option.value}
                                                    onSelect={() => toggleSelect(option.value)}
                                                >
                                                    <div className="flex items-center gap-2 w-full justify-between">
                                                        <div className="flex items-center gap-2">
                                                            {option.flag && (
                                                                <img
                                                                    src={option.flag}
                                                                    alt={option.label}
                                                                    className="w-4 h-4 rounded-full object-cover"
                                                                />
                                                            )}
                                                            {option.label}
                                                        </div>
                                                        {field.value?.includes(option.value) && (
                                                            <Check className="w-4 h-4 text-primary" />
                                                        )}
                                                    </div>
                                                </CommandItem>
                                            ))}
                                        </CommandGroup>
                                    </CommandList>
                                </Command>
                            </PopoverContent>
                        </Popover>

                        {field.value?.length > 0 && (
                            <div className="flex flex-wrap gap-2 mt-2">
                                {field.value.map((val: string) => {
                                    const label = options.find((o) => o.value === val)?.label ?? val
                                    return (
                                        <Badge
                                            key={val}
                                            variant="secondary"
                                            className="flex items-center gap-1"
                                        >
                                            {label}
                                            <X
                                                className="w-3 h-3 ml-1 cursor-pointer"
                                                onClick={(e) => {
                                                    e.stopPropagation()
                                                    removeSelected(val)
                                                }}
                                            />
                                        </Badge>
                                    )
                                })}
                            </div>
                        )}

                        <FormMessage />
                    </FormItem>
                )
            }}
        />
    )
}
