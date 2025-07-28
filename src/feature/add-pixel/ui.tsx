import FormInput from "@feature/formInput";
import { Plus, Trash2 } from "lucide-react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { Button } from "@shadcdn/button"; // предположим, у тебя такой
import { Label } from "@shadcdn/label";
import { Separator } from "@shadcdn/separator";

interface AddPixelProps {
    name: string; // пример: "buttons"
    edit: boolean;
}

const AddPixel: React.FC<AddPixelProps> = ({ name, edit = false }) => {
    const { control } = useFormContext();

    const { fields, append, remove } = useFieldArray({
        control,
        name,
    });

    return (
        <div className="space-y-4">
            <Label>
                Пиксели
            </Label>
            {fields.map((field, index) => {
                return (
                    <>
                        <div key={field.id} className="border px-3 py-4 space-y-3 rounded-md bg-slate-100">
                            <div
                                className="grid grid-cols-[1fr_auto] gap-3 items-end "
                            >
                                <FormInput
                                    name={`${name}.${index}.namePixel`}
                                    control={control}
                                    label="Название пикселя"
                                />
                                <Button
                                    type="button"
                                    variant="destructive"
                                    className="w-fit h-10"
                                    onClick={() => remove(index)}
                                >
                                    <Trash2 className="w-4 h-4" />
                                </Button>
                            </div>
                            <div className="space-y-3">
                                <FormInput
                                    name={`${name}.${index}.enterPixel`}
                                    control={control}
                                    label="Введите пиксель"
                                    // type="number"
                                    placeholder="Введите пиксель"
                                />
                                <FormInput
                                    name={`${name}.${index}.apiKey`}
                                    control={control}
                                    label="API ключ "
                                    placeholder="Введите API ключ"
                                />
                                <Separator />
                            </div>
                        </div >
                    </>
                )
            })}

            {!edit && <Button
                type="button"
                variant="ghost"
                className="w-fit text-blue-500"
                onClick={() => append({
                    namePixel: "",
                    enterPixel: "",
                    apiKey: '',
                    outPostBack: 'false'
                })}
            >
                <Plus className="w-4 h-4 mr-2" />
                Добавить пиксель
            </Button>}
        </div >
    );
};

export default AddPixel;
