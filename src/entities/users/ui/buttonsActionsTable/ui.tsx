import { CellContext } from "@tanstack/react-table"
import { TableRow } from "@entities/users/types"
import { Edit } from "lucide-react"
import { TooltipProvider } from "@shadcdn/tooltip"
import IconButtonWithTooltip from "@feature/iconButtonTooltip"
import { useState } from "react"
import ChangeRoleModal from "@entities/users/ui/update-role"
import { useUsersTableStore } from "@entities/users/store"

interface ButtonsActionsTableProps {
    props: CellContext<TableRow, unknown>
}

const ButtonsActionsTable: React.FC<ButtonsActionsTableProps> = ({ props }) => {
    const [openEdit, setOpenEdit] = useState(false)
    const { setUser } = useUsersTableStore()


    const OpenEditModal = (data: TableRow) => {
        setOpenEdit(true)
        setUser(data)
    }

    return (
        <>
            <TooltipProvider delayDuration={500}>
                <div className="flex gap-1 items-center">
                    <IconButtonWithTooltip
                        onClickButton={() => OpenEditModal(props.row.original)}
                        icon={<Edit className="text-black hover:text-white" />}
                        tooltip="Изменить роль"
                    />
                </div>
            </TooltipProvider>

            <ChangeRoleModal open={openEdit} setOpen={setOpenEdit} />
        </>
    )
}

export default ButtonsActionsTable
