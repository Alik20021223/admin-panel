import { FormSelect } from "@feature/formSelect";
import { defaultOptions } from "@shared/mock";
import { Button } from "@shadcdn/button";
import { Form } from "@shadcdn/form";
import { Plus } from "lucide-react";
import { useForm } from "react-hook-form";
import { AccessFormType } from "@entities/landing/types";

import { zodResolver } from "@hookform/resolvers/zod";
import { AccessSchema } from "../validation";




const ExpertAccessTab = () => {
    const form = useForm<AccessFormType>({
        resolver: zodResolver(AccessSchema),
        mode: "onChange",
        defaultValues: {
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
                        <FormSelect name="showToCountry" control={form.control} label="Показывать для стран" options={defaultOptions} />
                        <FormSelect name="deleteAccess" control={form.control} label="Права на удаление" options={defaultOptions} />
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

export default ExpertAccessTab

