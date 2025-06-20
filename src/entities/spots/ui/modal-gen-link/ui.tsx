import { Form } from "@shadcdn/form";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@shadcdn/dialog"
import { useForm } from "react-hook-form";
import { FormSelect } from "@feature/formSelect";
import { LinkSpotsOptions } from "@entities/spots/mock";
import FormInput from "@feature/formInput";
import { Button } from "@shadcdn/button";
import { Copy } from "lucide-react";

interface ModalGenLinkProps {
    open: boolean,
    setOpen: (value: boolean) => void;
}

const ModalGenLink = ({ open, setOpen }: ModalGenLinkProps) => {

    const form = useForm({
        defaultValues: {
            landingLink: '',
            baseUrl: '',
            resultUrl: '',
        }
    });

    const landingLink = form.watch('landingLink')

    return (
        <>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Ссылки</DialogTitle>
                        <div className="px-3 py-4">
                            <Form {...form}>
                                <form className="space-y-3">
                                    <FormSelect
                                        name={"landingLink"}
                                        control={form.control}
                                        label="Мне нужна"
                                        options={LinkSpotsOptions}
                                    />

                                    {landingLink === 'true' && <FormInput
                                        name="baseUrl"
                                        control={form.control}
                                        label="Базовая ссылка"
                                    />}

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
                                                    navigator.clipboard.writeText(value)
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
        </>
    )
}

export default ModalGenLink