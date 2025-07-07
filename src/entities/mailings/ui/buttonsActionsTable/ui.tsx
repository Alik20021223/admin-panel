import { CellContext } from "@tanstack/react-table"
import { TableRow } from "@entities/mailings/types"
import { CopyPlus, Edit, Trash } from "lucide-react"
import { TooltipProvider } from "@shadcdn/tooltip"
import IconButtonWithTooltip from "@feature/iconButtonTooltip"
import ModalDelete from "@feature/modal-delete"
import { useState } from "react"
import { useDeleteLanding } from "@entities/landing/hooks/delete-landing-list"
import { useNavigate } from "react-router-dom"

interface ButtonsActionsTableProps {
    props: CellContext<TableRow, unknown>
}

const ButtonsActionsTable: React.FC<ButtonsActionsTableProps> = ({ props }) => {

    const [openDelete, setOpenDelete] = useState(false)
    const [deleteId, setDeleteId] = useState("")

    const { mutateAsync } = useDeleteLanding()

    const navigate = useNavigate()

    const OpenDeleteModal = (id: string) => {
        setDeleteId(id)
        setOpenDelete(true)
    }

    const onDeleteSpot = (id: string) => {
        mutateAsync(id)
    }

    return (
        <>
            <TooltipProvider delayDuration={500}>
                <div className="flex gap-1 items-center">
                    <IconButtonWithTooltip
                        onClickButton={() => console.log("Копировать", props)}
                        icon={<CopyPlus className="text-black hover:text-white" />}
                        tooltip="Копировать"
                    />
                    <IconButtonWithTooltip
                        onClickButton={() => navigate(`add-bot?edit=${props.row.original.id}`)}
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
        </>
    )
}

export default ButtonsActionsTable
