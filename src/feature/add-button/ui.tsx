import FormInput from "@feature/formInput";
import { Plus, Trash2 } from "lucide-react";
import { useFieldArray, useFormContext, useWatch } from "react-hook-form";
import { Button } from "@shadcdn/button";
import { Label } from "@shadcdn/label";
import { ButtonBotType } from "@shared/types";

interface AddButtonProps {
    name: string; // пример: "buttonsTypeHello"
}

const AddButton: React.FC<AddButtonProps> = ({ name }) => {
    const { control } = useFormContext();

    const { fields, append, remove } = useFieldArray({
        control,
        name,
    });

    // Смотрим за текущими кнопками
    const values = useWatch({ control, name }) || [];

    const getNextId = () => {
        const ids = values.map((item: ButtonBotType) => item?.id ?? 0);
        const maxId = ids.length ? Math.max(...ids) : 0;
        return maxId + 1;
    };

    return (
        <div className="space-y-4">
            {fields.length > 0 && (
                <Label>Кнопки</Label>
            )}

            {fields.map((field, index) => (
                <div
                    key={field.id}
                    className="grid grid-cols-[1fr_1fr_auto] gap-3 items-end border p-3 rounded-md"
                >
                    <FormInput
                        name={`${name}.${index}.name`}
                        control={control}
                        label="Введите название"
                    />
                    <FormInput
                        name={`${name}.${index}.url`}
                        control={control}
                        label="Введите ссылку"
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
            ))}

            <Button
                type="button"
                variant="ghost"
                className="w-fit bg-slate-100"
                onClick={() =>
                    append({
                        name: "",
                        url: "",
                        id: getNextId(),
                    })
                }
            >
                <Plus className="w-4 h-4 mr-2" />
                Добавить кнопку
            </Button>
        </div>
    );
};

export default AddButton;
