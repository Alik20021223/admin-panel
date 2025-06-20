import { Button } from "@shadcdn/button";
import FormInput from "@feature/formInput";
import { Form } from "@shadcdn/form";
import { useForm } from "react-hook-form";
import { StepOneSpotChannel } from "@entities/spots/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { StepOneSpotSchema } from "./validation";
import { Checkbox } from "@shadcdn/checkbox";
import { Label } from "@shadcdn/label";

const FirstStep = () => {
    const form = useForm<StepOneSpotChannel>({
        resolver: zodResolver(StepOneSpotSchema),
        defaultValues: {
            idChannel: '',
            tokenBot: '',
        },
    })

    const onSubmitForm = (data: StepOneSpotChannel) => {
        console.log(data);

    }


    return (
        <>
            <div className="px-2 py-3 bg-white rounded-lg">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmitForm)} className="space-x-3 flex items-start">
                        <div className="flex flex-col gap-3 w-full">
                            <FormInput name="idChannel" control={form.control} label="Введите ID канала" placeholder="-0000000000" tooltipText="Уникальный идентификатор канала в формате -1001509131086. Узнать его можно переслав сообщение из канала в бота https://t.me/getmyid_bot" />
                            <FormInput name="tokenBot" control={form.control} label="Введите токен бота" placeholder="0000000:xxxxxxx" tooltipText="Токен бота который будет использоваться для трекинга и рассылок, токен выдается при создании бота в https://t.me/BotFather" />
                        </div>
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
                            <Button type="submit" className="space-x-2 w-full">
                                Проверить
                            </Button>
                        </div>
                    </form>
                </Form>
            </div>
        </>
    )
}

export default FirstStep