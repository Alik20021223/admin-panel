import { ExpertGeneralFormType } from "@entities/landing/types";
import { Controller, useForm } from "react-hook-form";
import { Form } from "@shadcdn/form"
import FormInput from "@feature/formInput";
import { Button } from "@shadcdn/button";
import { Plus } from "lucide-react";
import { FormSelect } from "@feature/formSelect";
import { defaultOptions } from "@shared/mock";
import CustomEditor from "@feature/text-editor";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";

const expertGeneralSchema = z.object({
    name: z.string().min(1, "Название обязательно"),
    title: z.string().min(1, "Заголовок обязателен"),
    whitePage: z.string().min(1, "White page обязателен"),
    description: z.string().min(1, "Описание обязательно"),
    domen: z.string().min(1, "Домен обязателен"),
    autoRedirect: z.string().min(1, "Авторедирект обязателен"),
    spot: z.string().min(1, "Спот обязателен"),
    countUsers: z.string().min(1, "Количество участников обязательно"),
});

interface ExpertGeneralTabProps {
    onNextStep: () => void;
}

const ExpertGeneralTab = ({ onNextStep }: ExpertGeneralTabProps) => {

    const [isSend, setStatusSend] = useState<boolean>(true)

    const form = useForm<ExpertGeneralFormType>({
        resolver: zodResolver(expertGeneralSchema),
        mode: "onChange",
        defaultValues: {
            name: "",
            spot: "",
            domen: '',
            description: "",
            title: '',
            whitePage: '',
            countUsers: '',
            autoRedirect: '',
        },
    })

    const onSubmitForm = (data: ExpertGeneralFormType) => {
        console.log(data);
        setStatusSend(false)
        onNextStep()
    }

    const isDisabled = !isSend;

    return (
        <>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmitForm)} className="space-y-3">
                    <FormInput disabled={isDisabled} name="name" control={form.control} label="Название" />
                    <FormInput disabled={isDisabled} name="title" control={form.control} label="Заголовок" />
                    <FormSelect disabled={isDisabled} name="whitePage" control={form.control} label="White page" options={defaultOptions} />
                    <Controller
                        name="description"
                        control={form.control}
                        render={({ field }) => (
                            <CustomEditor value={field.value} readOnly={isDisabled} label="Описание" onChange={field.onChange} />
                        )}
                    />

                    <div className="grid grid-cols-2 gap-3 items-center">
                        <FormSelect disabled={isDisabled} name="domen" control={form.control} label="Домен" options={defaultOptions} />
                        <FormSelect disabled={isDisabled} name="autoRedirect" control={form.control} label="Авторедирект" options={defaultOptions} />
                        <FormSelect disabled={isDisabled} name="spot" control={form.control} label="Спот" options={defaultOptions} />
                        <FormInput disabled={isDisabled} name="countUsers" control={form.control} label="Количество участников" />
                    </div>

                    {isSend ? (
                        <div className="col-span-3">
                            <Button
                                disabled={!form.formState.isValid}
                                type="submit"
                                className="space-x-2 w-full"
                            >
                                <Plus className="w-4 h-4" />
                                Создать лендинг
                            </Button>
                        </div>
                    ) : (
                        <div className="text-green-600 text-center col-span-3">Данный шаг успешно пройден ✅</div>
                    )}
                </form>
            </Form>
        </>
    )
}

export default ExpertGeneralTab