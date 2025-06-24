import FormInput from "@feature/formInput";
import { Plus, Trash2 } from "lucide-react";
import { Controller, useFieldArray, useFormContext } from "react-hook-form";
import { Button } from "@shadcdn/button"; // предположим, у тебя такой
import { Label } from "@shadcdn/label";
import { FormSelect } from "@feature/formSelect";
import { CommandOptions } from "@shared/mock";
import DropFieldInner from "@feature/dropField";
import CustomEditor from "@feature/text-editor";
import AddButton from "@feature/add-button";

interface AddCommandProps {
    name: string; // пример: "buttons"
}

const AddCommand: React.FC<AddCommandProps> = ({ name }) => {
    const { control, watch } = useFormContext();

    const { fields, append, remove } = useFieldArray({
        control,
        name,
    });



    return (
        <div className="space-y-4">
            {fields.length > 0 && <Label>
                Команды
            </Label>}
            {fields.map((field, index) => {
                const condition = watch(`${name}.${index}.commandCondition`);
                return (
                    <>
                        <div key={field.id}>
                            <div
                                className="grid grid-cols-[1fr_1fr_auto] gap-3 items-end border p-3 rounded-t-md"
                            >
                                <FormSelect
                                    name={`${name}.${index}.commandCondition`}
                                    control={control}
                                    label="Условие"
                                    options={CommandOptions}
                                />
                                {condition === 'true' && <FormInput
                                    name={`${name}.${index}.textCommand`}
                                    control={control}
                                    placeholder="Введите команду"
                                    label="Команда"
                                />}
                                <Button
                                    type="button"
                                    variant="destructive"
                                    className="w-fit h-10"
                                    onClick={() => remove(index)}
                                >
                                    <Trash2 className="w-4 h-4" />
                                </Button>
                            </div>
                            <div className="grid gap-2 border-x border-b p-3 rounded-b bg-muted/20">

                                <Controller
                                    name={`${name}.${index}.descriptionCommand`}
                                    control={control}
                                    render={({ field }) => (
                                        <CustomEditor value={field.value ?? ''} label="Описание команды" onChange={field.onChange} />
                                    )}
                                />

                                <Controller
                                    name={`${name}.${index}.mediaCommand`}
                                    control={control}
                                    render={({ field }) => (
                                        <DropFieldInner field={field} label="Медиа" />
                                    )}
                                />

                                <AddButton name={`${name}.${index}.buttonsTypeCommand`} />

                            </div>
                        </div>
                    </>
                )
            }
            )}

            <Button
                type="button"
                variant="ghost"
                className="w-fit bg-slate-100"
                onClick={() => append({
                    commandCondition: '',
                    textCommand: '',
                    descriptionCommand: '',
                    mediaCommand: null,
                    buttonsTypeCommand: [],
                })}>

                <Plus className="w-4 h-4 mr-2" />
                Добавить команду
            </Button>
        </div>
    );
};

export default AddCommand;
