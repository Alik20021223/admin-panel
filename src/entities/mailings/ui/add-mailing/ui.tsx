import { Controller, useForm } from "react-hook-form"
import { FormSelect } from "@feature/formSelect"
import { Plus } from "lucide-react"
import { Button } from "@shadcdn/button"
import { Form } from "@shadcdn/form"
import FormInput from "@feature/formInput"
import { dayOptions, mailingTypesObjects } from "@shared/mock"
// import { EditFormType } from "@entities/mailings/types"
import { CalendarTimeField } from "@feature/formDateAndTime"
import { MultiSelect } from "@feature/MultiSelect"
import CustomEditor from "@feature/text-editor"
import AddButton from "@feature/add-button"
import PreviewContent from "@feature/preview"
import DropFieldInner from "@feature/dropField"
import { useQueryFormMailing } from "@entities/mailings/hooks/get-data-form"
import { mapToSelectOptions } from "@shared/utils"
import { TimeInputField } from "@feature/FormTime"
import { useCreateMailing } from "@entities/mailings/hooks/create-mailing"
import { mergeDateAndTime } from "@shared/utils"
import { useGetInfoMailing } from "@entities/mailings/hooks/get-mailing-by-id"
import { useNavigate, useSearchParams } from "react-router-dom"
import { useEffect } from "react"
import { useUpdateMailing } from "@entities/mailings/hooks/update-mainling"
import { zodResolver } from "@hookform/resolvers/zod"
import { EditFormSchema, EditFormType } from "./validation"
// import { z } from "zod"

const AddMailing = () => {

    const { data: FormDataMock } = useQueryFormMailing()
    const [searchParams] = useSearchParams();
    const edit = searchParams.get("edit");
    const { mutateAsync } = useCreateMailing()
    const { mutateAsync: EditMutate } = useUpdateMailing()
    const navigate = useNavigate()

    const { data: infoMailing } = useGetInfoMailing(edit || "")

    const imagePreviewUrl = infoMailing?.current_mailing?.image ?? "";

    const form = useForm<EditFormType>({
        resolver: zodResolver(EditFormSchema),
        defaultValues: {
            name: "",
            typeMailing: 'permanent',
            dateAndTime: new Date(),
            spot: [],
            text: '',
            media: null,
            buttonsType: [],
            time: "",
            daysOfWeek: [],
        },
    });

    useEffect(() => {
        if (infoMailing?.current_mailing) {
            const mailing = infoMailing.current_mailing;

            const scheduledDate = new Date(mailing.scheduled_at);
            const date = scheduledDate.toISOString().split("T")[0]; // yyyy-mm-dd
            const time = scheduledDate.toTimeString().split(" ")[0]; // HH:mm:ss

            form.reset({
                name: mailing.mailing_name,
                typeMailing: mailing.mailing_type,
                text: mailing.text,
                spot: mailing.spots.map((s) => String(s)),
                dateAndTime: new Date(date),
                time: time,
                daysOfWeek: mailing.days_of_week,
                media: null,
                buttonsType: mailing.buttons.map((btn) => ({
                    name: btn.text,
                    url: btn.url,
                    id: Math.floor(Math.random() * 100000), // или btn.id, если он есть
                })),
            });
        }
    }, [infoMailing, form]);


    const SpotsOptions = mapToSelectOptions(FormDataMock?.channels, "id", "title");
    const mailingTypesOptions = mapToSelectOptions(
        mailingTypesObjects,
        "value",
        "label"
    );

    const onSubmitForm = async (data: EditFormType) => {
        const dateAndTime = mergeDateAndTime(data.dateAndTime ?? new Date(), data.time ?? '');
        const spotsArray = data.spot.map((s) => Math.abs(Number(s)));
        const spotsString = JSON.stringify(spotsArray); // Получишь например "[1002684105006]"
        const mappedButtons = data.buttonsType.map((btn) => ({
            text: btn.name,
            url: btn.url,
        }));

        const formData = new FormData();
        formData.append("mailing_name", data.name);
        formData.append("mailing_type", data.typeMailing);
        formData.append("spots", spotsString); // обязательно строкой
        formData.append("text", data.text);
        formData.append("date_and_time", dateAndTime);
        formData.append("buttons", JSON.stringify(mappedButtons));

        if (data.daysOfWeek && data.daysOfWeek.length > 0) {
            formData.append("days_of_week", JSON.stringify(data.daysOfWeek));
        }

        if (data.media) {
            formData.append("image", data.media); // пользователь выбрал новый файл
        } else if (imagePreviewUrl) {
            formData.append("image", imagePreviewUrl); // оставляем старое изображение
        }


        // console.log(data);


        if (edit) {
            EditMutate({ payload: formData, id: edit || "" })
            navigate('/mailings')
        } else {
            navigate('/mailings')
            mutateAsync(formData);
        }
    };

    const text = form.watch('text')
    const buttonsType = form.watch('buttonsType')
    const typeMailing = form.watch('typeMailing')

    return (
        <>
            <div className="px-2 py-3 bg-white rounded-lg">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmitForm)} className="space-y-3">
                        <div className="grid grid-cols-2 gap-3 items-center">
                            <FormInput name="name" control={form.control} label="Введите название" />
                            <FormSelect name="typeMailing" control={form.control} label="Тип рассылки" options={mailingTypesOptions} />
                            {
                                typeMailing === "permanent"
                                    ?
                                    <>
                                        <TimeInputField
                                            name="time"
                                            control={form.control}
                                            label="Время"
                                        />

                                        {/* dayOptions */}
                                        <Controller
                                            name="daysOfWeek"
                                            control={form.control}
                                            render={({ field }) => (
                                                <MultiSelect
                                                    options={dayOptions}
                                                    value={field.value || []}
                                                    label="День недели"
                                                    onChange={field.onChange}
                                                    placeholder="Выберите "
                                                />
                                            )}
                                        />
                                    </>
                                    : <div className="w-full">
                                        <CalendarTimeField
                                            name="dateAndTime"
                                            timeName="time"
                                            control={form.control}
                                            label="Дата и время"
                                        />
                                    </div>
                            }

                            <Controller
                                name="spot"
                                control={form.control}
                                render={({ field }) => (
                                    <MultiSelect
                                        options={SpotsOptions}
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
                                <CustomEditor value={field.value} label="Текст" onChange={field.onChange} />
                            )}
                        />

                        <Controller
                            name="media"
                            control={form.control}
                            render={({ field }) => (
                                <DropFieldInner
                                    field={field}
                                    label="Медиа"
                                    previewUrl={imagePreviewUrl} // <-- сюда пробрасываем ссылку
                                />
                            )}
                        />

                        <AddButton name="buttonsType" />
                        <div className="col-span-3">
                            <Button
                                type="submit"
                                disabled={!form.formState.isValid}
                                className="space-x-2 w-full"
                            >
                                <Plus className="w-4 h-4" />
                                Добавить рассылку
                            </Button>
                        </div>
                    </form>
                </Form>
            </div>
        </>
    )
}

export default AddMailing