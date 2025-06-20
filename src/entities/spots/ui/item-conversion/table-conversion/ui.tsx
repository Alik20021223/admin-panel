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
import { tableBodyMockConversion, tableHeaderMockConversion } from '@entities/spots/mock';

const TableConversio = () => {

    const {
        setColumnVisibilityConversion,
        columnVisibilityConversion,
        setAllColumnsConversion,
        allColumnsConversion,
        setColumnOrderConversion,
        columnOrderConversion,
        columnPinningConversion,
        setColumnPinningConversion
    } = useSpotsTableStore()

    const table = useReactTable({
        data: tableBodyMockConversion,
        columns: tableHeaderMockConversion,
        state: {
            columnVisibility: columnVisibilityConversion,
            columnOrder: columnOrderConversion,
            columnPinning: columnPinningConversion,
        },
        onColumnOrderChange: setColumnOrderConversion,
        onColumnVisibilityChange: setColumnVisibilityConversion,
        getSortedRowModel: getSortedRowModel(),
        getCoreRowModel: getCoreRowModel(),
        onColumnPinningChange: setColumnPinningConversion,
        getFilteredRowModel: getFilteredRowModel(),
    });

    useEffect(() => {
        setAllColumnsConversion(table.getAllLeafColumns());
    }, [table, setAllColumnsConversion, allColumnsConversion,]);

    useEffect(() => {
        setColumnOrderConversion(table.getAllLeafColumns().map(col => col.id)); // только id
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

export default TableConversio;
