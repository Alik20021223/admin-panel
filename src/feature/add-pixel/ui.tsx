import FormInput from "@feature/formInput";
import { Plus, Trash2 } from "lucide-react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { Button } from "@shadcdn/button"; // предположим, у тебя такой
import { Label } from "@shadcdn/label";
import { defaultOptions, postBackOptions } from "@shared/mock";
import { FormSelect } from "@feature/formSelect";
import { Separator } from "@shadcdn/separator";
import AddOutPostBack from "@feature/add-out-postback";

interface AddPixelProps {
    name: string; // пример: "buttons"
}

const AddPixel: React.FC<AddPixelProps> = ({ name }) => {
    const { control, watch } = useFormContext();

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

                const outPostBack = watch(`${name}.${index}.outPostBack`)


                return (
                    <>
                        <div key={field.id} className="border px-3 py-4 rounded-md bg-slate-100">
                            <div
                                className="grid grid-cols-[1fr_auto] gap-3 items-end "
                            >
                                <FormSelect
                                    name={`${name}.${index}.typePostBack`}
                                    control={control}
                                    label="Условие"
                                    options={defaultOptions}
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
                                    placeholder="Введите пиксель"
                                />
                                <FormInput
                                    name={`${name}.${index}.apiKey`}
                                    control={control}
                                    label="API ключ "
                                    placeholder="Введите API ключ"
                                />
                                <Separator />

                                <FormSelect
                                    name={`${name}.${index}.outPostBack`}
                                    control={control}
                                    label="Внешний постбэк"
                                    options={postBackOptions}
                                />

                                {outPostBack === 'true' &&
                                    <AddOutPostBack name="outPostBackArray" />
                                }
                            </div>
                        </div >
                    </>
                )
            })}

            <Button
                type="button"
                variant="ghost"
                className="w-fit text-blue-500"
                onClick={() => append({
                    typePostBack: "",
                    enterPixel: "",
                    apiKey: '',
                    outPostBack: 'false'
                })}
            >
                <Plus className="w-4 h-4 mr-2" />
                Добавить пиксель
            </Button>
        </div >
    );
};

export default AddPixel;
