import { ExpertGeneralFormType } from "@entities/landing/types";
import { Controller, useForm } from "react-hook-form";
import { Form } from "@shadcdn/form"
import FormInput from "@feature/formInput";
import { Button } from "@shadcdn/button";
import { Plus } from "lucide-react";
import { FormSelect } from "@feature/formSelect";
import { defaultOptions } from "@shared/mock";
import CustomEditor from "@feature/text-editor";
import { zodResolver } from "@hookform/resolvers/zod";
import { expertGeneralSchema } from "../validation";
import { countryMock } from "country-data";
import { FormMultiSelectCountry } from "@feature/formSelectСountry";
import { useCreateProLanding } from "@entities/landing/hooks/create-landing-pro";



interface ExpertGeneralTabProps {
    onNextStep: () => void;
}

const ExpertGeneralTab = ({ onNextStep }: ExpertGeneralTabProps) => {
    const form = useForm<ExpertGeneralFormType>({
        resolver: zodResolver(expertGeneralSchema),
        mode: "onChange",
        defaultValues: {
            name: "",
            spot: "",
            domen: '',
            description: "",
            title: '',
            countUsers: '',
            autoRedirect: '',
            showToCountry: [],
        },
    })

    const { mutateAsync } = useCreateProLanding()

    const onSubmitForm = (data: ExpertGeneralFormType) => {
        console.log(data);
        mutateAsync({
            members: Number(data.countUsers),
            title: data.title,
            name: data.name,
            description: data.description,
            auto_redirect: Boolean(data.autoRedirect),
            domain_id: Number(data.domen),
            spot_type: data.spot,
            spot_id: Number(data.spot),
        })
        onNextStep()
    }

    return (
        <>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmitForm)} className="space-y-3">
                    <FormInput name="name" control={form.control} label="Название" />
                    <FormInput name="title" control={form.control} label="Заголовок" />
                    {/* <FormSelect name="whitePage" control={form.control} label="White page" options={defaultOptions} /> */}
                    <FormMultiSelectCountry name="showToCountry" control={form.control} label="Показывать для стран" options={countryMock} />
                    <Controller
                        name="description"
                        control={form.control}
                        render={({ field }) => (
                            <CustomEditor value={field.value} label="Описание" onChange={field.onChange} />
                        )}
                    />

                    <div className="grid grid-cols-2 gap-3 items-center">
                        <FormSelect name="domen" control={form.control} label="Домен" options={defaultOptions} />
                        <FormSelect name="autoRedirect" control={form.control} label="Авторедирект" options={defaultOptions} />
                        <FormSelect name="spot" control={form.control} label="Спот" options={defaultOptions} />
                        <FormInput name="countUsers" control={form.control} label="Количество участников" />
                    </div>

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
                </form>
            </Form>
        </>
    )
}

export default ExpertGeneralTab