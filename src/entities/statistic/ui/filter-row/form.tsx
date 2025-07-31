"use client"

import { useForm } from "react-hook-form"
import { CalendarField } from "@feature/formDate"
import { FormSelect } from "@feature/formSelect"
import { FormType } from "@entities/statistic/types"
import { Search } from "lucide-react"
import { Button } from "@shadcdn/button"
import { Form } from "@shadcdn/form"
import { useGetDataForm } from "@entities/statistic/hooks/get-data-form"
import { useMemo, useState } from "react"
import { mapToSelectOptions } from "@shared/utils"

interface FormFilterProps {
    onSubmitForm: (data: FormType) => void
}

export default function FormFilter({ onSubmitForm }: FormFilterProps) {
    const [isLoading, setIsLoading] = useState(false)

    const form = useForm()

    const { control, handleSubmit } = useForm({
        defaultValues: {
            period: {
                from: new Date(),
                to: new Date(),
            },
            pixel: 0,
            campaign_id: " ",
            campaign_name: " ",
            adset_id: " ",
            adset_name: " ",
            ad_id: " ",
            ad_name: " ",
            placement: " ",
            site_source_name: " ",
            landing: " ",
            channels: " ",
            date_from: " ",
            date_to: " ",
            domain: " ",
        },
    })

    const { data } = useGetDataForm()

    const selectOptions = useMemo(() => {
        if (!data) return {};

        return {
            pixel: data.pixel?.map((val) => ({ label: val, value: val })) || [],
            campaign_id: data.campaign_id?.map((val) => ({ label: val, value: val })) || [],
            adset_id: data.adset_id?.map((val) => ({ label: val, value: val })) || [],
            ad_id: data.ad_id?.map((val) => ({ label: val, value: val })) || [],
            campaign_name: data.campaign_name?.map((val) => ({ label: val, value: val })) || [],
            adset_name: data.adset_name?.map((val) => ({ label: val, value: val })) || [],
            ad_name: data.ad_name?.map((val) => ({ label: val, value: val })) || [],
            placement: data.placement?.map((val) => ({ label: val, value: val })) || [],
            site_source_name: data.site_source_name?.map((val) => ({ label: val, value: val })) || [],
            landing: mapToSelectOptions(data.landings, "id", "name"),
            channels: mapToSelectOptions(data.channels, "id", "name"),
        };
    }, [data]);

    const handleFormSubmit = (data: FormType) => {

        setIsLoading(true);

        const { period, ...rest } = data;



        onSubmitForm({
            ...rest,
            date_from: period?.from?.toISOString() ?? "",
            date_to: period?.to?.toISOString() ?? "",
            period, // если нужно сохранить сам `period`, иначе можно убрать
        });

        setTimeout(() => {
            setIsLoading(false);
        }, 1000);
    };

    return (
        <Form {...form}>
            <form onSubmit={handleSubmit(handleFormSubmit)} className="grid grid-cols-3 gap-3">
                <CalendarField name="period" control={control} label="Дата" mode="range" required />
                <FormSelect name="pixel" control={control} label="Рекламный канал" options={selectOptions.pixel || []} />
                <FormSelect name="campaign_id" control={control} label="Кампания ФБ" options={selectOptions.campaign_id || []} />
                <FormSelect name="adset_id" control={control} label="Эдсет ФБ" options={selectOptions.adset_id || []} />
                <FormSelect name="ad_id" control={control} label="Объявление ФБ" options={selectOptions.ad_id || []} />
                <FormSelect name="campaign_name" control={control} label="Название компании" options={selectOptions.campaign_name || []} />
                <FormSelect name="adset_name" control={control} label="Название Эдсета" options={selectOptions.adset_name || []} />
                <FormSelect name="ad_name" control={control} label="Название объявления" options={selectOptions.ad_name || []} />
                <FormSelect name="placement" control={control} label="Место размещения" options={selectOptions.placement || []} />
                <FormSelect name="site_source_name" control={control} label="Название источника" options={selectOptions.site_source_name || []} />
                <FormSelect name="landing" control={control} label="Лэндинг" options={selectOptions.landing || []} />
                <FormSelect name="channels" control={control} label="Спот" options={selectOptions.channels || []} />


                <div className="col-span-3">
                    <Button type="submit" className="space-x-4 w-full">
                        <Search className="w-4 h-4" />Поиск
                        {isLoading && <div className="inline-block w-6 h-6 border-4 border-slate-50 border-t-transparent rounded-full animate-spin"></div>}
                    </Button>
                </div>
            </form>
        </Form>
    )
}