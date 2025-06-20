import { ColumnDef } from '@tanstack/react-table';
import { TableRow } from '@entities/mailings/types';
import { Button } from '@shared/shadcdn/button';
import { EllipsisVertical } from 'lucide-react';

export const tableHeaderMock: ColumnDef<TableRow>[] = [
  { id: "id", accessorKey: "id", header: "ID", cell: (props) => <p>{String(props.getValue() ?? '')}</p> },
  { id: "name", accessorKey: "name", header: "Название", cell: (props) => <p>{String(props.getValue() ?? '')}</p> },
  { id: "type", accessorKey: "type", header: "Тип", cell: (props) => <p>{String(props.getValue() ?? '')}</p> },
  { id: "status", accessorKey: "status", header: "Статус рассылки", cell: (props) => <p>{String(props.getValue() ?? '')}</p> },
  { id: "message_count", accessorKey: "message_count", header: "Кол-во сообщений", cell: (props) => <p>{String(props.getValue() ?? '')}</p> },
  { id: "author", accessorKey: "author", header: "Автор", cell: (props) => <p>{String(props.getValue() ?? '')}</p> },
  {
    id: "actions", accessorKey: "actions", header: "Действия", cell: (props) =>
      <Button onClick={() => console.log(props)}>
        <EllipsisVertical />
      </Button >
  },
];

export const tableDataMock: TableRow[] = [
  {
    id: 1,
    name: "Летняя акция",
    type: "Автоматическая",
    status: "Запущена",
    message_count: 120,
    author: "Иван Иванов",
    actions: "", // действия обычно рендерятся отдельно
  },
  {
    id: 2,
    name: "Приветственное письмо",
    type: "Ручная",
    status: "Остановлена",
    message_count: 45,
    author: "Анна Смирнова",
    actions: "",
  },
];

export const multiOptions = [
  { value: "apple", label: "Apple" },
  { value: "banana", label: "Banana" },
  { value: "orange", label: "Orange" },
];

