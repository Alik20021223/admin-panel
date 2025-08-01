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
import { TableRow } from "@entities/landing/types";
import { useSharedStore } from "@shared/store";

const landingUrlStatic = `campaign_id={{campaign.id}}&adset_id={{adset.id}}&ad_id={{ad.id}}&campaign_name={{campaign.name}}&adset_name={{adset.name}}&ad_name={{ad.name}}&placement={{placement}}&site_source_name={{site_source_name}}`

interface ModalGenLinkProps {
    open: boolean,
    setOpen: (value: boolean) => void;
    item: TableRow
}

const ModalGenLink = ({ open, setOpen, item }: ModalGenLinkProps) => {
    const { pixels } = useLandingStore();
    const { user } = useSharedStore()

    const form = useForm({
        defaultValues: {
            pixel: '',
            resultUrl: '',
        }
    });

    const pixelID = form.watch('pixel');

    // Логгируем pixels только при их изменении
    useEffect(() => {
        if (pixels) {
            console.log("Pixels updated:", pixels);
        }
    }, [pixels]);

    useEffect(() => {
        if (!open) return;
        const newUrl = pixelID ? `${item.domain}/l/${item.landing_id}/?idx=${user?.id}&pixel=${pixelID}&${landingUrlStatic}` : "";
        const currentUrl = form.getValues("resultUrl");

        if (currentUrl !== newUrl) {
            form.setValue("resultUrl", newUrl, {
                shouldDirty: false,
                shouldTouch: false,
                shouldValidate: false,
            });
        }
    }, [open, pixelID, item, form]);

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
                                    label="Выберите пиксель"
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