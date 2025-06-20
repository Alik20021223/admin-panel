
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@shadcdn/dialog"

import { Button } from "@shadcdn/button";


interface ModalDeleteProps {
    open: boolean,
    setOpen: (value: boolean) => void;
    id: string,
    onDelete: (id: string) => void
}

const ModalDelete = ({ open, setOpen, id, onDelete }: ModalDeleteProps) => {

    const handleDelete = () => {
        onDelete(id)
        setOpen(false)
    }

    return (
        <>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="max-w-[300px]!">
                    <DialogHeader>
                        <DialogTitle>Вы уверены</DialogTitle>
                        <div className=" space-y-3">
                            <p>ID: {id}</p>
                            <div className="flex justify-between items-center">
                                <Button onClick={() => setOpen(false)}>Отмена</Button>
                                <Button variant="destructive" onClick={handleDelete}>Удалить</Button>
                            </div>
                        </div>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </>
    )
}

export default ModalDelete