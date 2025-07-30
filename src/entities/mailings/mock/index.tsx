import { ColumnDef } from '@tanstack/react-table';
import { TableRow } from '@entities/mailings/types';
import ButtonsActionsTable from '@entities/mailings/ui/buttonsActionsTable';
import { statusMap } from '@shared/utils';

export const tableHeaderMock: ColumnDef<TableRow>[] = [
  { id: "mailing_name", accessorKey: "mailing_name", header: "Название", cell: (props) => <p>{String(props.getValue() ?? '')}</p> },
  { id: "mailing_type", accessorKey: "mailing_type", header: "Тип", cell: (props) => <p>{String(props.getValue() === "permanent" ? "Постоянная" : "Одноразовая")}</p> },
  {
    id: "status",
    accessorKey: "status",
    header: "Статус рассылки",
    cell: (props) => {
      const value = String(props.getValue() ?? '');
      return <p>{statusMap[value] ?? value}</p>;
    }
  },
  { id: "user_email", accessorKey: "user_email", header: "Автор", cell: (props) => <p>{String(props.getValue() ?? '')}</p> },
  {
    id: "actions", accessorKey: "actions", header: "Действия", cell: (props) => <ButtonsActionsTable props={props} />,
  },
];
