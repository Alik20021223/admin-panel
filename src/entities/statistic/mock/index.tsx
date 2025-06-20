import { ColumnDef } from '@tanstack/react-table';
import { TableRow } from '@entities/statistic/types';

export const tableHeaderMock: ColumnDef<TableRow>[] = [
  { id: "name", accessorKey: "name", header: "Название", cell: (props) => <p>{String(props.getValue() ?? '')}</p> },
  { id: "clicks", accessorKey: "clicks", header: "Кол-во кликов", cell: (props) => <p>{String(props.getValue() ?? '')}</p> },
  { id: "subscribers", accessorKey: "subscribers", header: "Кол-во подписчиков", cell: (props) => <p>{String(props.getValue() ?? '')}</p> },
  { id: "cr", accessorKey: "cr", header: "CR", cell: (props) => <p>{String(props.getValue() ?? '')}</p> },
  { id: "clean_subscribers", accessorKey: "clean_subscribers", header: "Кол-во подписчиков чистых", cell: (props) => <p>{String(props.getValue() ?? '')}</p> },
  { id: "clean_cr", accessorKey: "clean_cr", header: "CR чистый", cell: (props) => <p>{String(props.getValue() ?? '')}</p> },
  { id: "unsubs", accessorKey: "unsubs", header: "Кол-во отписок", cell: (props) => <p>{String(props.getValue() ?? '')}</p> },
  { id: "unsubs_percent", accessorKey: "unsubs_percent", header: "% отписок", cell: (props) => <p>{String(props.getValue() ?? '')}</p> },
  { id: "bot_activations", accessorKey: "bot_activations", header: "Кол-во активаций бота", cell: (props) => <p>{String(props.getValue() ?? '')}</p> },
  { id: "dialogs", accessorKey: "dialogs", header: "Кол-во диалогов", cell: (props) => <p>{String(props.getValue() ?? '')}</p> },
  { id: "repeat_sales_sum", accessorKey: "repeat_sales_sum", header: "Сумма повторных продаж", cell: (props) => <p>{String(props.getValue() ?? '')}</p> },
  { id: "repeat_sales_count", accessorKey: "repeat_sales_count", header: "Количество повторных продаж", cell: (props) => <p>{String(props.getValue() ?? '')}</p> },
  { id: "sales_sum", accessorKey: "sales_sum", header: "Сумма продаж", cell: (props) => <p>{String(props.getValue() ?? '')}</p> },
  { id: "sales_count", accessorKey: "sales_count", header: "Количество продаж", cell: (props) => <p>{String(props.getValue() ?? '')}</p> },
  { id: "registrations_sum", accessorKey: "registrations_sum", header: "Сумма регистраций", cell: (props) => <p>{String(props.getValue() ?? '')}</p> },
  { id: "registrations_count", accessorKey: "registrations_count", header: "Количество регистраций", cell: (props) => <p>{String(props.getValue() ?? '')}</p> },
];




export const tableDataMock = [
  {
    name: "Канал A",
    clicks: 120,
    subscribers: 80,
    cr: "66.7%",
    clean_subscribers: 75,
    clean_cr: "62.5%",
    unsubs: 10,
    unsubs_percent: "12.5%",
    bot_activations: 40,
    dialogs: 25,
    repeat_sales_sum: 1500,
    repeat_sales_count: 5,
    sales_sum: 3000,
    sales_count: 10,
    registrations_sum: 2000,
    registrations_count: 8,
  },
  {
    name: "Канал B",
    clicks: 90,
    subscribers: 60,
    cr: "66.7%",
    clean_subscribers: 55,
    clean_cr: "61.1%",
    unsubs: 5,
    unsubs_percent: "8.3%",
    bot_activations: 35,
    dialogs: 22,
    repeat_sales_sum: 1000,
    repeat_sales_count: 4,
    sales_sum: 2200,
    sales_count: 9,
    registrations_sum: 1800,
    registrations_count: 7,
  },
];
