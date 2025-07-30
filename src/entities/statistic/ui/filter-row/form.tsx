"use client"

import { useForm } from "react-hook-form"
import { CalendarField } from "@feature/formDate"
import { FormType } from "@entities/statistic/types"
import { Search } from "lucide-react"
import { Button } from "@shadcdn/button"
import { Form } from "@shadcdn/form"

interface FormFilterProps {
    onSubmitForm: (data: FormType) => void
}

export default function FormFilter({ onSubmitForm }: FormFilterProps) {
    const form = useForm()

    const { control, handleSubmit } = useForm({
        defaultValues: {
            period: {
                from: null,
                to: null,
            },
        },
    })

    // console.log(form.watch("period"));

    return (
        <Form {...form}>
            <form onSubmit={handleSubmit(onSubmitForm)} className="grid grid-cols-3 gap-3">
                <CalendarField name="period" control={control} label="Дата" mode="range" required />
                <div className="col-span-3">
                    <Button type="submit" className="space-x-2 w-full"><Search className="w-4 h-4" />Поиск</Button>
                </div>
            </form>
        </Form>
    )
}
