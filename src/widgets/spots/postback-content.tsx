import { Button } from "@shadcdn/button"
import { Funnel, Search } from "lucide-react"
import { useState } from "react"
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@shadcdn/card"
import { XIcon } from "lucide-react"
import { Form } from "@shadcdn/form"
import { CalendarField } from "@feature/formDate"
import { useForm } from "react-hook-form"

type typeFilter = {
    dateSend: Date | null
}


const SpotPostBack = () => {

    const [openFilterData, setFilterData] = useState<boolean>(false)

    const form = useForm<typeFilter>({
        defaultValues: {
            dateSend: null
        },
    })

    const onSubmitForm = (data: typeFilter) => {
        console.log(data);

    }

    return (
        <>
            <Button onClick={() => setFilterData(true)} variant="outline">Фильтр данных
                <Funnel />
            </Button>

            {openFilterData && <Card className="relative">
                <CardHeader >
                    <CardTitle className="text-xl">Фильтр</CardTitle>
                    <Button
                        onClick={() => setFilterData(false)}
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
                        <form onSubmit={form.handleSubmit(onSubmitForm)} className="space-y-3">
                            <div className="grid grid-cols-2 gap-3">
                                <CalendarField name="dateSend" control={form.control} label="Дата отправки" mode="single" />
                            </div>
                            <div className="col-span-3">
                                <Button type="submit" className="space-x-2 w-full">
                                    <Search className="w-4 h-4" />Поиск
                                </Button>
                            </div>
                        </form>
                    </Form>
                </CardContent>
            </Card>}

            <div className="px-3 py-4 bg-white rounded-lg border">
                В данный момент мы не отправили и не приняли ни одного постбэка для этого канала
            </div>
        </>
    )
}

export default SpotPostBack