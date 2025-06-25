import AddPixel from "@feature/add-pixel";
import { useForm } from "react-hook-form";
import { Form } from "@shadcdn/form";
import { Plus } from "lucide-react";
import { Button } from "@shadcdn/button";
import { AppSpotPostBackType } from "@entities/spots/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { appSpotPostBackSchema } from "./validation";


const PostBackTab = () => {

    const form = useForm<AppSpotPostBackType>({
        mode: "onChange",
        resolver: zodResolver(appSpotPostBackSchema),
        defaultValues: {
            postBack: [],
        }
    });

    const onSubmitForm = (data: AppSpotPostBackType) => {
        console.log(data);
    }

    return (
        <>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmitForm)}>
                    <AddPixel name="postBack" />

                    <div className="mt-5">
                        <Button type="submit" className="space-x-2 w-full"><Plus className="w-4 h-4" />Создать спот</Button>
                    </div>
                </form>
            </Form>

        </>
    )
}

export default PostBackTab