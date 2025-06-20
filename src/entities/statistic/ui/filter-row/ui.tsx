import { Button } from "@shadcdn/button"
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@shadcdn/card"
import { XIcon } from "lucide-react"
import { FC } from "react";
import FormFilter from "./form";
import { FormType } from "../../types";

interface FilterRowProps {
    onClose: () => void
    onSubmit: (data: FormType) => void
}

const FilterRow: FC<FilterRowProps> = ({ onClose, onSubmit }) => {

    return (
        <>
            <Card className="relative">
                <CardHeader >
                    <CardTitle className="text-xl">Фильтр</CardTitle>
                    <Button
                        onClick={onClose}
                        size="icon"
                        variant="ghost"
                        className="absolute top-2 right-2 opacity-70 hover:opacity-100"
                    >
                        <XIcon className="w-4 h-4" />
                        <span className="sr-only">Закрыть</span>
                    </Button>
                </CardHeader>
                <CardContent>
                    <FormFilter onSubmitForm={onSubmit} />
                </CardContent>
            </Card>
        </>
    )
}

export default FilterRow