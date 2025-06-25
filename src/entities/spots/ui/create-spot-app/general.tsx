// GeneralTab.tsx
import { useForm } from "react-hook-form";
import { AppSpotGeneralType } from "@entities/spots/types";
import FormInput from "@feature/formInput";
import { Form } from "@shared/shadcdn/form";
import { Plus } from "lucide-react";
import { Button } from "@shadcdn/button";

type Props = {
    onNextStep: () => void;
};

const GeneralTab = ({ onNextStep }: Props) => {

    const form = useForm<AppSpotGeneralType>({
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
                        <Button type="submit" className="space-x-2 w-full"><Plus className="w-4 h-4" />Создать спот</Button>
                    </div>
                </form>
            </Form>

        </>
    );
};

export default GeneralTab;
