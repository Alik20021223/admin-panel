import { CellContext } from "@tanstack/react-table"
import { TableRow } from "@entities/landing/types"
import { Files, ChevronRight, Edit, Trash } from "lucide-react"
import { TooltipProvider } from "@shadcdn/tooltip"
import IconButtonWithTooltip from "@feature/iconButtonTooltip"
import ModalDelete from "@feature/modal-delete"
import { useState } from "react"
import { useDeleteLanding } from "@entities/landing/hooks/delete-landing-list"
import ModalGenLink from "@entities/landing/ui/modal-gen-link"

interface ButtonsActionsTableProps {
    props: CellContext<TableRow, unknown>
}

const ButtonsActionsTable: React.FC<ButtonsActionsTableProps> = ({ props }) => {
    const [openLink, setOpenLink] = useState(false)
    const [openDelete, setOpenDelete] = useState(false)
    const [deleteId, setDeleteId] = useState('')

    const { mutateAsync } = useDeleteLanding()

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
                    {/* <IconButtonWithTooltip
                        onClickButton={() => console.log("Копировать", props)}
                        icon={<CopyPlus className="text-black hover:text-white" />}
                        tooltip="Копировать"
                    /> */}
                    <IconButtonWithTooltip
                        onClickButton={() => setOpenLink(true)}
                        icon={<Files className="text-black hover:text-white" />}
                        tooltip="Копировать ссылку"
                    />
                    <IconButtonWithTooltip
                        onClickButton={() => console.log("Детали", props)}
                        icon={<ChevronRight className="text-black hover:text-white" />}
                        tooltip="Детали"
                    />
                    <IconButtonWithTooltip
                        onClickButton={() => console.log("Редактировать", props)}
                        icon={<Edit className="text-black hover:text-white" />}
                        tooltip="Редактировать"
                    />
                    <IconButtonWithTooltip
                        onClickButton={() => OpenDeleteModal(props.row.original.landing_id)}
                        icon={<Trash className="text-black hover:text-white" />}
                        tooltip="Удалить"
                    />
                </div>
            </TooltipProvider>

            <ModalGenLink open={openLink} setOpen={setOpenLink} />
            <ModalDelete open={openDelete} setOpen={setOpenDelete} id={deleteId} onDelete={onDeleteSpot} />
        </>
    )
}

export default ButtonsActionsTable
