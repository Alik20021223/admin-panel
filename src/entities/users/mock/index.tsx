import { ColumnDef } from '@tanstack/react-table';
import { TableRow } from '@entities/users/types';
import ButtonsActionsTable from '@entities/users/ui/buttonsActionsTable';

export const tableHeaderMock: ColumnDef<TableRow>[] = [
  {
    id: 'ID',
    accessorKey: 'ID',
    header: 'ID',
    cell: (props) => <p>{String(props.getValue() ?? '')}</p>,
  },
  {
    id: 'email',
    accessorKey: 'email',
    header: 'Email',
    cell: (props) => <p>{String(props.getValue() ?? '')}</p>,
  },
  {
    id: 'role',
    accessorKey: 'role',
    header: 'Роль',
    cell: (props) => <p>{String(props.getValue() ?? '')}</p>,
  },
  {
    id: 'actions',
    accessorKey: 'actions',
    header: 'Действия',
    cell: (props) => <ButtonsActionsTable props={props} />,
  },
];
