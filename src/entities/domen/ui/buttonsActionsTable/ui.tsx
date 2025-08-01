import { CellContext } from "@tanstack/react-table"
import { TableRow } from "@entities/domen/types"
import { Edit, Trash } from "lucide-react"
import { TooltipProvider } from "@shadcdn/tooltip"
import IconButtonWithTooltip from "@feature/iconButtonTooltip"
import ModalDelete from "@feature/modal-delete"
import { useState } from "react"
import { useDeleteDomain } from "@entities/domen/hooks/delete-domen-list"
import AddSystemDomenModal from "@entities/domen/ui/add-system-domen"
import { Check } from 'lucide-react';
import { useCheckDomain } from "@entities/domen/hooks/check-domain"

interface ButtonsActionsTableProps {
    props: CellContext<TableRow, unknown>
}

const ButtonsActionsTable: React.FC<ButtonsActionsTableProps> = ({ props }) => {

    const item = props.row.original

    const [openDelete, setOpenDelete] = useState(false)
    const [openEdit, setEdit] = useState(false)
    const [editSystem, setEditSystem] = useState<TableRow | null>(null)
    const [deleteId, setDeleteId] = useState("")

    const { mutateAsync } = useDeleteDomain()
    const { mutateAsync: checkDomain } = useCheckDomain()

    const OpenEdit = (item: TableRow) => {
        setEditSystem(item)
        setEdit(true)
    }

    const OpenDeleteModal = (id: string) => {
        setDeleteId(id)
        setOpenDelete(true)
    }

    const onDeleteSpot = (id: string) => {
        mutateAsync(id)
    }

    const onCheckDomain = (id: string) => {
        checkDomain(id)
    }

    return (
        <>
            <TooltipProvider delayDuration={500}>
                <div className="flex gap-1 items-center">
                    {item.sys_domain && <IconButtonWithTooltip
                        onClickButton={() => OpenEdit(item)}
                        icon={<Edit className="text-black hover:text-white" />}
                        tooltip="Редактировать"
                    />}

                    {!item.sys_domain &&
                        <IconButtonWithTooltip
                            onClickButton={() => OpenDeleteModal(item.ID)}
                            icon={<Trash className="text-black hover:text-white" />}
                            tooltip="Удалить"
                        />
                    }

                    <IconButtonWithTooltip
                        onClickButton={() => onCheckDomain(item.ID)}
                        icon={<Check className="text-black hover:text-white" />}
                        tooltip="Пройти верификацию"
                    />
                </div>
            </TooltipProvider>

            <ModalDelete
                open={openDelete}
                setOpen={setOpenDelete}
                id={deleteId}
                onDelete={onDeleteSpot}
            />
            <AddSystemDomenModal
                open={openEdit}
                setOpen={setEdit}
                item={editSystem}
            />
        </>
    )
}

export default ButtonsActionsTable
