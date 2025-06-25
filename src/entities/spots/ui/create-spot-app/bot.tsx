import { FormSelect } from "@feature/formSelect";
import FormInput from "@feature/formInput";
import { booleanOptions } from "@shared/mock";
import { Link, User } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { AppSpotBotType } from "@entities/spots/types";
import PreviewContent from "@feature/preview";
import CustomEditor from "@feature/text-editor";
import DropFieldInner from "@feature/dropField";
import AddButton from "@feature/add-button";
import AddCommand from "@feature/add-command";
import { Plus } from "lucide-react";
import { Button } from "@shadcdn/button";
import { Form } from "@shadcdn/form";

type BotSpotAppProps = {
    onNextStep: () => void;
};

const BotSpotAppTab = ({ onNextStep }: BotSpotAppProps) => {

    const form = useForm<AppSpotBotType>({
        defaultValues: {
            botToken: '',
            userName: '',
            linkToApp: '',
            linkToName: '',
            HelloSelect: "false", // ← переключатель, если true — показывать textHello и т.д.
            textHello: '',       // ← условное поле
            mediaHello: null,    // ← файл
            buttonsTypeHello: [],// ← массив кнопок
            command: [],           // ← массив команд (может быть пустой по умолчанию)
        }
    });

    const helloSelected = form.watch("HelloSelect");

    const text = form.watch('textHello')
    const buttonsType = form.watch('buttonsTypeHello')

    const onSubmitForm = (data: AppSpotBotType) => {
        console.log(data);
        onNextStep()
    }


    return (
        <>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmitForm)}>
                    <div className="space-y-3 bg-slate-100 px-3 py-4 rounded-md mb-5">
                        <FormInput
                            name="botToken"
                            control={form.control}
                            label="Токен бота"
                        />

                        <FormInput
                            name="userName"
                            control={form.control}
                            label="Юзернейм для связи"
                            leftIcon={<User className="w-4 h-4 text-muted-foreground" />}
                        />

                        <div className="grid grid-cols-2 gap-2">
                            <FormInput
                                name="linkToApp"
                                control={form.control}
                                label="Ссылка на приложение"
                                leftIcon={<Link className="w-4 h-4 text-muted-foreground" />}
                            />
                            <FormInput
                                name="linkToName"
                                control={form.control}
                                label="Ссылка с отображаемым именем"
                                leftIcon={<Link className="w-4 h-4 text-muted-foreground" />}
                            />
                        </div>

                        <FormSelect
                            name="HelloSelect"
                            control={form.control}
                            label="Приветственное сообщение"
                            options={booleanOptions}
                        />

                        {helloSelected === "true" && (
                            <div className="flex flex-col gap-2 border p-3 rounded bg-muted/20">
                                <PreviewContent text={text ?? ''} buttonArray={buttonsType ?? []} />

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
                                        <DropFieldInner field={field} label="Медиа" />
                                    )}
                                />

                                <AddButton name="buttonsType" />

                                {/* Тут можно добавить блок кнопок, если они у тебя уже реализованы */}
                            </div>
                        )}



                    </div>
                    <AddCommand name="command" />

                    <div className="mt-5">
                        <Button
                            disabled={!form.formState.isValid}
                            type="submit"
                            className="space-x-2 w-full"
                        >
                            <Plus className="w-4 h-4" />
                            Создать спот
                        </Button>
                    </div>
                </form>
            </Form>

        </>
    );
};

export default BotSpotAppTab;
