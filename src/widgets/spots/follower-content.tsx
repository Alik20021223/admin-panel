import { Button } from "@shadcdn/button";
import { Download, Funnel } from "lucide-react";
import { useState } from "react";
import { FormFilterTypeFollower } from "@entities/spots/types";
import TableFollower from "@entities/spots/ui/item-followers/table-follower";
import ColumnFilterFollower from "@entities/spots/ui/item-followers/column-filter-follower";
import FilterRowFollower from "@entities/spots/ui/item-followers/filter-row-follower";


const FollowerContent = () => {

    const [openFilterData, setFilterData] = useState<boolean>(false)

    const handleSubmitFilterRow = (data: FormFilterTypeFollower) => {
        console.log(data);
        setFilterData(false)
    }

    return (
        <>
            <div className="space-y-5">
                <div className="flex justify-between">
                    <div className="flex gap-4">
                        <Button onClick={() => setFilterData(true)} variant="outline">Фильтр данных
                            <Funnel />
                        </Button>
                        <ColumnFilterFollower />
                    </div>

                    <Button onClick={() => { }} variant="default">
                        <Download />
                        Выгрузить в Excel
                    </Button>
                </div>
                {openFilterData && <FilterRowFollower onClose={() => setFilterData(false)} onSubmit={handleSubmitFilterRow} />}
                <TableFollower />
            </div>
        </>
    )
}

export default FollowerContent