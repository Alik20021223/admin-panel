
import { Form } from "@shadcdn/form";
import { BotSpotType } from "@entities/spots/types";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@shadcdn/tabs";
import { useForm } from "react-hook-form";
import { Plus } from "lucide-react";
import { Button } from "@shadcdn/button";
import PostBackTab from "@entities/spots/ui/create-spot-bot/postback";
import BotSpotTab from "@entities/spots/ui/create-spot-bot/bot";
import GeneralBotTab from "@entities/spots/ui/create-spot-bot/general";

const SpotsBotContent = () => {
    const form = useForm<BotSpotType>({
        defaultValues: {
            generalText: '',
            shortName: '',
            linkToWebhook: '',
            postBack: [],
        }
    });


    const onSubmitForm = (data: BotSpotType) => {
        console.log(data);
    }

    return (
        <>
            <div className="px-2 py-3 bg-white rounded-lg">
                <Tabs defaultValue="general" className="w-full">
                    <TabsList className="w-full">
                        <TabsTrigger value="general">Общее</TabsTrigger>
                        <TabsTrigger value="bot">Бот</TabsTrigger>
                        <TabsTrigger value="postback">Постбэки</TabsTrigger>
                    </TabsList>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmitForm)}>
                            <TabsContent className="mt-5" value="general">
                                <GeneralBotTab control={form.control} />
                            </TabsContent>
                            <TabsContent className="mt-5" value="bot">
                                <BotSpotTab form={form} />
                            </TabsContent>
                            <TabsContent className="mt-5" value="postback">
                                <PostBackTab name="postBack" />
                            </TabsContent>

                            <div className="mt-5">
                                <Button type="submit" className="space-x-2 w-full"><Plus className="w-4 h-4" />Создать спот</Button>
                            </div>
                        </form>
                    </Form>

                </Tabs>
            </div>
        </>
    )
}

export default SpotsBotContent