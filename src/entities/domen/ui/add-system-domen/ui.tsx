import { useForm } from "react-hook-form"
import { Plus } from "lucide-react"
import { Button } from "@shadcdn/button"
import { Form } from "@shadcdn/form"
import FormInput from "@feature/formInput"
import { zodResolver } from "@hookform/resolvers/zod"
import { EditFormSchema, EditFormType } from "./validation"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@shadcdn/dialog"
import { TableRow } from "@entities/domen/types"
import { useCreateSystemDomain } from "@entities/domen/hooks/create-system-domen"
import { useEditSystemDomain } from "@entities/domen/hooks/edit-system-domen"
import { useEffect } from "react"

interface AddSystemDomenModalProps {
    open: boolean,
    setOpen: (value: boolean) => void;
    item?: TableRow | null
}

const AddSystemDomenModal: React.FC<AddSystemDomenModalProps> = ({ open, setOpen, item = null }) => {

    const { mutateAsync: CreateAsync } = useCreateSystemDomain()
    const { mutateAsync: EditAsync } = useEditSystemDomain()
    
    const form = useForm<EditFormType>({
        resolver: zodResolver(EditFormSchema),
        defaultValues: {
            url: "",
        },
    });

    useEffect(() => {
        if (item !== null) {
            form.reset({
                url: item.url
            })
        }
    }, [])

    const onSubmitForm = async (data: EditFormType) => {
        if (item) {
            EditAsync({ payload: data, id: item.ID })
        } else {
            CreateAsync(data)
        }

    };

    return (
        <>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Добавить системный домен</DialogTitle>
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

export default AddSystemDomenModal