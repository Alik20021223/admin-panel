import { CustomColumnDef, TableRow } from '@entities/landing/types';
import ButtonsActionsTable from '@entities/landing/ui/buttonsActionsTable';
// import { EllipsisVertical } from 'lucide-react';



export const tableHeaderMock: CustomColumnDef<TableRow>[] = [
  { id: "id", accessorKey: "id", header: "ID", cell: (props) => <p>{String(props.getValue() ?? '')}</p> },
  { id: "name", accessorKey: "name", header: "Название", cell: (props) => <p>{String(props.getValue() ?? '')}</p> },
  { id: "domen", accessorKey: "domen", header: "Домен", cell: (props) => <p>{String(props.getValue() ?? '')}</p> },
  { id: "spot", accessorKey: "spot", header: "Спот", cell: (props) => <p>{String(props.getValue() ?? '')}</p> },
  {
    id: "actions",
    accessorKey: "actions",
    header: "Действия",
    cell: (props) => <ButtonsActionsTable props={props} />,
    meta: {
      style: { width: "252px" },
    },
  }

];




export const tableDataMock: TableRow[] = [
  {
    id: 1,
    name: "Канал A",
    domen: "example.com",
    spot: "test 1",
  },
  {
    id: 2,
    name: "Канал B",
    domen: "test.ru",
    spot: "test 2",

  },
];

