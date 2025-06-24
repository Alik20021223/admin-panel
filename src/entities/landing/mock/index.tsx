import { CustomColumnDef, TableRow } from '@entities/landing/types';
import ButtonsActionsTable from '@entities/landing/ui/buttonsActionsTable';
// import { EllipsisVertical } from 'lucide-react';



export const tableHeaderMock: CustomColumnDef<TableRow>[] = [
  { id: "landing_id", accessorKey: "landing_id", header: "ID", cell: (props) => <p>{String(props.getValue() ?? '')}</p> },
  { id: "title", accessorKey: "title", header: "Название", cell: (props) => <p>{String(props.getValue() ?? '')}</p> },
  { id: "spot_title", accessorKey: "spot_title", header: "Домен", cell: (props) => <p>{String(props.getValue() ?? '')}</p> },
  { id: "domain", accessorKey: "domain", header: "Спот", cell: (props) => <p>{String(props.getValue() ?? '')}</p> },
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

