import { FormSelect } from "@feature/formSelect";
import { defaultOptions } from "@shared/mock";
import { Button } from "@shadcdn/button";
import { Form } from "@shadcdn/form";
import { Plus } from "lucide-react";
import { useForm } from "react-hook-form";
import { AccessFormType } from "@entities/landing/types";


const AccessTab = () => {
    const form = useForm<AccessFormType>({
        defaultValues: {
            // channelAccess: '',
            deleteAccess: '',
            showToCountry: '',
        },
    })

    const onSubmitForm = (data: AccessFormType) => {
        console.log(data);

    }

    return (
        <>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmitForm)} className="space-y-3">
                    <div className="grid grid-cols-2 gap-3 items-center">
                        {/* <FormSelect name="channelAccess" control={form.control} label="Права на канал" options={defaultOptions} /> */}
                        <FormSelect name="showToCountry" control={form.control} label="Показывать для стран" options={defaultOptions} />
                        <FormSelect name="deleteAccess" control={form.control} label="Права на удаление" options={defaultOptions} />
                    </div>

                    <div className="col-span-3">
                        <Button type="submit" className="space-x-2 w-full"><Plus className="w-4 h-4" />Создать лендинг</Button>
                    </div>
                </form>
            </Form>
        </>
    )
}

export default AccessTab

