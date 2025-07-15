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
import { useEffect } from 'react';
import { useLandingStore } from '@entities/landing/store';
import { useUpdateDesignLanding } from '@entities/landing/hooks/put-landing-design';

interface ExpertDesignTabProps {
    onNextStep: () => void;
    id: string
}


const ExpertDesignTab = ({ onNextStep, id }: ExpertDesignTabProps) => {

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
    const { mutateAsync: EditDesign } = useUpdateDesignLanding()

    const { editLanding, editData } = useLandingStore()

    const onSubmitForm = (data: ExpertDesignFormType) => {

        const formData = new FormData()

        if (data.avatar) {
            formData.append("avatar_image", data.avatar)
        } else if (editData?.landing.avatar_image) {
            formData.append("avatar_image", editData?.landing.avatar_image)
        }

        if (data.logo) {
            formData.append("logo_image", data.logo)
        } else if (editData?.landing.logo_image) {
            formData.append("logo_image", editData?.landing.logo_image)
        }

        if (data.patternBg) {
            formData.append("background_image", data.patternBg)
        } else if (editData?.landing.background_image) {
            formData.append("background_image", editData?.landing.background_image)
        }


        if (data.patternBg) {
            formData.append("background_image", data.patternBg)
        }

        formData.append("accent_color", data.accentColor)
        formData.append("background_color", data.bgColor)
        formData.append("banner_background_color", data.colorBgBanner)

        if (editLanding && editData) {
            EditDesign({ payload: formData, id: id || '' })
        } else {
            mutateAsync(formData)
        }


        onNextStep()
    }

    useEffect(() => {
        if (editLanding && editData) {
            form.reset({
                colorBgBanner: editData.landing.banner_background_color || "",
                bgColor: editData.landing.background_color || "",
                accentColor: editData.landing.accent_color || "",
            });
        }
    }, [editLanding, editData]);

    return (
        <>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmitForm)} className="space-y-3">
                    <div className="grid grid-cols-2 gap-3 items-center">
                        <Controller
                            name="logo"
                            control={form.control}
                            render={({ field }) => (
                                <DropFieldInner
                                    field={field}
                                    label="Логотип"
                                    previewUrl={editData?.landing.logo_image}
                                />
                            )}
                        />
                        <Controller
                            name="avatar"
                            control={form.control}
                            render={({ field }) => (
                                <DropFieldInner
                                    field={field}
                                    label="Аватар"
                                    previewUrl={editData?.landing.avatar_image}
                                />
                            )}
                        />
                        <Controller
                            name="patternBg"
                            control={form.control}
                            render={({ field }) => (
                                <DropFieldInner
                                    field={field}
                                    label="Паттерн фона"
                                    previewUrl={editData?.landing.background_image}
                                />
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