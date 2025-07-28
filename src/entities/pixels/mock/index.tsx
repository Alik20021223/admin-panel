import { ColumnDef } from '@tanstack/react-table';
import { TableRow } from '@entities/pixels/types';
import ButtonsActionsTable from '@entities/pixels/ui/buttonsActionsTable'

export const tableHeaderMock: ColumnDef<TableRow>[] = [
  { id: "id", accessorKey: "id", header: "id", cell: (props) => <p>{String(props.getValue() ?? '')}</p> },
  { id: "name", accessorKey: "name", header: "Название", cell: (props) => <p>{String(props.getValue() ?? '')}</p> },
  { id: "pixel_id", accessorKey: "pixel_id", header: "ID-PIXEL", cell: (props) => <p>{String(props.getValue() ?? '')}</p> },
  {
    id: "actions", accessorKey: "actions", header: "Действия", cell: (props) => <ButtonsActionsTable props={props} />,
  },
];


