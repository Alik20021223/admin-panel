import { useReactTable, getCoreRowModel, flexRender } from '@tanstack/react-table';
import { tableHeaderMock } from '@entities/users/mock';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@shadcdn/table"
import { useUsersTableStore } from '@entities/users/store';
import { useEffect } from 'react';
import { useQueryListUsers } from '@entities/users/hooks/get-list-users';

const TableUsers = () => {

    const {
        setAllColumns,
        allColumns,
    } = useUsersTableStore()

    const { data, isLoading } = useQueryListUsers()

    const table = useReactTable({
        data: data || [],
        columns: tableHeaderMock,
        getCoreRowModel: getCoreRowModel(),
    });

    useEffect(() => {
        setAllColumns(table.getAllLeafColumns());
    }, [table, setAllColumns, allColumns,]);

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

export default TableUsers;
