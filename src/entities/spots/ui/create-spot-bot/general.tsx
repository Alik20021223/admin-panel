// GeneralTab.tsx
import { Control } from "react-hook-form";
import { BotSpotType } from "@entities/spots/types";
import FormInput from "@feature/formInput";

type Props = {
    control: Control<BotSpotType>;
};

const GeneralBotTab = ({ control }: Props) => {
    return (
        <>
            <FormInput name="generalText" control={control} label="Введите название" />
        </>
    );
};

export default GeneralBotTab;
