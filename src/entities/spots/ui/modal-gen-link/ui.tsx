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
import { useSharedStore } from "@shared/store";

const spotsLink = `&fbclid=<?= $_GET["fbclid"] ?>&campaign_id=<?= $_GET["campaign_id"] ?>&adset_id=<?= $_GET["adset_id"] ?>&ad_id=<?= $_GET["ad_id"] ?>&campaign_name=<?= $_GET["campaign_name"] ?>&adset_name=<?= $_GET["adset_name"] ?>&ad_name=<?= $_GET["ad_name"] ?>&placement=<?= $_GET["placement"] ?>&site_source_name=<?= $_GET["site_source_name"] ?>&b=<?= $_GET["b"] ?>`

interface ModalGenLinkProps {
    open: boolean,
    setOpen: (value: boolean) => void;
    domain: string,
}

const ModalGenLink = ({ open, setOpen, domain }: ModalGenLinkProps) => {
    const form = useForm({
        defaultValues: {
            landingLink: '',
            resultUrl: '',
        }
    });

    const { user } = useSharedStore()
    const { pixels } = useSpotsTableStore()

    const landingLink = form.watch('landingLink');
    // const baseUrl = window.location.origin

    useEffect(() => {
        if (landingLink) {
            const finalUrl = `https://${domain}?idx=${user?.id}&pixel=${landingLink}${spotsLink}`;
            form.setValue("resultUrl", finalUrl);
        } else {
            form.setValue("resultUrl", "");
        }
    }, [landingLink, form]);

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
                                    label="Выберите пиксель"
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
