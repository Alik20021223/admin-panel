import { useForm } from "react-hook-form"
import { Plus } from "lucide-react"
import { Button } from "@shadcdn/button"
import { Form } from "@shadcdn/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { UpdateFormType, UserFormSchema } from "./validation"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@shadcdn/dialog"
import { useUsersTableStore } from "@entities/users/store"
import { UpdateUserRole } from "@entities/users/hooks/update-user-role"
import { FormSelect } from "@feature/formSelect"
import { roleOptions } from "@shared/mock"
import { useEffect } from "react"
// import { z } from "zod"


interface AddPixelProps {
    open: boolean,
    setOpen: (value: boolean) => void;
    editId?: string;
}


const ChangeRoleModal: React.FC<AddPixelProps> = ({ open, setOpen, editId = "" }) => {
    const { user } = useUsersTableStore()

    const { mutateAsync: updateRole } = UpdateUserRole()

    const form = useForm<UpdateFormType>({
        resolver: zodResolver(UserFormSchema),
        defaultValues: {
            role: ''
        }
    });

    useEffect(() => {
        if (user?.role) {
            form.setValue('role', user.role)
        }
    }, [user, form])



    const onSubmitForm = async (data: UpdateFormType) => {

        if (user) {
            updateRole({ payload: { role: data.role }, id: String(user?.ID) })
        }

        setOpen(false)
    }


    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{editId ? "Редактировать пиксель" : "Добавить пиксель"}</DialogTitle>
                    <div className="px-3 py-4">
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmitForm)} className="space-y-3">
                                <FormSelect
                                    name="role"
                                    control={form.control}
                                    label="Роли"
                                    options={roleOptions}
                                />

                                <div className="col-span-3">
                                    <Button
                                        type="submit"
                                        className="space-x-2 w-full"
                                    >
                                        <Plus className="w-4 h-4" />
                                        {editId ? "Сохранить изменения" : "Добавить пиксель"}
                                    </Button>
                                </div>
                            </form>
                        </Form>
                    </div>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}

export default ChangeRoleModal
