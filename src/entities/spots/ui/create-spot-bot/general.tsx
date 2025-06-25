// GeneralTab.tsx
import { useForm } from "react-hook-form";
import { AppSpotGeneralType } from "@entities/spots/types";
import FormInput from "@feature/formInput";
import { Form } from "@shared/shadcdn/form";
import { Plus } from "lucide-react";
import { Button } from "@shadcdn/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { defaultGeneralSchema } from "./validation";

type Props = {
    onNextStep: () => void;
};

const GeneralTab = ({ onNextStep }: Props) => {

    const form = useForm<AppSpotGeneralType>({
        mode: "onChange",
        resolver: zodResolver(defaultGeneralSchema),
        defaultValues: {
            generalText: '',
        }
    });

    const onSubmitForm = (data: AppSpotGeneralType) => {
        console.log(data);
        onNextStep()
    }

    return (
        <>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmitForm)}>
                    <FormInput name="generalText" control={form.control} label="Введите название" />

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

export default GeneralTab;
