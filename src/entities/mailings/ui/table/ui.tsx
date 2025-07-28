import { useReactTable, getCoreRowModel, flexRender, getFilteredRowModel, getSortedRowModel } from '@tanstack/react-table';
import { tableHeaderMock } from '@entities/mailings/mock';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@shadcdn/table"
import { useMailingTableStore } from '@entities/mailings/store';
import { useEffect } from 'react';
import { ArrowDownUp } from 'lucide-react';
import { useQueryListMailing } from '@/entities/mailings/hooks/get-list-mailing';

const TableMailing = () => {

    const {
        setColumnVisibility,
        columnVisibility,
        setAllColumns,
        allColumns,
        setColumnOrder,
        columnOrder,
        columnPinning,
        setColumnPinning
    } = useMailingTableStore()

    const { data, isLoading } = useQueryListMailing()

    const table = useReactTable({
        data: data ?? [],
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
            {isLoading ? (
                <div className="flex items-center justify-center h-40">
                    <p className="text-muted-foreground">Загрузка...</p>
                    {/* Или можешь вставить кастомный спиннер */}
                </div>
            ) : (
                <div className="w-full h-full overflow-hidden">
                    <div className="border-2 rounded-lg bg-white">
                        <Table className="min-w-max relative">
                            <TableHeader>
                                {table.getHeaderGroups().map((headerGroups) => (
                                    <TableRow key={headerGroups.id}>
                                        {headerGroups.headers.map((header) => (
                                            <TableHead key={header.id}>
                                                <div className="flex items-center gap-3">
                                                    {String(header.column.columnDef.header)}
                                                    {header.column.getCanSort() && header.column.id !== 'actions' && (
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
                                {table.getRowModel()?.rows?.map((row) => (
                                    <TableRow key={row.id}>
                                        {row.getVisibleCells().map((cell) => (
                                            <TableCell key={cell.id}>
                                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </div>
            )}
        </>
    );

};

export default TableMailing;
