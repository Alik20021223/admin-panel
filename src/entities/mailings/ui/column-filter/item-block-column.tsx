import { Column } from "@tanstack/react-table"
import { Eye, EyeOff, Pin, PinOff, GripVertical } from 'lucide-react';
import { TableRow } from "@entities/mailings/types"
import { Button } from "@shadcdn/button";
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useMailingTableStore } from "@entities/mailings/store";

interface ItemBlockColumnProps {
    item: Column<TableRow>;
    dragHandleProps?: Record<string, unknown>;
}

const ItemBlockColumn: React.FC<ItemBlockColumnProps> = ({ item, dragHandleProps }) => {
    const { columnVisibility, columnPinning, setColumnPinning } = useMailingTableStore();

    const isVisible = columnVisibility[item.id] !== false;
    const isPinned = (columnPinning.left ?? []).includes(item.id);

    const togglePin = () => {
        setColumnPinning((prev) => {
            const alreadyPinned = prev.left?.includes(item.id);
            const newLeft = alreadyPinned
                ? prev.left!.filter((id) => id !== item.id)
                : [...(prev.left ?? []), item.id];

            return {
                ...prev,
                left: newLeft,
            };
        });
    };


    return (
        <div className="flex items-center justify-between rounded border px-3 py-2 shadow-sm">
            <div className="flex items-center gap-2" {...dragHandleProps}>
                <GripVertical className="cursor-move text-muted-foreground" />
                <span>{item.columnDef.header as string}</span>
            </div>
            <div className="flex items-center gap-2">
                <Button
                    onClick={togglePin}
                    className={`${isPinned ? 'bg-blue-500 text-white' : 'bg-white text-gray-500'}`}
                    title={isPinned ? 'Открепить' : 'Закрепить'}
                >
                    {isPinned ? <Pin /> : <PinOff />}
                </Button>

                <Button
                    onClick={() => item.toggleVisibility(!isVisible)}
                    className={`${isVisible ? 'bg-white text-gray-500' : 'bg-gray-200 text-black'}`}
                    title={isVisible ? 'Скрыть' : 'Показать'}
                >
                    {isVisible ? <Eye /> : <EyeOff />}
                </Button>
            </div>
        </div>
    );
};


const SortableItemBlockColumn: React.FC<ItemBlockColumnProps> = ({ item }) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
    } = useSortable({ id: item.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        touchAction: 'none',
    };

    return (
        <div ref={setNodeRef} style={style}>
            <ItemBlockColumn item={item} dragHandleProps={{ ...attributes, ...listeners }} />
        </div>
    );
};

export default SortableItemBlockColumn


