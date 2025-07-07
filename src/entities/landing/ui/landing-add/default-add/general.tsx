import FormInput from "@feature/formInput"
import { FormSelect } from "@feature/formSelect"
import { GeneralFormType } from "@entities/landing/types"
import { Button } from "@shadcdn/button"
import { Form } from "@shadcdn/form"
import { useForm } from "react-hook-form"
import { Plus } from "lucide-react"
import { postBackOptions } from "@shared/mock"
import { zodResolver } from "@hookform/resolvers/zod"
import { defaultGeneralSchema } from "../validation"
import { mapToSelectOptions } from "@shared/utils"
import { useLandingStore } from "@/entities/landing/store"
import { useEffect } from "react"
import { countryMock } from "country-data"
import { FormMultiSelectCountry } from "@feature/formSelectСountry"
import { useCreateDefaultLanding } from "@entities/landing/hooks/create-landing-default"

const GeneralTab = () => {

    const { infoData } = useLandingStore()

    const { mutateAsync } = useCreateDefaultLanding()

    const form = useForm<GeneralFormType>({
        resolver: zodResolver(defaultGeneralSchema),
        mode: "onChange",
        defaultValues: {
            name: "",
            spot: "",
            domen: "",
            showToCountry: [],
            autoRedirect: String(infoData.auto_redirect),
        },
    })

    useEffect(() => {
        if (infoData.auto_redirect !== false) {

            // console.log(infoData);

            form.reset({
                name: "",
                spot: "",
                domen: "",
                showToCountry: [],
                autoRedirect: String(infoData.auto_redirect),
            });
        }
    }, [infoData.auto_redirect]);

    console.log(form.watch());

    const DomainOptions = mapToSelectOptions(infoData?.domains, "id", "url");
    const SpotsOptions = mapToSelectOptions(infoData?.spots, "channel_id", "title");


    // const optionsDomains = mapToSelectOptions(InfoData)


    const onSubmitForm = (data: GeneralFormType) => {
        console.log(data);

        mutateAsync({
            name: data.name,
            domain_id: Number(data.domen),
            spot_id: Number(data.spot),
            allowed_countries: data.showToCountry,
            auto_redirect: Boolean(data.autoRedirect)
        })
    }

    return (
        <>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmitForm)} className="space-y-3">
                    <FormInput name="name" control={form.control} label="Введите название" />
                    <FormSelect name="domen" control={form.control} label="Домен" options={DomainOptions} />
                    <FormMultiSelectCountry
                        name="showToCountry"
                        control={form.control}
                        label="Показывать для стран"
                        options={countryMock}
                    />
                    <div className="grid grid-cols-2 gap-3 items-center">
                        <FormSelect name="autoRedirect" control={form.control} label="Авторедирект" options={postBackOptions} />
                        <FormSelect name="spot" control={form.control} label="Спот" options={SpotsOptions} />
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

export default GeneralTab