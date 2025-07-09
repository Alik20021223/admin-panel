import { Button } from "@shadcdn/button";
import { Plus } from "lucide-react";
import ColumnFilter from "@entities/landing/ui/column-filter";
import TableLanding from "@entities/landing/ui/table";
import { useNavigate } from "react-router-dom";
import { useLandingStore } from "@entities/landing/store";
import { useEffect } from "react";


const LandingContent = () => {

    const navigate = useNavigate()

    const {
        setEditData,
    } = useLandingStore();

    useEffect(() => {
        setEditData(null)
    }, [])

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