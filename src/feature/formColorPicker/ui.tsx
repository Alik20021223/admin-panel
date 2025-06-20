import {
    Control,
    Controller,
    ControllerRenderProps,
    FieldValues,
    Path,
} from "react-hook-form";
import { useEffect, useState } from "react";
import { Input } from "@shadcdn/input";
import { FormItem, FormLabel } from "@shadcdn/form";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@shadcdn/tooltip";
import { BadgeInfo } from "lucide-react";
import { ColorPicker, ColorPickerChangeEvent } from "primereact/colorpicker";

interface FormColorPickerInnerProps<T extends FieldValues> {
    field: ControllerRenderProps<T, Path<T>>;
    label?: string;
    placeholder?: string;
    tooltipText?: string;
}

const FormColorPickerInner = <T extends FieldValues>({
    field,
    label,
    placeholder = "#ff0000",
    tooltipText,
}: FormColorPickerInnerProps<T>) => {
    const [color, setColor] = useState(field.value?.replace("#", "") || "ff0000");

    useEffect(() => {
        if (field.value !== `#${color}`) {
            setColor(field.value?.replace("#", "") || "ff0000");
        }
    }, [field.value]);

    const handleColorChange = (e: ColorPickerChangeEvent) => {
        const hexColor = `#${e.value}`;
        setColor(e.value);
        field.onChange(hexColor);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setColor(value.replace("#", ""));
        field.onChange(value);
    };

    return (
        <FormItem>
            {label && (
                <div className="flex items-center gap-1 mb-1">
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
            <div className="flex items-center gap-4 w-full">
                <Input
                    value={field.value || ""}
                    onChange={handleInputChange}
                    placeholder={placeholder}
                    className="w-full"
                />
                <ColorPicker
                    value={color}
                    onChange={handleColorChange}
                    format="hex"
                    style={{ width: "2rem", height: "2rem", cursor: "pointer" }}
                />
            </div>

        </FormItem>
    );
};

interface FormColorPickerProps<T extends FieldValues> {
    name: Path<T>;
    control: Control<T>;
    label?: string;
    placeholder?: string;
    tooltipText?: string;
}

const FormColorPicker = <T extends FieldValues>({
    name,
    control,
    label,
    placeholder,
    tooltipText,
}: FormColorPickerProps<T>) => {
    return (
        <Controller
            name={name}
            control={control}
            render={({ field }) => (
                <FormColorPickerInner<T>
                    field={field}
                    label={label}
                    placeholder={placeholder}
                    tooltipText={tooltipText}
                />
            )}
        />
    );
};

export default FormColorPicker;
