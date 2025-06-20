// GeneralTab.tsx
import { Control } from "react-hook-form";
import { AppSpotType } from "@entities/spots/types";
import FormInput from "@feature/formInput";

type Props = {
    control: Control<AppSpotType>;
};

const GeneralTab = ({ control }: Props) => {
    return (
        <>
            <FormInput name="generalText" control={control} label="Введите название" />
        </>
    );
};

export default GeneralTab;
