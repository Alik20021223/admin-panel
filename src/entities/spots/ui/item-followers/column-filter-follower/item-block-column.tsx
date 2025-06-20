import { Column } from "@tanstack/react-table"
import { Eye, EyeOff, Pin, PinOff, GripVertical } from 'lucide-react';
import { Button } from "@shadcdn/button";
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useSpotsTableStore } from "@entities/spots/store";
import { TableRowFollower } from "@entities/spots/types";


interface ItemBlockColumnProps {
    item: Column<TableRowFollower>;
    dragHandleProps?: Record<string, unknown>;
}

const ItemBlockColumn: React.FC<ItemBlockColumnProps> = ({ item, dragHandleProps }) => {
    const { columnVisibilityFollower, columnPinningFollower, setColumnPinningFollower } = useSpotsTableStore();

    const isVisible = columnVisibilityFollower[item.id] !== false;
    const isPinned = (columnPinningFollower.left ?? []).includes(item.id);

    const togglePin = () => {
        setColumnPinningFollower((prev) => {
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


