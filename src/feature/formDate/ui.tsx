import { CalendarIcon } from "lucide-react"
import { Button } from "@shadcdn/button"
import { Calendar } from "@shadcdn/calendar"
import { Input } from "@shadcdn/input"
import { Label } from "@shadcdn/label"
import { Popover, PopoverContent, PopoverTrigger } from "@shadcdn/popover"
import { Controller, Control, FieldValues, Path } from "react-hook-form"
import * as React from "react"
import { format } from "date-fns"
import { formatDateRange } from "@shared/utils"
import type { DateRange } from "react-day-picker"

interface BaseProps<T extends FieldValues> {
    name: Path<T>
    control: Control<T>
    label?: string
    placeholder?: string
}

interface SingleModeProps<T extends FieldValues> extends BaseProps<T> {
    mode?: "single"
}

interface RangeModeProps<T extends FieldValues> extends BaseProps<T> {
    mode: "range"
    required?: boolean
}

type CalendarFieldProps<T extends FieldValues> = SingleModeProps<T> | RangeModeProps<T>

const isValidDate = (d: unknown): d is Date => {
    return d instanceof Date && !isNaN(d.getTime());
};

const isValidDateRange = (range: unknown): range is DateRange => {
    return (
        typeof range === "object" &&
        range !== null &&
        "from" in range &&
        "to" in range &&
        range.from instanceof Date &&
        !isNaN(range.from.getTime()) &&
        range.to instanceof Date &&
        !isNaN(range.to.getTime())
    );
};

// Function to get yesterday's date
const getYesterday = () => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);
    return yesterday;
};

// Function to get today's date
const getToday = () => new Date();

export const CalendarField = <T extends FieldValues>(props: CalendarFieldProps<T>) => {
    const { name, control, label, placeholder = "Выберите дату" } = props
    const [open, setOpen] = React.useState(false)

    const isRange = props.mode === "range"

    return (
        <Controller
            name={name}
            control={control}
            render={({ field: { value, onChange } }) => {
                const formatted = isRange
                    ? isValidDateRange(value)
                        ? formatDateRange(value)
                        : ""
                    : isValidDate(value)
                        ? format(value, "dd.MM.yyyy")
                        : "";

                // console.log(value);
                

                return (
                    <div className="flex flex-col gap-3">
                        {label && (
                            <Label htmlFor={name} className="px-1">
                                {label}
                            </Label>
                        )}
                        <div className="relative flex gap-2 w-full">
                            <Input
                                id={name}
                                value={formatted}
                                readOnly
                                placeholder={placeholder}
                                className="w-full pr-10 bg-background"
                            />
                            <Popover open={open} onOpenChange={setOpen}>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant="ghost"
                                        className="absolute top-1/2 right-2 size-6 -translate-y-1/2"
                                    >
                                        <CalendarIcon className="size-3.5" />
                                        <span className="sr-only">Выбор даты</span>
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent
                                    className="w-auto overflow-hidden p-0"
                                    align="end"
                                    alignOffset={-8}
                                    sideOffset={10}
                                >
                                    <Calendar
                                        mode={isRange ? "range" : "single"}
                                        selected={value}
                                        captionLayout="dropdown"
                                        onSelect={(date: Date | DateRange | undefined) => {
                                            onChange(date)
                                        }}
                                        {...(isRange ? { required: props.required ?? false } : {})}
                                    />
                                    <div className="flex justify-between p-3">
                                        {/* Button to set yesterday's date */}
                                        <Button
                                            className="text-black bg-slate-300"
                                            onClick={() => {
                                                const currentValue = value // Get current value if any
                                                onChange({
                                                    from: getYesterday(),  // Set yesterday's date to 'from'
                                                    to: currentValue.to || currentValue.from, // Keep existing 'to' value or 'from'
                                                })
                                            }}
                                        >
                                            Вчера
                                        </Button>

                                        {/* Button to set today's date */}
                                        <Button
                                            className="text-black bg-slate-300"
                                            onClick={() => {
                                                const currentValue = value
                                                onChange({
                                                    from: currentValue.from || getToday(), // Keep existing 'from' or set today's date
                                                    to: getToday(),  // Set today's date to 'to'
                                                })
                                            }}
                                        >
                                            Сегодня
                                        </Button>
                                    </div>
                                </PopoverContent>
                            </Popover>
                        </div>
                    </div>
                )
            }}
        />
    )
}
