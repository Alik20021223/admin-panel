"use client"

import { useForm } from "react-hook-form"
import { CalendarField } from "@feature/formDate"
import { FormSelect } from "@feature/formSelect"
import { FormFilterTypeFollower } from "@entities/spots/types"
import { Search } from "lucide-react"
import { Button } from "@shadcdn/button"
import { Form } from "@shadcdn/form"
import { defaultOptions } from "@shared/mock"
import { Switch } from "@shadcdn/switch"

interface FormFilterProps {
    onSubmitForm: (data: FormFilterTypeFollower) => void
}

export default function FormFilterFollower({ onSubmitForm }: FormFilterProps) {
    const form = useForm<FormFilterTypeFollower>({
        defaultValues: {
            channel: "",
            fb_campaign: "",
            fb_adset: "",
            fb_ad: "",
            company: "",
            adset_name: "",
            fb_ad_name: "",
            placement: "",
            source_name: "",
            landing: "",
            spot: "",
            country: "",
            buyer: "",
            period: {
                from: new Date("2025-06-12"),
                to: new Date("2025-06-19"),
            },
            bot_activation_date: {
                from: null,
                to: null,
            },
            contact_date: {
                from: null,
                to: null,
            },
            unsubscribe_date: {
                from: null,
                to: null,
            },
            first_sale_date: {
                from: null,
                to: null,
            },
            registration_date: {
                from: null,
                to: null,
            },
            hide_unsubscribed: true,
        },
    })


    const { control, handleSubmit, watch } = form

    return (
        <Form {...form}>
            <form onSubmit={handleSubmit(onSubmitForm)} className="grid grid-cols-3 gap-4">
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
                <FormSelect name="country" control={control} label="Страна" options={defaultOptions} />

                <FormSelect name="buyer" control={control} label="Баер" options={defaultOptions} />
                <CalendarField name="period" control={control} label="Дата подписки" mode="range" />
                <CalendarField name="unsubscribe_date" control={control} label="Дата отписки" />

                <CalendarField name="bot_activation_date" control={control} label="Дата активации бота" mode="range" />
                <CalendarField name="first_sale_date" control={control} label="Первая продажа" mode="range" />
                <CalendarField name="contact_date" control={control} label="Дата контакта" mode="range" />

                <CalendarField name="registration_date" control={control} label="Дата регистрации" mode="range" />
                <div className="flex items-center gap-2 mt-2 col-span-1">
                    <Switch checked={watch("hide_unsubscribed")} onCheckedChange={(val) => form.setValue("hide_unsubscribed", val)} />
                    <span>Не показывать отписавшихся</span>
                </div>

                <div className="col-span-3">
                    <Button type="submit" className="w-full space-x-2">
                        <Search className="w-4 h-4" />
                        <span>Поиск</span>
                    </Button>
                </div>
            </form>
        </Form>
    )
}
