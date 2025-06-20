import FormInput from "@feature/formInput";
import { Plus, Trash2 } from "lucide-react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { Button } from "@shadcdn/button"; // предположим, у тебя такой

import { defaultOptions } from "@shared/mock";
import { FormSelect } from "@feature/formSelect";

interface AddOutPostBackProps {
    name: string; // пример: "buttons"
}

const AddOutPostBack: React.FC<AddOutPostBackProps> = ({ name }) => {
    const { control } = useFormContext();

    const { fields, append, remove } = useFieldArray({
        control,
        name,
    });

    return (
        <div className="space-y-4">
            {fields.map((field, index) => {
                return (
                    <>
                        <div key={field.id} className="border px-3 py-4 rounded-md bg-white space-y-3">
                            <div
                                className="grid grid-cols-[1fr_auto] gap-3 items-end "
                            >
                                <FormSelect
                                    name={`${name}.${index}.event`}
                                    control={control}
                                    label="Событие"
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
                                <FormSelect
                                    name={`${name}.${index}.typeRequest`}
                                    control={control}
                                    label="Тип запроса"
                                    options={defaultOptions}
                                />
                                <FormInput
                                    name={`${name}.${index}.linkToOutPostBack`}
                                    control={control}
                                    label="Ссылка на внешний постбэк"
                                />
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
                    event: "",
                    typeRequest: "",
                    linkToOutPostBack: '',
                })}
            >
                <Plus className="w-4 h-4 mr-2" />
                Добавить Внешний постбэк
            </Button>
        </div >
    );
};

export default AddOutPostBack;
