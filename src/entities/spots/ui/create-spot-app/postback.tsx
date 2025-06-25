import AddPixel from "@feature/add-pixel";
import { useForm } from "react-hook-form";
import { Form } from "@/shared/shadcdn/form";
import { Plus } from "lucide-react";
import { Button } from "@shadcdn/button";
import { AppSpotPostBackType } from "@entities/spots/types";

type PostBackSpotAppProps = {
    onNextStep: () => void;
};


const PostBackTab = ({ onNextStep }: PostBackSpotAppProps) => {

    const form = useForm<AppSpotPostBackType>({
        defaultValues: {
            postBack: [],
        }
    });

    const onSubmitForm = (data: AppSpotPostBackType) => {
        console.log(data);
        onNextStep()
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