import { Button } from "@shadcdn/button";
import { FormType } from "@entities/spots/types";
import { Funnel, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import FilterRow from "@entities/spots/ui/filter-row-spots";
import { CreateTypeSpotTelegram } from "@entities/spots/mock";
import ItemSpot from "@entities/spots/ui/item-spot";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@shadcdn/dialog"
import { Link } from "react-router-dom";
import { useQueryListSpots } from "@entities/spots/hooks/get-list-spots";
import { useSpotsTableStore } from "@entities/spots/store";
// import { useNavigate } from "react-router-dom";


const SpotsContent = () => {

    // const navigate = useNavigate()

    const [openFilterData, setFilterData] = useState<boolean>(false)

    const { data } = useQueryListSpots()


    const { setPixels } = useSpotsTableStore()

    useEffect(() => {
        setPixels(data.pixels)
    }, [data])

    const handleSubmitFilterRow = (data: FormType) => {
        console.log(data);
        setFilterData(false)
    }

    return (
        <>
            <div className="space-y-5">
                <div className="flex justify-between w-full">
                    <Button onClick={() => setFilterData(true)} variant="outline">Фильтр данных
                        <Funnel />
                    </Button>

                    <Dialog>
                        <DialogTrigger asChild>
                            <Button variant="default">
                                <Plus />
                                Добавить спот
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Выберите тип спота</DialogTitle>
                            </DialogHeader>
                            <div className="grid grid-cols-2 gap-3">
                                {CreateTypeSpotTelegram.map((item) =>
                                    <Link to={item.value} className="flex items-center gap-2 border-2 rounded-lg px-2 py-2 text-sm" key={item.value}>
                                        {item.icon}
                                        <p>{item.label}</p>
                                    </Link>
                                )}
                            </div>
                        </DialogContent>
                    </Dialog>


                </div>
                {openFilterData && <FilterRow onClose={() => setFilterData(false)} onSubmit={handleSubmitFilterRow} />}
                <div className="relative grid grid-cols-4 gap-[10px] max-h-[calc(100vh-126px)] overflow-y-auto custom-scroll">
                    {data.spots.map((item) => (
                        <ItemSpot item={item} domain={data.system_domain} />
                    ))}
                </div>

            </div>

        </>
    )
}

export default SpotsContent