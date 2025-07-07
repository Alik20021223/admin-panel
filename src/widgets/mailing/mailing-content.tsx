import { Button } from "@shadcdn/button";
// import { FormType } from "@entities/mailings/types";
// import { useState } from "react";
import { Plus } from "lucide-react";
import ColumnFilter from "@entities/mailings/ui/column-filter";
// import FilterRow from "@entities/mailings/ui/filter-row";
import TableMailing from "@entities/mailings/ui/table";
import { useNavigate } from "react-router-dom";


const MailingContent = () => {

    // const [openFilterData, setFilterData] = useState<boolean>(false)

    const navigate = useNavigate()

    // const handleSubmitFilterRow = (data: FormType) => {
    //     console.log(data);
    //     setFilterData(false)
    // }

    return (
        <>
            <div className="space-y-5">
                <div className="flex justify-between">
                    <div className="flex gap-4">
                        {/* <Button onClick={() => setFilterData(true)} variant="outline">Фильтр данных
                            <Funnel />
                        </Button> */}
                        <ColumnFilter />
                    </div>

                    <Button onClick={() => navigate('add-bot')} variant="default">
                        <Plus />
                        Добавить рассылку
                    </Button>
                </div>
                {/* {openFilterData && <FilterRow onClose={() => setFilterData(false)} onSubmit={handleSubmitFilterRow} />} */}
                <TableMailing />
            </div>
        </>
    )
}

export default MailingContent