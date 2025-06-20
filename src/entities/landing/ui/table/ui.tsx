import { useReactTable, getCoreRowModel, flexRender, getFilteredRowModel, getSortedRowModel } from '@tanstack/react-table';
import { tableDataMock, tableHeaderMock } from '@entities/landing/mock';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@shadcdn/table"
import { useLandingTableStore } from '@entities/landing/store';
import { useEffect } from 'react';
import { ArrowDownUp } from 'lucide-react';

const TableLanding = () => {

    const {
        setColumnVisibility,
        columnVisibility,
        setAllColumns,
        allColumns,
        setColumnOrder,
        columnOrder,
        columnPinning,
        setColumnPinning
    } = useLandingTableStore()

    const table = useReactTable({
        data: tableDataMock,
        columns: tableHeaderMock,
        state: {
            columnVisibility: columnVisibility,
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

    useEffect(() => {
        setAllColumns(table.getAllLeafColumns());
    }, [table, setAllColumns, allColumns,]);

    useEffect(() => {
        setColumnOrder(table.getAllLeafColumns().map(col => col.id)); // только id
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

export default TableLanding;
