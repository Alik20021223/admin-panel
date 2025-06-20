import {
    FormItem,
    FormControl,
    FormMessage,
    FormField,
} from "@shadcdn/form";
import { Input } from "@shadcdn/input";
import { BadgeInfo } from "lucide-react";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@shadcdn/tooltip";
import { Control, FieldValues, Path } from "react-hook-form";

interface FormInputProps<T extends FieldValues> {
    name: Path<T>;
    control: Control<T>;
    label?: string;
    placeholder?: string;
    leftIcon?: React.ReactNode;
    tooltipText?: string;
    disabled?: boolean
}

const FormInput = <T extends FieldValues>({
    name,
    control,
    label,
    placeholder = "Введите",
    leftIcon,
    tooltipText,
    disabled = false
}: FormInputProps<T>) => {
    return (
        <FormField
            name={name}
            control={control}
            render={({ field }) => (
                <FormItem>
                    {label && (
                        <div className="flex items-center gap-1">
                            <label className="text-sm font-medium text-muted-foreground">{label}</label>
                            {tooltipText && (
                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <BadgeInfo className="w-4 h-4 text-muted-foreground cursor-help" />
                                        </TooltipTrigger>
                                        <TooltipContent className="max-w-[300px]">
                                            <p>{tooltipText}</p>
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                            )}
                        </div>
                    )}
                    <FormControl>
                        <Input {...field} placeholder={placeholder} leftIcon={leftIcon} disabled={disabled} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
};

export default FormInput;
