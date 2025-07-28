import { ColumnDef } from '@tanstack/react-table';
import { TableRow } from '@entities/domen/types';
import ButtonsActionsTable from '@entities/domen/ui/buttonsActionsTable'

export const tableHeaderMock: ColumnDef<TableRow>[] = [
  { id: "id", accessorKey: "ID", header: "id", cell: (props) => <p>{String(props.getValue() ?? '')}</p> },
  { id: "url", accessorKey: "url", header: "Ссылка", cell: (props) => <p>{String(props.getValue() ?? '')}</p> },
  { id: "status", accessorKey: "status", header: "Статус", cell: (props) => <p>{String(props.getValue() ?? '')}</p> },
  {
    id: "actions", accessorKey: "actions", header: "Действия", cell: (props) => <ButtonsActionsTable props={props} />,
  },
];

export const multiOptions = [
  { value: "apple", label: "Apple" },
  { value: "banana", label: "Banana" },
  { value: "orange", label: "Orange" },
];

