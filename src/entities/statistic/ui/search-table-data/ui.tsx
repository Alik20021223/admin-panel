import { Input } from "@shadcdn/input"
import { useStatisticTableStore } from "@entities/statistic/store"
import { Search } from "lucide-react";

const SearchTableData = () => {
    const { columnFilter, setColumnFilter } = useStatisticTableStore();

    const taskName = columnFilter.find((item) => item.id === 'channel_name')?.value || '';

    const onFilterChange = (id: string, value: string) => {
        const updated = columnFilter.filter(f => f.id !== id);
        if (value) updated.push({ id, value });
        setColumnFilter(updated);
    };

    return (
        <div className="w-56">
            <Input
                leftIcon={<Search />}
                value={taskName}
                onChange={(e) => onFilterChange('channel_name', e.target.value)}
                placeholder="Поиск по названию"
            />
        </div>
    );
};

export default SearchTableData;
