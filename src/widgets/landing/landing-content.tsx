import { Button } from "@shadcdn/button";
import { Plus } from "lucide-react";
import ColumnFilter from "@entities/landing/ui/column-filter";
import TableLanding from "@entities/landing/ui/table";
import { useNavigate } from "react-router-dom";


const LandingContent = () => {

    const navigate = useNavigate()

    return (
        <>
            <div className="space-y-5">
                <div className="flex justify-between">
                    <div className="flex gap-4">
                        <ColumnFilter />
                    </div>


                    <Button onClick={() => navigate('add')} variant="default">
                        <Plus />
                        Создать лендинг
                    </Button>

                </div>
                <TableLanding />
            </div>
        </>
    )
}

export default LandingContent