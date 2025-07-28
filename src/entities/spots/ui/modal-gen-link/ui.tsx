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
import { useEffect, useMemo } from "react";
import { useSpotsTableStore } from "@entities/spots/store";

interface ModalGenLinkProps {
    open: boolean,
    setOpen: (value: boolean) => void;
}

const ModalGenLink = ({ open, setOpen }: ModalGenLinkProps) => {
    const form = useForm({
        defaultValues: {
            landingLink: '',
            resultUrl: '',
        }
    });

    const { pixels } = useSpotsTableStore()

    const landingLink = form.watch('landingLink');
    const baseUrl = window.location.origin

    useEffect(() => {
        if (landingLink) {
            const finalUrl = `${baseUrl}?pixel=${landingLink}`;
            form.setValue("resultUrl", finalUrl);
        } else {
            form.setValue("resultUrl", "");
        }
    }, [landingLink, form]);

    console.log('test');
    


    // Генерируем options из item.pixels
    const pixelOptions = useMemo(() => {
        return pixels.map(pixel => ({
            label: pixel.name,
            value: String(pixel.pixel_id),
        })) ?? [];
    }, [pixels]);


    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Ссылки</DialogTitle>
                    <div className="px-3 py-4">
                        <Form {...form}>
                            <form className="space-y-3">
                                <FormSelect
                                    name="landingLink"
                                    control={form.control}
                                    label="Мне нужна"
                                    options={pixelOptions} // 👈 используем пиксели как options
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
                                        onClick={() => {
                                            const value = form.getValues("resultUrl");
                                            if (value) {
                                                navigator.clipboard.writeText(value);
                                            }
                                        }}
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

export default ModalGenLink;
