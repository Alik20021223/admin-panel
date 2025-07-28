import { useReactTable, getCoreRowModel, flexRender, getFilteredRowModel, getSortedRowModel } from '@tanstack/react-table';
import { tableHeaderMock } from '@entities/landing/mock';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@shadcdn/table"
import { useLandingStore } from '@entities/landing/store';
import { useEffect, useMemo } from 'react';
import { ArrowDownUp } from 'lucide-react';
import { useQueryListLanding } from '../../hooks/get-list-landings';

const TableLanding = () => {
    const {
        setColumnVisibility,
        columnVisibility,
        setAllColumns,
        setColumnOrder,
        columnOrder,
        columnPinning,
        setColumnPinning,
        setPixels
    } = useLandingStore()

    const { data } = useQueryListLanding()

    console.log(data);
    

    // Мемоизация данных
    const processedData = useMemo(() => (data?.landings || []).map((item) => ({
        ...item,
        link: `${window.location.origin}/l/${item.landing_id}`,
    })), [data?.landings]);

    // Однократное обновление pixels
    useEffect(() => {
        if (data?.pixels) {
            setPixels(data.pixels)
        }
    }, [data?.pixels, setPixels])

    // Мемоизация таблицы
    const table = useReactTable({
        data: processedData,
        columns: tableHeaderMock,
        state: {
            columnVisibility,
            columnOrder,
            columnPinning,
        },
        onColumnOrderChange: setColumnOrder,
        onColumnVisibilityChange: setColumnVisibility,
        getSortedRowModel: getSortedRowModel(),
        getCoreRowModel: getCoreRowModel(),
        onColumnPinningChange: setColumnPinning,
        getFilteredRowModel: getFilteredRowModel(),
    });

    // Однократное установление колонок при монтировании
    useEffect(() => {
        const columns = table.getAllLeafColumns();
        setAllColumns(columns);
        setColumnOrder(columns.map(col => col.id));
    }, [table, setAllColumns, setColumnOrder]); // Убрал allColumns из зависимостей

    return (
        <div className="w-full h-full overflow-hidden">
            <div className="overflow-x-auto border-2 rounded-lg bg-white">
                <Table className="min-w-max relative">
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroups) => (
                            <TableRow key={headerGroups.id}>
                                {headerGroups.headers.map((header) => (
                                    <TableHead key={header.id}>
                                        <div className='flex items-center gap-3'>
                                            {String(header.column.columnDef.header)}
                                            {header.column.getCanSort() && header.column.id !== 'actions' && header.column.id !== 'spot' && (
                                                <ArrowDownUp
                                                    size={14}
                                                    onClick={header.column.getToggleSortingHandler()}
                                                    className="cursor-pointer"
                                                />
                                            )}
                                        </div>
                                    </TableHead>
                                ))}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows.map((row) => (
                            <TableRow key={row.id}>
                                {row.getVisibleCells().map((cell) => (
                                    <TableCell
                                        key={cell.id}
                                        style={cell.column.columnDef.meta?.style}
                                    >
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
};

export default TableLanding;