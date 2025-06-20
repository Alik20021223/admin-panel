"use client"

import { useForm } from "react-hook-form"
import { CalendarField } from "@feature/formDate"
import { FormSelect } from "@feature/formSelect"
import { FormType } from "@entities/statistic/types"
import { Search } from "lucide-react"
import { Button } from "@shadcdn/button"
import { Form } from "@shadcdn/form"
import { defaultOptions } from "@shared/mock"

interface FormFilterProps {
    onSubmitForm: (data: FormType) => void
}

export default function FormFilter({ onSubmitForm }: FormFilterProps) {
    const form = useForm()

    const { control, handleSubmit } = useForm({
        defaultValues: {
            period: {
                from: new Date("2025-06-01"),
                to: new Date("2025-06-10"),
            },
            fb_adset: "",
            fb_campaign: "",
            fb_ad: "",
            fb_ad_name: "",
            adset_name: "",
            source_name: "",
            spot_type: "",
            channel: "",
            company: "",
            placement: "",
            landing: "",
            spot: "",
            country: "",
            buyer: "",
        },
    })



    return (
        <Form {...form}>
            <form onSubmit={handleSubmit(onSubmitForm)} className="grid grid-cols-3 gap-3">
                <CalendarField name="period" control={control} label="Дата" mode="range" required />
                <FormSelect name="channel" control={control} label="Рекламный канал" options={defaultOptions} />
                <FormSelect name="fb_campaign" control={control} label="Кампания ФБ" options={defaultOptions} />
                <FormSelect name="fb_adset" control={control} label="Эдсет ФБ" options={defaultOptions} />
                <FormSelect name="fb_ad" control={control} label="Объявление ФБ" options={defaultOptions} />
                <FormSelect name="company" control={control} label="Название компании" options={defaultOptions} />
                <FormSelect name="adset_name" control={control} label="Название Эдсета" options={defaultOptions} />
                <FormSelect name="fb_ad_name" control={control} label="Название объявления" options={defaultOptions} />
                <FormSelect name="placement" control={control} label="Место размещения" options={defaultOptions} />
                <FormSelect name="source_name" control={control} label="Название источника" options={defaultOptions} />
                <FormSelect name="landing" control={control} label="Лэндинг" options={defaultOptions} />
                <FormSelect name="spot" control={control} label="Спот" options={defaultOptions} />
                <FormSelect name="spot_type" control={control} label="Тип спота" options={defaultOptions} />
                <FormSelect name="country" control={control} label="Страна" options={defaultOptions} />
                <FormSelect name="buyer" control={control} label="Байер" options={defaultOptions} />

                <div className="col-span-3">
                    <Button type="submit" className="space-x-2 w-full"><Search className="w-4 h-4" />Поиск</Button>
                </div>
            </form>
        </Form>
    )
}
