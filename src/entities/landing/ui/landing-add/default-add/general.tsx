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

interface GeneralTabProps {
    onNextStep: () => void;
}

const GeneralTab = ({ onNextStep }: GeneralTabProps) => {

    const { infoData } = useLandingStore()

    const form = useForm<GeneralFormType>({
        resolver: zodResolver(defaultGeneralSchema),
        mode: "onChange",
        defaultValues: {
            name: "",
            spot: "",
            domen: "",
            autoRedirect: String(infoData.auto_redirect),
        },
    })

    useEffect(() => {
        if (infoData.auto_redirect !== false) {

            console.log(infoData);
            
            form.reset({
                name: "",
                spot: "",
                domen: "",
                autoRedirect: String(infoData.auto_redirect),
            });
        }
    }, [infoData.auto_redirect]);

    console.log(form.watch());
    




    const DomainOptions = mapToSelectOptions(infoData?.domains, "id", "url");
    const SpotsOptions = mapToSelectOptions(infoData?.spots, "id", "title");


    // const optionsDomains = mapToSelectOptions(InfoData)


    const onSubmitForm = (data: GeneralFormType) => {
        console.log(data);
        onNextStep()
    }

    return (
        <>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmitForm)} className="space-y-3">
                    <FormInput name="name" control={form.control} label="Введите название" />
                    <FormSelect name="domen" control={form.control} label="Домен" options={DomainOptions} />
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