import { Button } from "@shadcdn/button";
import FormInput from "@feature/formInput";
import { Form } from "@shadcdn/form";
import { useForm } from "react-hook-form";
import { StepOneSpotChannel } from "@entities/spots/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { StepOneSpotSchema } from "./validation";
import { Checkbox } from "@shadcdn/checkbox";
import { Label } from "@shadcdn/label";
import { useState } from "react";
import SecondStep from "./second-step";
import { Plus } from "lucide-react";
import { useCheckChannel } from "@entities/spots/hooks/check-channel";
import { useSpotAddMessage } from "@entities/spots/hooks/spots-add-channel-message";
import { useSpotAddPhoto } from "../../hooks/spots-add-channel-photo";

const FirstStep = () => {

    const [checked, setChecked] = useState<boolean>(false)

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
            postBack: [],
        },
        mode: "all",
    })

    const { mutateAsync: AddSpotMessage } = useSpotAddMessage()
    const { mutateAsync: AddSpotPhoto } = useSpotAddPhoto()


    const onSubmitForm = (data: StepOneSpotChannel) => {
        // console.log(data);

        const mappedButtons = data.buttonsTypeHello.map((btn) => ({
            text: btn.name,
            url: btn.url,
        }));

        

        AddSpotMessage({
            auto_approve: data.autoReception,
            welcome_message_flag: data.HelloSelect,
            welcome_message: data.textHello,
            welcome_buttons: mappedButtons,
        });

        const formData = new FormData()

        if (data.mediaHello) {
            formData.append("photo", data.mediaHello)
        }

        AddSpotPhoto(formData)
    };


    const { mutateAsync } = useCheckChannel()

    const onCheck = async () => {
        try {
            const response = await mutateAsync({
                bot_token: form.getValues("tokenBot"),
                channel_id: Number(form.getValues("idChannel")),
            });



            // если ответ содержит status === 200
            if (response?.message === "bot is valid and is an admin in the channel") {
                setChecked(true);
            }
        } catch (error) {
            console.error("Ошибка проверки", error);
        }
    };

    console.log(form.formState.errors);
    console.log(form.watch());
    

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
                                            <Checkbox disabled id="check-bot-exists" />
                                            <Label htmlFor="check-bot-exists">Существует ли бот с указанным токеном?</Label>
                                        </div>

                                        <div className="flex items-center gap-2">
                                            <Checkbox disabled id="check-bot-added" />
                                            <Label htmlFor="check-bot-added">Добавлен ли бот в канал?</Label>
                                        </div>

                                        <div className="flex items-center gap-2">
                                            <Checkbox disabled id="check-bot-permissions" />
                                            <Label htmlFor="check-bot-permissions">У бота есть все нужные права?</Label>
                                        </div>
                                    </div>
                                    <Button onClick={onCheck} type="button" className="space-x-2 w-full">
                                        Проверить
                                    </Button>
                                </div>
                            </div>
                        </div>
                        {checked &&
                            <>
                                <SecondStep form={form} />
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