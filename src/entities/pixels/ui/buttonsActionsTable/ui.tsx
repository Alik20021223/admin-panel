import { CellContext } from "@tanstack/react-table"
import { TableRow } from "@entities/pixels/types"
import { Edit, Trash } from "lucide-react"
import { TooltipProvider } from "@shadcdn/tooltip"
import IconButtonWithTooltip from "@feature/iconButtonTooltip"
import ModalDelete from "@feature/modal-delete"
import { useState } from "react"
import { useUpdatePixel } from "@entities/pixels/hooks/update-pixels-list"
import { usePixelsTableStore } from "@entities/pixels/store"
import AddPixelModal from "@entities/pixels/ui/form-pixel"

interface ButtonsActionsTableProps {
    props: CellContext<TableRow, unknown>
}

const ButtonsActionsTable: React.FC<ButtonsActionsTableProps> = ({ props }) => {
    const { pixels } = usePixelsTableStore()
    const [openDelete, setOpenDelete] = useState(false)
    const [openEdit, setOpenEdit] = useState(false)
    const [deleteId, setDeleteId] = useState("")
    const [editId, setEditId] = useState("")

    const { mutateAsync } = useUpdatePixel()


    const OpenDeleteModal = (id: number) => {
        setDeleteId(String(id))
        setOpenDelete(true)
    }

    const OpenEditModal = (id: number) => {
        setEditId(String(id))
        setOpenEdit(true)
    }

    const onDeleteSpot = (id: string) => {
        const filterPixels = pixels
            .filter((item) => item.id !== Number(id))
            .map((item) => ({
                name: item.name,
                pixel_id: Number(item.pixel_id),
                access_token: item.access_token,
            }));

        mutateAsync({ pixels: filterPixels });
    };




    return (
        <>
            <TooltipProvider delayDuration={500}>
                <div className="flex gap-1 items-center">
                    <IconButtonWithTooltip
                        onClickButton={() => OpenEditModal(props.row.original.id)}
                        icon={<Edit className="text-black hover:text-white" />}
                        tooltip="Редактировать"
                    />
                    <IconButtonWithTooltip
                        onClickButton={() => OpenDeleteModal(props.row.original.id)}
                        icon={<Trash className="text-black hover:text-white" />}
                        tooltip="Удалить"
                    />
                </div>
            </TooltipProvider>

            <ModalDelete open={openDelete} setOpen={setOpenDelete} id={deleteId} onDelete={onDeleteSpot} />
            <AddPixelModal open={openEdit} setOpen={setOpenEdit} editId={editId} />
        </>
    )
}

export default ButtonsActionsTable
