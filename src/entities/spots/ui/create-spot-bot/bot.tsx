import FormInput from "@feature/formInput";
import { Copy, Link, Plus } from "lucide-react";
import { useForm } from "react-hook-form";
import { BotSpotBotType } from "@entities/spots/types";
import { Button } from "@shadcdn/button";
import { Form } from "@shadcdn/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { BotSpotBotSchema } from "./validation";

type BotSpotAppProps = {
    onNextStep: () => void;
};

const BotSpotTab = ({ onNextStep }: BotSpotAppProps) => {

    const form = useForm<BotSpotBotType>({
        mode: "onChange",
        resolver: zodResolver(BotSpotBotSchema),
        defaultValues: {
            shortName: '',
            linkToWebhook: '',
        }
    });

    const onSubmitForm = (data: BotSpotBotType) => {
        console.log(data);
        onNextStep()
    }



    return (
        <>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmitForm)}>
                    <div className="space-y-3 px-3 py-4 rounded-md mb-5">
                        <FormInput
                            name="shortName"
                            control={form.control}
                            leftIcon={<Link />}
                            label="Короткое имя"
                        />

                        <div className="grid grid-cols-[1fr_auto] gap-3 items-end">
                            <FormInput
                                name="linkToWebhook"
                                control={form.control}
                                label="Ссылка для WebHook"
                            />

                            <Button
                                type="button"
                                onClick={() => {
                                    const value = form.getValues("linkToWebhook");
                                    if (value) {
                                        navigator.clipboard.writeText(value)
                                    }
                                }}
                            >
                                <Copy className="w-4 h-4" />
                            </Button>

                        </div>
                    </div>

                    <div className="mt-5">
                        <Button
                            disabled={!form.formState.isValid}
                            type="submit"
                            className="space-x-2 w-full"
                        >
                            <Plus className="w-4 h-4" />
                            Создать спот
                        </Button>
                    </div>
                </form>
            </Form>

        </>
    );
};

export default BotSpotTab;
