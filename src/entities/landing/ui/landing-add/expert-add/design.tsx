import { Form } from '@shadcdn/form';
import { ExpertDesignFormType } from '@entities/landing/types';
import { Button } from '@shadcdn/button';
import { Controller, useForm } from 'react-hook-form';
import { Plus } from 'lucide-react';
import FormColorPicker from '@feature/formColorPicker';
import DropFieldInner from '@feature/dropField';
import { zodResolver } from '@hookform/resolvers/zod';
import { expertDesignSchema } from '../validation';
import { useCreateProDesign } from '@entities/landing/hooks/create-landing-design';

interface ExpertDesignTabProps {
    onNextStep: () => void;
}


const ExpertDesignTab = ({ onNextStep }: ExpertDesignTabProps) => {

    const form = useForm<ExpertDesignFormType>({
        resolver: zodResolver(expertDesignSchema),
        mode: "onChange",
        defaultValues: {
            colorBgBanner: "",
            bgColor: "",
            accentColor: '',
            logo: null,
            patternBg: null,
            avatar: null
        },
    })

    const { mutateAsync } = useCreateProDesign()

    const onSubmitForm = (data: ExpertDesignFormType) => {

        const formData = new FormData()

        if (data.avatar) {
            formData.append("avatar_image", data.avatar)
        }
        
        if (data.logo) {
            formData.append("logo_image", data.logo)
        }

        if (data.patternBg) {
            formData.append("background_image", data.patternBg)
        }

        formData.append("accent_color", data.accentColor)
        formData.append("background_color", data.bgColor)
        formData.append("banner_background_color", data.colorBgBanner)

        mutateAsync(formData)
        onNextStep()
    }

    return (
        <>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmitForm)} className="space-y-3">
                    <div className="grid grid-cols-2 gap-3 items-center">
                        <Controller
                            name="logo"
                            control={form.control}
                            render={({ field }) => (
                                <DropFieldInner field={field} label="Логотип" />
                            )}
                        />
                        <Controller
                            name="avatar"
                            control={form.control}
                            render={({ field }) => (
                                <DropFieldInner field={field} label="Аватар" />
                            )}
                        />
                        <Controller
                            name="patternBg"
                            control={form.control}
                            render={({ field }) => (
                                <DropFieldInner field={field} label="Паттерн фона" />
                            )}
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-3 items-center w-full">
                        <FormColorPicker name="colorBgBanner" control={form.control} label="Цвет фона баннера" />
                        <FormColorPicker name="accentColor" control={form.control} label="Акцентный цвет" />
                        <FormColorPicker name="bgColor" control={form.control} label="Цвет фона" />
                    </div>

                    <div className="col-span-3">
                        <Button
                            disabled={!form.formState.isValid}
                            type="submit"
                            className="space-x-2 w-full"
                        >
                            <Plus className="w-4 h-4" />
                            Создать лендинг
                        </Button>
                    </div>
                </form>
            </Form>
        </>
    )
}

export default ExpertDesignTab