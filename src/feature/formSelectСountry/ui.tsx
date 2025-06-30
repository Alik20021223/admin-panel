"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"
import { Controller, Control, FieldValues, Path } from "react-hook-form"

import { cn } from "@lib/utils"
import { Button } from "@shadcdn/button"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@shadcdn/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@shadcdn/popover"
import {
    FormItem,
    FormLabel,
    FormMessage,
} from "@shadcdn/form"

interface FormSelectProps<T extends FieldValues> {
    name: Path<T>
    control: Control<T>
    label?: string
    placeholder?: string
    options: { label: string; value: string; flag?: string }[]
    disabled?: boolean
}

export function FormSelectCountry<T extends FieldValues>({
    name,
    control,
    label,
    placeholder = "Выберите страну...",
    options,
    disabled,
}: FormSelectProps<T>) {
    const [open, setOpen] = React.useState(false)

    return (
        <Controller
            name={name}
            control={control}
            render={({ field }) => {
                const selected = options.find((o) => o.value === field.value)
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
                                    <span className="flex items-center gap-2">
                                        {selected?.flag && (
                                            <img
                                                src={selected.flag}
                                                alt=""
                                                className="w-4 h-4 rounded-full object-cover"
                                            />
                                        )}
                                        {selected?.label || placeholder}
                                    </span>
                                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent align="start" side="bottom" className="w-full max-w-full p-0">
                                <Command>
                                    <CommandInput placeholder="Поиск..." className="h-9" />
                                    <CommandList>
                                        <CommandEmpty>Ничего не найдено.</CommandEmpty>
                                        <CommandGroup>
                                            {options.map((option) => (
                                                <CommandItem
                                                    key={option.value}
                                                    value={option.value}
                                                    onSelect={(val) => {
                                                        field.onChange(val)
                                                        setOpen(false)
                                                    }}
                                                >
                                                    <div className="flex items-center gap-2">
                                                        {option.flag && (
                                                            <img
                                                                src={option.flag}
                                                                alt=""
                                                                className="w-4 h-4 rounded-full object-cover"
                                                            />
                                                        )}
                                                        {option.label}
                                                    </div>
                                                    <Check
                                                        className={cn(
                                                            "ml-auto h-4 w-4",
                                                            field.value === option.value
                                                                ? "opacity-100"
                                                                : "opacity-0"
                                                        )}
                                                    />
                                                </CommandItem>
                                            ))}
                                        </CommandGroup>
                                    </CommandList>
                                </Command>
                            </PopoverContent>
                        </Popover>
                        <FormMessage />
                    </FormItem>
                )
            }}
        />
    )
}
