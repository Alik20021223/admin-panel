import { Button } from "@shadcdn/button"
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@shadcdn/card"
import { Search, XIcon } from "lucide-react"
import { FC } from "react";
import { FormType } from "@entities/spots/types";
import { Controller, useForm } from "react-hook-form";
import { Form } from "@shadcdn/form";
import FormInput from "@feature/formInput";
import { MultiSelect } from "@feature/MultiSelect";
import { typeSpotTelegram } from "@entities/spots/mock";

interface FilterRowProps {
    onClose: () => void
    onSubmit: (data: FormType) => void
}

const FilterRow: FC<FilterRowProps> = ({ onClose, onSubmit }) => {

    const form = useForm<FormType>({
        defaultValues: {
            search: '',
            typeSpot: []
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
                        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col space-y-5">
                            <FormInput name="search" control={form.control} label="Поиск" />
                            <Controller
                                name="typeSpot"
                                control={form.control}
                                render={({ field }) => (
                                    <MultiSelect
                                        options={typeSpotTelegram}
                                        value={field.value}
                                        label="Тип спота"
                                        onChange={field.onChange}
                                        placeholder="Выберите cпот"
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

export default FilterRow