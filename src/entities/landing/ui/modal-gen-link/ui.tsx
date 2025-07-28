import { Form } from "@shadcdn/form";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@shadcdn/dialog"
import { useForm } from "react-hook-form";
import { FormSelect } from "@feature/formSelect";
import FormInput from "@feature/formInput";
import { Button } from "@shadcdn/button";
import { Copy } from "lucide-react";
import { useLandingStore } from "@entities/landing/store";
import React, { useCallback, useEffect, useMemo } from "react";

interface ModalGenLinkProps {
    open: boolean,
    setOpen: (value: boolean) => void;
    id: string
}

const ModalGenLink = ({ open, setOpen, id }: ModalGenLinkProps) => {
    const { pixels } = useLandingStore();

    const form = useForm({
        defaultValues: {
            pixel: '',
            resultUrl: '',
        }
    });

    const pixelID = form.watch('pixel');
    const baseUrl = window.location.origin;

    // Логгируем pixels только при их изменении
    useEffect(() => {
        if (pixels) {
            console.log("Pixels updated:", pixels);
        }
    }, [pixels]);

    useEffect(() => {
        if (!open) return;

        const newUrl = pixelID ? `${baseUrl}/l/${id}?pixel=${pixelID}` : "";
        const currentUrl = form.getValues("resultUrl");

        if (currentUrl !== newUrl) {
            form.setValue("resultUrl", newUrl, {
                shouldDirty: false,
                shouldTouch: false,
                shouldValidate: false,
            });
        }
    }, [open, pixelID, id, form, baseUrl]);

    const pixelOptions = useMemo(() => {
        return pixels?.map(pixel => ({
            label: pixel.name,
            value: String(pixel.pixel_id),
        })) ?? [];
    }, [pixels]);

    const handleCopy = useCallback(() => {
        const value = form.getValues("resultUrl");
        if (value) {
            navigator.clipboard.writeText(value);
        }
    }, [form]);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Ссылки</DialogTitle>
                    <div className="px-3 py-4">
                        <Form {...form}>
                            <form className="space-y-3">
                                <FormSelect
                                    name="pixel"
                                    control={form.control}
                                    label="Pixel"
                                    options={pixelOptions}
                                />

                                <div className="grid grid-cols-[1fr_auto] gap-3 items-end">
                                    <FormInput
                                        name="resultUrl"
                                        control={form.control}
                                        label="Итоговая ссылка"
                                        disabled={true}
                                    />

                                    <Button
                                        type="button"
                                        onClick={handleCopy}
                                    >
                                        <Copy className="w-4 h-4" />
                                    </Button>
                                </div>
                            </form>
                        </Form>
                    </div>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
};

export default React.memo(ModalGenLink);