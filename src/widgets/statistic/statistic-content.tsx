import FilterRow from "@entities/statistic/ui/filter-row"
import ColumnFilter from "@entities/statistic/ui/column-filter"
import SearchTableData from "@entities/statistic/ui/search-table-data"
import TableStatistic from "@entities/statistic/ui/table"
import { useEffect, useState } from "react"
import { FormType } from "@entities/statistic/types"
import { Button } from "@shadcdn/button"
import { Funnel } from "lucide-react"
// import { useQueryDashboardStatistic } from "@entities/statistic/hooks/get-dashboard-statistic"
import { useQueryStatisticFilter } from "@entities/statistic/hooks/get-statistic-filter"



const StatisticContent = () => {

    const [openFilterData, setFilterData] = useState<boolean>(false)
    const [filterItems, setFilterItems] = useState<FormType | null>(null)
    const { data, refetch } = useQueryStatisticFilter(filterItems)

    useEffect(() => {
        refetch(); // всегда вызываем при любом изменении filterItems
    }, [filterItems]);


    const handleSubmitFilterRow = (data: FormType) => {
        setFilterItems(data)
        // setFilterData(false)
        // refetch()
    }

    const onOpenFilterData = () => {
        setFilterData(true)
    }

    const handleCloseFilter = () => {

        setFilterData(false)
        setFilterItems(null)
    }



    return (
        <>
            <div className="space-y-5">
                <div className="flex gap-4">
                    <SearchTableData />
                    {/* <Button onClick={onOpenFilterData} variant="outline">Фильтр данных
                        <Funnel />
                    </Button> */}
                    <Button onClick={onOpenFilterData} variant="outline">Фильтр данных
                        <Funnel />
                    </Button>
                    <ColumnFilter />
                </div>
                {
                    openFilterData &&
                    <FilterRow onClose={handleCloseFilter} onSubmit={handleSubmitFilterRow} />
                }
                <TableStatistic data={data?.channels || []} />
            </div>
        </>
    )
}

export default StatisticContent