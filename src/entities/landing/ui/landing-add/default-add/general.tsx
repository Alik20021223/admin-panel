import FormInput from "@feature/formInput"
import { FormSelect } from "@feature/formSelect"
import { GeneralFormType } from "@entities/landing/types"
import { Button } from "@shadcdn/button"
import { Form } from "@shadcdn/form"
import { useForm } from "react-hook-form"
import { Plus } from "lucide-react"
import { defaultOptions, postBackOptions } from "@shared/mock"
import { useQueryInfoAddForm } from "@entities/landing/hooks/get-info-add-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { defaultGeneralSchema } from "../validation"

interface GeneralTabProps {
    onNextStep: () => void;
}

const GeneralTab = ({ onNextStep }: GeneralTabProps) => {

    const form = useForm<GeneralFormType>({
        resolver: zodResolver(defaultGeneralSchema),
        mode: "onChange",
        defaultValues: {
            name: "",
            spot: "",
            domen: '',
            autoRedirect: '',
        },
    })

    const { data: InfoData } = useQueryInfoAddForm()

    console.log(InfoData);


    const onSubmitForm = (data: GeneralFormType) => {
        console.log(data);
        onNextStep()
    }

    return (
        <>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmitForm)} className="space-y-3">
                    <FormInput name="name" control={form.control} label="Введите название" />
                    <FormSelect name="domen" control={form.control} label="Домен" options={defaultOptions} />
                    <div className="grid grid-cols-2 gap-3 items-center">
                        <FormSelect name="autoRedirect" control={form.control} label="Авторедирект" options={postBackOptions} />
                        <FormSelect name="spot" control={form.control} label="Спот" options={defaultOptions} />
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