import {
    useReactTable,
    getCoreRowModel,
    flexRender,
    getFilteredRowModel,
    getSortedRowModel
} from '@tanstack/react-table';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@shadcdn/table"
import { useEffect } from 'react';
import { ArrowDownUp } from 'lucide-react';
import { useSpotsTableStore } from '@entities/spots/store';
import { tableBodyMockFollower, tableHeaderMockFollower } from '@entities/spots/mock';

const TableFollower = () => {

    const {
        setColumnVisibilityFollower,
        columnVisibilityFollower,
        setAllColumnsFollower,
        allColumnsFollower,
        setColumnOrderFollower,
        columnOrderFollower,
        columnPinningFollower,
        setColumnPinningFollower
    } = useSpotsTableStore()

    const table = useReactTable({
        data: tableBodyMockFollower,
        columns: tableHeaderMockFollower,
        state: {
            columnVisibility: columnVisibilityFollower,
            columnOrder: columnOrderFollower,
            columnPinning: columnPinningFollower,
        },
        onColumnOrderChange: setColumnOrderFollower,
        onColumnVisibilityChange: setColumnVisibilityFollower,
        getSortedRowModel: getSortedRowModel(),
        getCoreRowModel: getCoreRowModel(),
        onColumnPinningChange: setColumnPinningFollower,
        getFilteredRowModel: getFilteredRowModel(),
    });

    useEffect(() => {
        setAllColumnsFollower(table.getAllLeafColumns());
    }, [table, setAllColumnsFollower, allColumnsFollower,]);

    useEffect(() => {
        setColumnOrderFollower(table.getAllLeafColumns().map(col => col.id)); // только id
    }, []);

    return (
        <>

            <div className="w-full h-full overflow-hidden"> {/* запрет прокрутки контейнера */}
                <div className="overflow-x-auto border-2 rounded-lg bg-white">             {/* включаем только горизонтальный скролл */}
                    <Table className="min-w-max relative">
                        <TableHeader>
                            {table.getHeaderGroups().map((headerGroups) => (
                                <TableRow key={headerGroups.id}>
                                    {headerGroups.headers.map((header) => {
                                        return (
                                            <TableHead
                                                key={header.id}
                                            >
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
                                        );
                                    })}
                                </TableRow>
                            ))}
                        </TableHeader>
                        <TableBody>
                            {table.getRowModel().rows.map((row) => (
                                <TableRow key={row.id}>
                                    {row.getVisibleCells().map((cell) => {
                                        return (
                                            <TableCell
                                                key={cell.id}
                                                style={cell.column.columnDef.meta?.style}
                                            >
                                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                            </TableCell>
                                        );
                                    })}
                                </TableRow>
                            ))}
                        </TableBody>

                    </Table>
                </div>
            </div>

        </>
    );
};

export default TableFollower;
