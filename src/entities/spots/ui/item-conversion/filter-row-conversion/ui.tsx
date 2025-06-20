import { Button } from "@shadcdn/button"
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@shadcdn/card"
import { Search, XIcon } from "lucide-react"
import { FC } from "react";
import { FormTypeConversion } from "@entities/spots/types";
import { Controller, useForm } from "react-hook-form";
import { Form } from "@shadcdn/form";
import FormInput from "@feature/formInput";
import { MultiSelect } from "@feature/MultiSelect";
import { typeSpotTelegram } from "@entities/spots/mock";
import { CalendarField } from "@feature/formDate";

interface FilterRowConversionProps {
    onClose: () => void
    onSubmit: (data: FormTypeConversion) => void
}

const FilterRowConversion: FC<FilterRowConversionProps> = ({ onClose, onSubmit }) => {

    const form = useForm<FormTypeConversion>({
        defaultValues: {
            search: '',
            typeSpot: [],
            period: {
                from: new Date("2025-06-01"),
                to: new Date("2025-06-10"),
            },
        },
    })

    return (
        <>
            <Card className="relative">
                <CardHeader >
                    <CardTitle className="text-xl">Фильтр</CardTitle>
                    <Button
                        onClick={onClose}
                        size="icon"
                        variant="ghost"
                        className="absolute top-2 right-2 opacity-70 hover:opacity-100"
                    >
                        <XIcon className="w-4 h-4" />
                        <span className="sr-only">Закрыть</span>
                    </Button>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-3 gap-3 items-end">
                            <FormInput name="search" control={form.control} label="Поиск" />
                            <CalendarField name="period" control={form.control} label="Дата" mode="range" required />
                            <Controller
                                name="typeSpot"
                                control={form.control}
                                render={({ field }) => (
                                    <MultiSelect
                                        options={typeSpotTelegram}
                                        value={field.value}
                                        label="Тип"
                                        onChange={field.onChange}
                                        placeholder="Выберите"
                                    />
                                )}
                            />

                            <div className="col-span-3">
                                <Button type="submit" className="space-x-2 w-full">
                                    <Search className="w-4 h-4" />
                                    Поиск
                                </Button>
                            </div>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </>
    )
}

export default FilterRowConversion