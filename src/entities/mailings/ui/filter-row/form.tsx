import { useForm } from "react-hook-form"
import { FormSelect } from "@feature/formSelect"
import { FormType } from "@entities/mailings/types"
import { Search } from "lucide-react"
import { Button } from "@shadcdn/button"
import { Form } from "@shadcdn/form"
import FormInput from "@feature/formInput"
import { defaultOptions } from "@shared/mock"

interface FormFilterProps {
    onSubmitForm: (data: FormType) => void
}

export default function FormFilter({ onSubmitForm }: FormFilterProps) {
    const form = useForm<FormType>({
        defaultValues: {
            search: "",
            typeMailing: '',
            status: '',
            spot: ''
        },
    })


    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmitForm)} className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                    <FormInput name="search" control={form.control} label="Поиск" />
                    <FormSelect name="status" control={form.control} label="Статус" options={defaultOptions} />
                    <FormSelect name="typeMailing" control={form.control} label="Тип рассылки" options={defaultOptions} />
                    <FormSelect name="spot" control={form.control} label="Спот" options={defaultOptions} />
                </div>
                <div className="col-span-3">
                    <Button type="submit" className="space-x-2 w-full"><Search className="w-4 h-4" />Поиск</Button>
                </div>
            </form>
        </Form>
    )
}
