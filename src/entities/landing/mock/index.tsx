import { CustomColumnDef, TableRow } from '@entities/landing/types';
import ButtonsActionsTable from '@entities/landing/ui/buttonsActionsTable';
// import { EllipsisVertical } from 'lucide-react';



export const tableHeaderMock: CustomColumnDef<TableRow>[] = [
  { id: "landing_id", accessorKey: "landing_id", header: "ID", cell: (props) => <p>{String(props.getValue() ?? '')}</p> },
  { id: "title", accessorKey: "title", header: "Название", cell: (props) => <p>{String(props.getValue() ?? '')}</p> },
  { id: "domain", accessorKey: "domain", header: "Домен", cell: (props) => <p>{String(props.getValue() ?? '')}</p> },
  { id: "spot_title", accessorKey: "spot_title", header: "Спот", cell: (props) => <p>{String(props.getValue() ?? '')}</p> },
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
    landing_id: "1",
    title: "Канал A",
    domain: "example.com",
    spot_title: "test 1",
  },
  {
    landing_id: "2",
    title: "Канал B",
    domain: "test.ru",
    spot_title: "test 2",
  },
];

