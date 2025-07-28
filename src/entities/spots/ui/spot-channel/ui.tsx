import { Button } from "@shadcdn/button";
import FormInput from "@feature/formInput";
import { Form } from "@shadcdn/form";
import { useForm } from "react-hook-form";
import { StepOneSpotChannel } from "@entities/spots/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { StepOneSpotSchema } from "./validation";
import { Checkbox } from "@shadcdn/checkbox";
import { Label } from "@shadcdn/label";
import { useEffect, useState } from "react";
import SecondStep from "./second-step";
import { Plus } from "lucide-react";
import { useCheckChannel } from "@entities/spots/hooks/check-channel";
import { useSpotAddMessage } from "@entities/spots/hooks/spots-add-channel-message";
import { useSpotAddPhoto } from "@entities/spots/hooks/spots-add-channel-photo";
import { useGetInfoSpotChannel } from "@entities/spots/hooks/get-channel-by-id";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useCreateSpot } from "@entities/spots/hooks/create-channel";
import { useUpdateSpot } from "@entities/spots/hooks/put-channel";
import { useUpdateSpotPhoto } from "@entities/spots/hooks/update-spot-channel-photo";
import { toast } from "sonner";

const FirstStep = () => {

    const [checked, setChecked] = useState<boolean>(false)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [searchParams] = useSearchParams()
    const editId = searchParams.get('edit')
    const navigate = useNavigate()

    const form = useForm<StepOneSpotChannel>({
        resolver: zodResolver(StepOneSpotSchema),
        defaultValues: {
            idChannel: "-",
            tokenBot: "",
            autoReception: false,
            HelloSelect: false,
            textHello: "",
            mediaHello: null,
            buttonsTypeHello: [],
            title: "",
        },
        mode: "all",
    })

    const { mutateAsync: AddSpotMessage } = useSpotAddMessage()
    const { mutateAsync: AddSpotPhoto } = useSpotAddPhoto()
    const { mutateAsync } = useCheckChannel()
    const { mutateAsync: CreateSpot } = useCreateSpot()
    const { mutateAsync: UpdateSpot } = useUpdateSpot()
    const { mutateAsync: UpdateSpotPhoto } = useUpdateSpotPhoto()



    const { data: EditData } = useGetInfoSpotChannel(editId || "")

    useEffect(() => {
        if (EditData?.channel) {
            const channel = EditData.channel;

            form.reset({
                idChannel: String(channel.channel_id),
                tokenBot: channel.bot_token,
                autoReception: true, // если у тебя нет этого значения в EditData — можешь оставить false
                HelloSelect: Boolean(channel.welcome_message || channel.welcome_buttons.length > 0),
                textHello: channel.welcome_message ?? "",
                mediaHello: null, // см. ниже про превью
                buttonsTypeHello: channel.welcome_buttons.map(btn => ({
                    name: btn.text_button,
                    url: btn.url_button,
                    id: btn.id
                })),
                title: EditData.channel.title,
            });

            setChecked(true); // если хочешь сразу показать второй шаг
        }
    }, [EditData, form]);


    const onSubmitForm = async (data: StepOneSpotChannel) => {
        const mappedButtons = data.buttonsTypeHello.map((btn) => ({
            text_button: btn.name,
            url_button: btn.url,
        }));

        const formData = new FormData();

        if (editId) {
            await UpdateSpot({
                payload: {
                    token: form.getValues("tokenBot"),
                    channel_id: Number(form.getValues("idChannel")),
                    welcome_message: data.textHello,
                    welcome_buttons: mappedButtons,
                    title: form.getValues("title") || "",
                },
                id: editId,
            });

            if (data.mediaHello) {
                formData.append("photo", data.mediaHello);
            } else if (EditData?.channel?.welcome_image_url) {
                formData.append("photo", EditData.channel.welcome_image_url);
            }

            await UpdateSpotPhoto({
                payload: formData,
                id: editId,
            });
        } else {
            try {
                await CreateSpot({
                    bot_token: form.getValues("tokenBot"),
                    channel_id: Number(form.getValues("idChannel")),
                });

                await AddSpotMessage({
                    auto_approve: data.autoReception,
                    welcome_message_flag: data.HelloSelect,
                    welcome_message: data.textHello,
                    welcome_buttons: mappedButtons,
                });

                if (data.mediaHello) {
                    formData.append("photo", data.mediaHello);
                    await AddSpotPhoto(formData);
                }

                navigate("/spots");
            } catch (error) {
                console.error("Ошибка создания спота:", error);
                // Можно добавить уведомление или setError
            }
        }
    };


    const onCheck = async () => {
        setIsLoading(true)

        try {
            const response = await mutateAsync({
                bot_token: form.getValues("tokenBot"),
                channel_id: Number(form.getValues("idChannel")),
            });

            if (response?.message === "bot is valid and is an admin in the channel") {


                setChecked(true);
                setIsLoading(false)
            }
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            setIsLoading(false)
            console.error("Ошибка проверки", error);

            // Если это ошибка от сервера
            if (error.response) {
                const status = error.response.status;
                const data = error.response.data;

                if (status === 400) {
                    // Ошибка валидации или бот не админ
                    const errorMessage = data?.error || "Ошибка валидации";
                    toast.error(errorMessage); // отобрази пользователю
                } else if (status === 500) {
                    const errorMessage = data?.error || "Ошибка сервера";
                    const errorDetails = data?.details || "";
                    toast.error(`${errorMessage}${errorDetails ? `: ${errorDetails}` : ""}`);
                } else {
                    toast.error("Неизвестная ошибка");
                }
            } else {
                toast.error("Сетевая ошибка или сервер недоступен");
            }
        }
    };


    return (
        <>
            <div className="px-3 py-4 bg-white rounded-lg">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmitForm)} className="space-y-3 flex flex-col items-start">
                        <div className="space-x-3 flex items-start w-full">
                            <div className="flex flex-col gap-3 w-full">
                                <FormInput
                                    name="idChannel"
                                    control={form.control} label="Введите ID канала"
                                    placeholder="-0000000000"
                                    defaultValue="-"
                                    type="number"
                                    tooltipText="Уникальный идентификатор канала в формате -1001509131086. Узнать его можно переслав сообщение из канала в бота https://t.me/getmyid_bot"
                                />
                                <FormInput
                                    name="tokenBot"
                                    control={form.control}
                                    label="Введите токен бота"
                                    placeholder="0000000:xxxxxxx"

                                    tooltipText="Токен бота который будет использоваться для трекинга и рассылок, токен выдается при создании бота в https://t.me/BotFather"
                                />
                            </div>
                            <div className="col-span-3 flex flex-col w-full gap-3">
                                <div className="col-span-3 flex flex-col w-full gap-3">
                                    <div className="bg-white border rounded-md p-4 space-y-3 text-sm text-neutral-700">
                                        <p className="text-base font-medium">Давайте проверим, что все работает</p>
                                        <div className="flex items-center gap-2">
                                            <Checkbox checked={checked} disabled id="check-bot-exists" />
                                            <Label htmlFor="check-bot-exists">Существует ли бот с указанным токеном?</Label>
                                        </div>

                                        <div className="flex items-center gap-2">
                                            <Checkbox checked={checked} disabled id="check-bot-added" />
                                            <Label htmlFor="check-bot-added">Добавлен ли бот в канал?</Label>
                                        </div>

                                        <div className="flex items-center gap-2">
                                            <Checkbox checked={checked} disabled id="check-bot-permissions" />
                                            <Label htmlFor="check-bot-permissions">У бота есть все нужные права?</Label>
                                        </div>
                                    </div>
                                    {!checked &&
                                        <Button onClick={onCheck} type="button" className="space-x-2 w-full">
                                            Проверить
                                            {isLoading && <div className="inline-block w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>}
                                        </Button>}



                                </div>
                            </div>
                        </div>
                        {checked &&
                            <>
                                <SecondStep
                                    form={form}
                                    previewUrl={EditData?.channel?.welcome_image_url || ""}
                                    isEdit={!!editId}
                                    title={EditData?.channel?.title ?? ""}
                                />
                                <div className="mt-5 w-full">
                                    <Button
                                        disabled={!form.formState.isValid}
                                        type="submit"
                                        className="space-x-2 w-full"
                                    >
                                        <Plus className="w-4 h-4" />
                                        Создать спот
                                    </Button>
                                </div>
                            </>}
                    </form>
                </Form>
            </div>
        </>
    )
}

export default FirstStep