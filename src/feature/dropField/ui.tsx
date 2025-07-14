// DropFieldInner.tsx
import { Label } from "@shadcdn/label"
import { MousePointerClick } from "lucide-react"
import { useDropzone } from "react-dropzone"
import { FormItem } from "@shadcdn/form"
import { ControllerRenderProps, FieldValues, Path } from "react-hook-form"

interface DropFieldInnerProps<T extends FieldValues> {
    field: ControllerRenderProps<T, Path<T>>
    label?: string
    disabled?: boolean
}

const DropFieldInner = <T extends FieldValues>({ field, label = "Медиа", disabled }: DropFieldInnerProps<T>) => {
    const { getRootProps, getInputProps } = useDropzone(
        disabled
            ? { noClick: true, noDrag: true, disabled: true }
            : {
                onDrop: (acceptedFiles) => {
                    field.onChange(acceptedFiles[0]);
                }
            }
    );



    return (
        <FormItem>
            <Label>{label}</Label>
            <div
                {...getRootProps()}
                style={{
                    border: "2px dashed #4285f4",
                    padding: 40,
                    borderRadius: 12,
                    cursor: disabled ? "not-allowed" : "pointer",
                    opacity: disabled ? 0.5 : 1,
                }}
            >
                <input {...getInputProps()} disabled={disabled} />
                <div className="space-x-2 flex justify-center items-center">
                    <MousePointerClick className="text-blue-500" />
                    <p className="text-blue-500 text-sm">
                        {disabled
                            ? "Файл уже добавлен"
                            : "Перетяните или выберите файл на вашем устройстве"}
                    </p>
                </div>
            </div>


            {field.value && (
                <div className="mt-2 text-sm text-gray-600">
                    Выбран файл: {field.value.name}
                </div>
            )}
        </FormItem>
    )
}

export default DropFieldInner
