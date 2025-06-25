import { Form } from "@shadcdn/form";
import { AppSpotType } from "@entities/spots/types";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@shadcdn/tabs";
import { useForm } from "react-hook-form";
import { Plus } from "lucide-react";
import { Button } from "@shadcdn/button";
import BotSpotAppTab from "@entities/spots/ui/create-spot-app/bot";
import GeneralTab from "@entities/spots/ui/create-spot-app/general";
import PostBackTab from "@entities/spots/ui/create-spot-app/postback";

const SpotsAppContent = () => {

    

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
                            <TabsContent className="mt-5" value="bot">
                                <BotSpotAppTab form={form} />
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

export default SpotsAppContent