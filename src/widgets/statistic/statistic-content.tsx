import FilterRow from "@entities/statistic/ui/filter-row"
import ColumnFilter from "@entities/statistic/ui/column-filter"
import SearchTableData from "@entities/statistic/ui/search-table-data"
import TableStatistic from "@entities/statistic/ui/table"
import { useState } from "react"
import { FormType } from "@entities/statistic/types"
import { Button } from "@shadcdn/button"
import { Funnel } from "lucide-react"



const StatisticContent = () => {

    const [openFilterData, setFilterData] = useState<boolean>(false)

    const handleSubmitFilterRow = (data: FormType) => {
        console.log(data);
        setFilterData(false)
    }

    return (
        <>
            <div className="space-y-5">
                <div className="flex gap-4">
                    <SearchTableData />
                    <Button onClick={() => setFilterData(true)} variant="outline">Фильтр данных
                        <Funnel />
                    </Button>
                    <ColumnFilter />
                </div>
                {openFilterData && <FilterRow onClose={() => setFilterData(false)} onSubmit={handleSubmitFilterRow} />}
                <TableStatistic />
            </div>
        </>
    )
}

export default StatisticContent