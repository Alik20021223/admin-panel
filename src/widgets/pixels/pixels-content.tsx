import { Button } from "@shadcdn/button";
import { Plus } from "lucide-react";
import { useState } from "react";
import AddPixelModal from "@entities/pixels/ui/form-pixel";
import TablePixels from "@entities/pixels/ui/table";

const PixelsContent = () => {


    const [open, setOpen] = useState(false)

    return (
        <div className="space-y-5">
            <div className="flex justify-end">

                <Button onClick={() => setOpen(true)} variant="default">
                    <Plus />
                    Добавить пиксель
                </Button>
            </div>
            {open && <AddPixelModal open={open} setOpen={setOpen} />}
            <TablePixels />
        </div>
    )
}

export default PixelsContent