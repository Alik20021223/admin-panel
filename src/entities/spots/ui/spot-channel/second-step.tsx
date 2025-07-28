import { Controller, FieldValues, UseFormReturn } from "react-hook-form";
import { StepOneSpotChannel } from "@entities/spots/types";
import { Switch } from "@shadcdn/switch";
import PreviewContent from "@feature/preview";
import CustomEditor from "@feature/text-editor";
import DropFieldInner from "@feature/dropField";
import AddButton from "@feature/add-button";
import { Separator } from "@shadcdn/separator";
import FormInput from "@feature/formInput";

type SecondStepProps<T extends FieldValues = StepOneSpotChannel> = {
    form: UseFormReturn<T>;
    previewUrl: string;
    isEdit: boolean;
    title?: string;
};

const SecondStep = ({ form, previewUrl, isEdit, title }: SecondStepProps) => {

    const autoReception = form.watch("autoReception")
    const helloSelected = form.watch("HelloSelect")

    const text = form.watch('textHello')
    const buttonsType = form.watch('buttonsTypeHello')

    return (
        <>
            <div className="w-full space-y-3 mt-4">
                <h1 className="font-semibold">ШАГ ІІ ФУНКЦИИ АВТОПРИЕМА</h1>
                <div className="flex items-center gap-2 mt-2 col-span-1">
                    <Switch checked={autoReception} onCheckedChange={(val) => form.setValue("autoReception", val)} />
                    <span>Автоприем</span>
                </div>
                {
                    autoReception && <div className="flex items-center gap-2 mt-2 col-span-1">
                        <Switch checked={form.watch("HelloSelect")} onCheckedChange={(val) => form.setValue("HelloSelect", val)} />
                        <span>Приветственное сообщение</span>
                    </div>
                }

                {helloSelected === true && (
                    <div className="flex flex-col gap-2 border p-3 rounded bg-muted/20">
                        <PreviewContent text={text ?? ''} buttonArray={buttonsType ?? []} />

                        {isEdit && (
                            <FormInput
                                name="title"
                                control={form.control}
                                label="Название канала"
                                placeholder="Введите название канала"
                                defaultValue={title}
                            />
                        )}

                        <Controller
                            name="textHello"
                            control={form.control}
                            render={({ field }) => (
                                <CustomEditor value={field.value ?? ''} label="Текст приветствия" onChange={field.onChange} />
                            )}
                        />

                        <Controller
                            name="mediaHello"
                            control={form.control}
                            render={({ field }) => (
                                <DropFieldInner field={field} label="Медиа" previewUrl={previewUrl} />
                            )}
                        />

                        <AddButton name="buttonsTypeHello" />

                        {/* Тут можно добавить блок кнопок, если они у тебя уже реализованы */}
                    </div>
                )}
                <Separator />
            </div>
        </>
    )
}

export default SecondStep