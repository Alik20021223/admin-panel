import { useReactTable, getCoreRowModel, flexRender, getFilteredRowModel, getSortedRowModel } from '@tanstack/react-table';
import { tableDataMock, tableHeaderMock } from '@entities/statistic/mock';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@shadcdn/table"
import { useStatisticTableStore } from '@entities/statistic/store';
import { useEffect } from 'react';
import { ArrowDownUp } from 'lucide-react';
import { useQueryDashboardStatistic } from '@entities/statistic/hooks/get-dashboard-statistic';

const TableStatistic = () => {

    const {
        columnFilter,
        setColumnVisibility,
        columnVisibility,
        setAllColumns,
        allColumns,
        setColumnOrder,
        columnOrder,
        columnPinning,
        setColumnPinning
    } = useStatisticTableStore()

    const { data } = useQueryDashboardStatistic()

    console.log(data);


    const table = useReactTable({
        data: tableDataMock,
        columns: tableHeaderMock,
        state: {
            columnFilters: columnFilter,
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
                                                className={header.column.id === 'name' ? 'sticky left-0 z-10 bg-slate-300 shadow-md' : ''}
                                            >
                                                <div className='flex items-center gap-3'>
                                                    {String(header.column.columnDef.header)}
                                                    {header.column.getCanSort() && <ArrowDownUp size={14} onClick={header.column.getToggleSortingHandler()} />}
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
                                                className={cell.column.id === 'name' ? "sticky left-0 z-10 bg-slate-300 shadow-2xl" : ""}
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

export default TableStatistic;
