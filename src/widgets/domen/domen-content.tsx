import { Button } from "@shadcdn/button";
import { Plus } from "lucide-react";
import TableDomen from "@entities/domen/ui/table";
import { useState } from "react";
import AddDomenModal from "@entities/domen/ui/add-domen";
import { useSharedStore } from "@shared/store";
import AddSystemDomenModal from "@entities/domen/ui/add-system-domen";

const DomenContent = () => {


    const [open, setOpen] = useState(false)
    const [openSystem, setOpenSystem] = useState(false)
    const { user } = useSharedStore()

    return (
        <div className="space-y-5">
            <div className="flex justify-end gap-4">

                <Button onClick={() => setOpen(true)} variant="default">
                    <Plus />
                    Добавить домен
                </Button>
                {user?.role === "admin" &&
                    <Button onClick={() => setOpenSystem(true)} variant="default">
                        <Plus />
                        Добавить системный домен
                    </Button>
                }
            </div>
            {open && <AddDomenModal open={open} setOpen={setOpen} />}
            {openSystem && <AddSystemDomenModal open={openSystem} setOpen={setOpenSystem} />}
            <TableDomen />
        </div>
    )
}

export default DomenContent