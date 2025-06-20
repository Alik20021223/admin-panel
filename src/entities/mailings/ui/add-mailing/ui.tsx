import { Controller, useForm } from "react-hook-form"
import { FormSelect } from "@feature/formSelect"
import { Plus } from "lucide-react"
import { Button } from "@shadcdn/button"
import { Form } from "@shadcdn/form"
import FormInput from "@feature/formInput"
import { defaultOptions } from "@shared/mock"
import { EditFormType } from "@entities/mailings/types"
import { CalendarTimeField } from "@feature/formDateAndTime"
import { multiOptions } from "@entities/mailings/mock"
import { MultiSelect } from "@feature/MultiSelect"
import CustomEditor from "@feature/text-editor"
import AddButton from "@feature/add-button"
import PreviewContent from "@feature/preview"
import DropFieldInner from "@feature/dropField"

const AddMailing = () => {

    const form = useForm<EditFormType>({
        defaultValues: {
            name: "",
            typeMailing: '',
            dateAndTime: new Date(),
            spot: [],
            text: '',
            media: null,
            buttonsType: [],
            time: '10:20:00',
        },
    })

    const onSubmitForm = (data: EditFormType) => {
        console.log(data);

    }

    const text = form.watch('text')
    const buttonsType = form.watch('buttonsType')

    return (
        <>
            <div className="px-2 py-3 bg-white rounded-lg">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmitForm)} className="space-y-3">
                        <div className="grid grid-cols-2 gap-3 items-center">
                            <FormInput name="name" control={form.control} label="Введите название" />
                            <FormSelect name="typeMailing" control={form.control} label="Тип рассылки" options={defaultOptions} />
                            <div className="w-full">
                                <CalendarTimeField
                                    name="dateAndTime"
                                    timeName="time"
                                    control={form.control}
                                    label="Meeting time"
                                />
                            </div>
                            <Controller
                                name="spot"
                                control={form.control}
                                render={({ field }) => (
                                    <MultiSelect
                                        options={multiOptions}
                                        value={field.value}
                                        label="Cпот"
                                        onChange={field.onChange}
                                        placeholder="Выберите cпот"
                                    />
                                )}
                            />



                        </div>

                        <PreviewContent text={text} buttonArray={buttonsType} />

                        <Controller
                            name="text"
                            control={form.control}
                            render={({ field }) => (
                                <CustomEditor value={field.value} onChange={field.onChange} />
                            )}
                        />

                        <Controller
                            name="media"
                            control={form.control}
                            render={({ field }) => (
                                <DropFieldInner field={field} label="Медиа" />
                            )}
                        />

                        <AddButton name="buttonsType" />
                        <div className="col-span-3">
                            <Button type="submit" className="space-x-2 w-full"><Plus className="w-4 h-4" />Добавить рассылку</Button>
                        </div>
                    </form>
                </Form>
            </div>
        </>
    )
}

export default AddMailing