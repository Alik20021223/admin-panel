// DropFieldInner.tsx
import { Label } from "@shadcdn/label"
import { MousePointerClick } from "lucide-react"
import { useDropzone } from "react-dropzone"
import { FormItem } from "@shadcdn/form"
import { ControllerRenderProps, FieldValues, Path } from "react-hook-form"

interface DropFieldInnerProps<T extends FieldValues> {
    field: ControllerRenderProps<T, Path<T>>
    label?: string
}

const DropFieldInner = <T extends FieldValues>({ field, label = "Медиа" }: DropFieldInnerProps<T>) => {
    const { getRootProps, getInputProps } = useDropzone({
        onDrop: (acceptedFiles: File[]) => {
            field.onChange(acceptedFiles)
        },
    })

    return (
        <FormItem>
            <Label>{label}</Label>
            <div
                {...getRootProps()}
                style={{
                    border: "2px dashed #4285f4",
                    padding: 40,
                    borderRadius: 12,
                    cursor: "pointer"
                }}
            >
                <input {...getInputProps()} />
                <div className="space-x-2 flex justify-center items-center">
                    <MousePointerClick className="text-blue-500" />
                    <p className="text-blue-500 text-sm">
                        Перетяните или выберите файл на вашем устройстве
                    </p>
                </div>
            </div>

            {Array.isArray(field.value) && field.value.length > 0 && (
                <div className="mt-2 text-sm text-gray-600">
                    Выбран файл: {field.value[0]?.name}
                </div>
            )}
        </FormItem>
    )
}

export default DropFieldInner
