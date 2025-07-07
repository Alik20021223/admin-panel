import { Controller, Control, FieldValues, Path } from "react-hook-form"
import { Input } from "@shadcdn/input"
import { Label } from "@shadcdn/label"

interface TimeInputFieldProps<T extends FieldValues> {
    name: Path<T>
    control: Control<T>
    label?: string
}

export const TimeInputField = <T extends FieldValues>({
    name,
    control,
    label,
}: TimeInputFieldProps<T>) => {
    return (
        <div className="flex flex-col gap-2">
            {label && (
                <Label htmlFor={name} className="px-1">
                    {label}
                </Label>
            )}
            <Controller
                name={name}
                control={control}
                render={({ field }) => (
                    <Input
                        type="time"
                        id={name}
                        step="1"
                        className="bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden"
                        {...field}
                    />
                )}
            />
        </div>
    )
}
