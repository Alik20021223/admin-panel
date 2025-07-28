import { CellContext } from "@tanstack/react-table"
import { TableRow } from "@entities/domen/types"
import { Trash } from "lucide-react"
import { TooltipProvider } from "@shadcdn/tooltip"
import IconButtonWithTooltip from "@feature/iconButtonTooltip"
import ModalDelete from "@feature/modal-delete"
import { useState } from "react"
import { useDeleteDomain } from "@entities/domen/hooks/delete-domen-list"

interface ButtonsActionsTableProps {
    props: CellContext<TableRow, unknown>
}

const ButtonsActionsTable: React.FC<ButtonsActionsTableProps> = ({ props }) => {

    const [openDelete, setOpenDelete] = useState(false)
    const [deleteId, setDeleteId] = useState("")

    const { mutateAsync } = useDeleteDomain()


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
                        onClickButton={() => OpenDeleteModal(props.row.original.ID)}
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
