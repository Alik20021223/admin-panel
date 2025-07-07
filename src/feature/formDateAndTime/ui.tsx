"use client"

import * as React from "react"
import { ChevronDownIcon } from "lucide-react"
import { Controller, Control, FieldValues, Path } from "react-hook-form"

import { Button } from "@shadcdn/button"
import { Calendar } from "@shadcdn/calendar"
import { Label } from "@shadcdn/label"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@shadcdn/popover"
import { TimeInputField } from "@feature/FormTime"

interface CalendarTimeFieldProps<T extends FieldValues> {
    name: Path<T>
    timeName: Path<T>
    control: Control<T>
    label?: string
}

export const CalendarTimeField = <T extends FieldValues>({
    name,
    timeName,
    control,
    label,
}: CalendarTimeFieldProps<T>) => {
    const [open, setOpen] = React.useState(false)

    return (
        <div className="flex gap-4">
            <div className="flex flex-col gap-2 w-[calc(100%-100px)]">
                {label && (
                    <Label htmlFor={name} className="px-1">
                        {label}
                    </Label>
                )}
                <Controller
                    name={name}
                    control={control}
                    render={({ field: { value, onChange } }) => (
                        <Popover open={open} onOpenChange={setOpen}>
                            <PopoverTrigger asChild>
                                <Button
                                    variant="outline"
                                    id={name}
                                    className="w-full justify-between font-normal"
                                >
                                    {value ? new Date(value).toLocaleDateString() : "Select date"}
                                    <ChevronDownIcon />
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                                <Calendar
                                    mode="single"
                                    selected={value ? new Date(value) : undefined}
                                    captionLayout="dropdown"
                                    onSelect={(date: Date | undefined) => {
                                        onChange(date)
                                        setOpen(false)
                                    }}
                                />
                            </PopoverContent>
                        </Popover>
                    )}
                />
            </div>

            <TimeInputField name={timeName} control={control} label="Время" />
        </div>
    )
}
