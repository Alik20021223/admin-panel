import { Button } from "@shadcdn/button";
import { Plus } from "lucide-react";
import TableDomen from "@entities/domen/ui/table";
import { useState } from "react";
import AddDomenModal from "@/entities/domen/ui/add-pixels";

const DomenContent = () => {


    const [open, setOpen] = useState(true)

    return (
        <div className="space-y-5">
            <div className="flex justify-end">

                <Button onClick={() => setOpen(true)} variant="default">
                    <Plus />
                    Добавить домен
                </Button>
            </div>
            {open && <AddDomenModal open={open} setOpen={setOpen} />}
            <TableDomen />
        </div>
    )
}

export default DomenContent