import FormInput from "@feature/formInput";
import { Copy, Link } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import { BotSpotType } from "@entities/spots/types";
import { Button } from "@shadcdn/button";

type BotSpotAppProps = {
    form: UseFormReturn<BotSpotType>;
};

const BotSpotTab = ({ form }: BotSpotAppProps) => {


    return (
        <>
            <div className="space-y-3 px-3 py-4 rounded-md mb-5">
                <FormInput
                    name="shortName"
                    control={form.control}
                    leftIcon={<Link />}
                    label="Короткое имя"
                />

                <div className="grid grid-cols-[1fr_auto] gap-3 items-end">
                    <FormInput
                        name="linkToWebhook"
                        control={form.control}
                        label="Ссылка для WebHook"
                    />

                    <Button
                        type="button"
                        onClick={() => {
                            const value = form.getValues("linkToWebhook");
                            if (value) {
                                navigator.clipboard.writeText(value)
                            }
                        }}
                    >
                        <Copy className="w-4 h-4" />
                    </Button>

                </div>
            </div>
        </>
    );
};

export default BotSpotTab;
