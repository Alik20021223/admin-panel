import { useForm } from "react-hook-form"
import { Plus } from "lucide-react"
import { Button } from "@shadcdn/button"
import { Form } from "@shadcdn/form"
import FormInput from "@feature/formInput"
import { zodResolver } from "@hookform/resolvers/zod"
import { EditFormSchema, EditFormType } from "./validation"
import { useCreateDomain } from "@entities/domen/hooks/create-domen"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@shadcdn/dialog"
// import { z } from "zod"

interface AddDomenModalProps {
    open: boolean,
    setOpen: (value: boolean) => void;
}


const AddDomenModal: React.FC<AddDomenModalProps> = ({ open, setOpen }) => {

    const { mutateAsync } = useCreateDomain()

    const form = useForm<EditFormType>({
        resolver: zodResolver(EditFormSchema),
        defaultValues: {
            url: "",
        },
    });

    const onSubmitForm = async (data: EditFormType) => {

        mutateAsync(data)

        // console.log(data);
    };


    return (
        <>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Добавить домен</DialogTitle>
                        <div className="px-3 py-4">
                            <Form {...form}>
                                <form onSubmit={form.handleSubmit(onSubmitForm)} className="space-y-3">
                                    <div className="grid grid-cols-2 gap-3 items-center">
                                        <FormInput name="url" control={form.control} label="Введите url" />
                                    </div>

                                    <div className="col-span-3">
                                        <Button
                                            type="submit"
                                            disabled={!form.formState.isValid}
                                            className="space-x-2 w-full"
                                        >
                                            <Plus className="w-4 h-4" />
                                            Добавить домен
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

export default AddDomenModal