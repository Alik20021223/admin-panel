import TableConversion from "@entities/spots/ui/item-conversion/table-conversion";
import ColumnFilter from "@entities/spots/ui/item-conversion/column-filter-conversion";
import { Button } from "@shadcdn/button";
import { Download, Funnel } from "lucide-react";
import { useState } from "react";
import { FormTypeConversion } from "@entities/spots/types";
import FilterRowConversion from "@entities/spots/ui/item-conversion/filter-row-conversion";


const ConversionContent = () => {

    const [openFilterData, setFilterData] = useState<boolean>(false)

    const handleSubmitFilterRow = (data: FormTypeConversion) => {
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
                        <ColumnFilter />
                    </div>

                    <Button onClick={() => { }} variant="default">
                        <Download />
                        Выгрузить в Excel
                    </Button>
                </div>
                {openFilterData && <FilterRowConversion onClose={() => setFilterData(false)} onSubmit={handleSubmitFilterRow} />}
                <TableConversion />
            </div>
        </>
    )
}

export default ConversionContent