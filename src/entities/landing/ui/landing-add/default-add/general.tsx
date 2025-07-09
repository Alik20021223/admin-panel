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
import { useNavigate } from "react-router-dom"

const GeneralTab = () => {

    const { infoData, editLanding, editData } = useLandingStore()

    const { mutateAsync } = useCreateDefaultLanding()

    const navigate = useNavigate()



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

    const DomainOptions = mapToSelectOptions(infoData?.domains, "id", "url");
    const SpotsOptions = mapToSelectOptions(infoData?.spots, "id", "title");

    const onSubmitForm = (data: GeneralFormType) => {
        const spotType = infoData?.spots.find(spot => spot.id === Number(data.spot))?.spot_type ?? "";

        mutateAsync({
            name: data.name,
            spot_type: spotType,
            domain_id: Number(data.domen),
            spot_id: Number(data.spot),
            allowed_countries: data.showToCountry,
            auto_redirect: Boolean(data.autoRedirect)
        })

        navigate('/landings')
    }

    useEffect(() => {
        if (editLanding && editData && infoData.spots.length && infoData.domains.length) {
            form.reset({
                name: editData.landing.name || "",
                domen: String(editData.current_landing.domain.id),
                spot: String(editData.current_landing.spot.id),
                showToCountry: editData.landing.allowed_countries || [],
                autoRedirect: String(editData.landing.auto_redirect),
            });
        }
    }, [editLanding, editData, infoData.spots, infoData.domains]);


    console.log(form.watch());



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