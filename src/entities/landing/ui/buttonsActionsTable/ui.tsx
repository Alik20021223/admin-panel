import { CellContext } from "@tanstack/react-table"
import { TableRow } from "@entities/landing/types"
import { Files, Edit, Trash } from "lucide-react"
import { TooltipProvider } from "@shadcdn/tooltip"
import IconButtonWithTooltip from "@feature/iconButtonTooltip"
import ModalDelete from "@feature/modal-delete"
import { useState } from "react"
import { useDeleteLanding } from "@entities/landing/hooks/delete-landing-list"
import ModalGenLink from "@entities/landing/ui/modal-gen-link"
import { useLandingStore } from "@entities/landing/store"
import { useNavigate } from "react-router-dom"

interface ButtonsActionsTableProps {
    props: CellContext<TableRow, unknown>
}

const ButtonsActionsTable: React.FC<ButtonsActionsTableProps> = ({ props }) => {
    const [openLink, setOpenLink] = useState(false)
    const [openDelete, setOpenDelete] = useState(false)
    const [deleteId, setDeleteId] = useState('')
    const [landingId, setLandingId] = useState('')

    const { mutateAsync } = useDeleteLanding()

    const navigate = useNavigate()

    const { setEditLanding } = useLandingStore()

    const OpenDeleteModal = (id: string) => {
        setDeleteId(id)
        setOpenDelete(true)
    }

    const onDeleteLanding = (id: string) => {
        mutateAsync(id)
    }

    const onEditLanding = (id: string) => {
        navigate(`add?edit=${id}`)
        setEditLanding(true)
    }

    const OpenLinkModal = (id: string) => {
        setLandingId(id)
        setOpenLink(true)
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
                        onClickButton={() => OpenLinkModal(props.row.original.landing_id)}
                        icon={<Files className="text-black hover:text-white" />}
                        tooltip="Копировать ссылку"
                    />
                    <IconButtonWithTooltip
                        onClickButton={() => onEditLanding(props.row.original.landing_id)}
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

            {openLink && (
                <ModalGenLink
                    key={landingId} // заставит React сбросить состояние при смене landingId
                    open={openLink}
                    setOpen={setOpenLink}
                    id={landingId}
                />
            )}

            <ModalDelete open={openDelete} setOpen={setOpenDelete} id={deleteId} onDelete={onDeleteLanding} />
        </>
    )
}

export default ButtonsActionsTable
