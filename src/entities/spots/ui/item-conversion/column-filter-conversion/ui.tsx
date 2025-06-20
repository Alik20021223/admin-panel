import { Button } from "@shadcdn/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@shadcdn/dialog"
import { Funnel, Save } from 'lucide-react';
import SortableItemBlockColumn from "./item-block-column";
import {
    DndContext,
    closestCenter,
    PointerSensor,
    useSensor,
    useSensors,
    DragEndEvent,
} from '@dnd-kit/core';
import {
    arrayMove,
    SortableContext,
    verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { useSpotsTableStore } from "@entities/spots/store";


const ColumnFilter = () => {

    const { allColumnsConversion, setAllColumnsConversion, setColumnOrderConversion } = useSpotsTableStore()

    const sensors = useSensors(useSensor(PointerSensor));


    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;
        if (active.id !== over?.id) {
            const oldIndex = allColumnsConversion.findIndex(col => col.id === active.id);
            const newIndex = allColumnsConversion.findIndex(col => col.id === over?.id);
            const newOrder = arrayMove(allColumnsConversion, oldIndex, newIndex);



            setAllColumnsConversion(newOrder); // Обновляем порядок в Zustand
            setColumnOrderConversion(newOrder.map(col => col.id));
        }
    };

    return (
        <>
            <Dialog>
                <form className="pr-3">
                    <DialogTrigger asChild>
                        <Button variant="outline">Фильтр Колонок
                            <Funnel />
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px] sm:max-h-[550px]" >
                        <DialogHeader>
                            <DialogTitle>Настройка таблицы</DialogTitle>
                        </DialogHeader>
                        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                            <SortableContext items={allColumnsConversion.map(col => col.id)} strategy={verticalListSortingStrategy}>
                                <div className="grid gap-4 max-h-[400px] overflow-y-auto pr-3 custom-scroll">
                                    {allColumnsConversion.map((item) => (
                                        <SortableItemBlockColumn key={item.id} item={item} />
                                    ))}
                                </div>
                            </SortableContext>
                        </DndContext>
                        <DialogFooter className="pr-3">
                            <DialogClose>
                                <Button type="submit">
                                    <Save className="ml-2 w-4 h-4" />
                                    Сохранить данные
                                </Button>
                            </DialogClose>
                        </DialogFooter>
                    </DialogContent>
                </form>
            </Dialog>
        </>
    )
}

export default ColumnFilter