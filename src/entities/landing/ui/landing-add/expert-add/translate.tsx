
import { Button } from "@shadcdn/button";
import { Form } from "@shadcdn/form";
import { Plus } from "lucide-react";
import { useForm } from "react-hook-form";
import { TranslateFormType } from "@entities/landing/types";
import FormInput from "@feature/formInput";

interface ExpertTranslateTabProps {
    onNextStep: () => void;
}


const ExpertTranslateTab = ({ onNextStep }: ExpertTranslateTabProps) => {
    const form = useForm<TranslateFormType>({
        defaultValues: {
            textDownload: "",
            textViewTelegram: "",
            textMembers: "",
        },
    })

    const onSubmitForm = (data: TranslateFormType) => {
        console.log(data);
        onNextStep()
    }

    return (
        <>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmitForm)} className="space-y-3">
                    <div className="grid grid-cols-2 gap-3 items-center">
                        <FormInput name="textDownload" control={form.control} label='Текст кнопки "Download"' />
                        <FormInput name="textViewTelegram" control={form.control} label='Текст кнпоки "View in Telegram"' />
                        <FormInput name="textMembers" control={form.control} label='Текст надписи "members"' />
                    </div>

                    <div className="col-span-3">
                        <Button type="submit" className="space-x-2 w-full"><Plus className="w-4 h-4" />Создать лендинг</Button>
                    </div>
                </form>
            </Form>
        </>
    )
}

export default ExpertTranslateTab

