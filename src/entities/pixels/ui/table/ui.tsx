import { useReactTable, getCoreRowModel, flexRender } from '@tanstack/react-table';
import { tableHeaderMock } from '@entities/pixels/mock';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@shadcdn/table"
import { usePixelsTableStore } from '@entities/pixels/store';
import { useEffect } from 'react';
import { ArrowDownUp } from 'lucide-react';
import { useQueryListPixels } from '@entities/pixels/hooks/get-list-pixels';

const TablePixels = () => {

    const {
        setAllColumns,
        allColumns,
        setColumnOrder,
        columnOrder,
    } = usePixelsTableStore()

    const { data, isLoading } = useQueryListPixels()

    const { setPixel } = usePixelsTableStore()

    useEffect(() => {
        if (data?.pixels) {
            setPixel(data?.pixels)
        }
    }, [isLoading])



    const table = useReactTable({
        data: data?.pixels || [],
        columns: tableHeaderMock,
        state: {
            columnOrder,
        },
        onColumnOrderChange: setColumnOrder,
        getCoreRowModel: getCoreRowModel(),
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
                                {table.getRowModel().rows.map((row) => (
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

export default TablePixels;
