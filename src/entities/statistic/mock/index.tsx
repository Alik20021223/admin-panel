import { ColumnDef } from '@tanstack/react-table';
import { TableRow } from '@entities/statistic/types';

export const tableHeaderMock: ColumnDef<TableRow>[] = [
  {
    id: "channel_id",
    accessorKey: "channel_id",
    header: "ID канала",
    cell: (props) => <p>{String(props.getValue() ?? '')}</p>,
  },
  {
    id: "channel_name",
    accessorKey: "channel_name",
    header: "Название канала",
    cell: (props) => <p>{String(props.getValue() ?? '')}</p>,
  },
  {
    id: "conversion",
    accessorKey: "conversion",
    header: "CR",
    cell: (props) => <p>{String(props.getValue() ?? '')}</p>,
  },
  {
    id: "conversion_clear",
    accessorKey: "conversion_clear",
    header: "Чистый CR",
    cell: (props) => <p>{String(props.getValue() ?? '')}</p>,
  },
  {
    id: "total_clicks",
    accessorKey: "total_clicks",
    header: "Общее число кликов",
    cell: (props) => <p>{String(props.getValue() ?? '')}</p>,
  },
  {
    id: "total_subscribers",
    accessorKey: "total_subscribers",
    header: "Общее число подписчиков",
    cell: (props) => <p>{String(props.getValue() ?? '')}</p>,
  },
  {
    id: "net_subscribers",
    accessorKey: "net_subscribers",
    header: "Чистые подписчики",
    cell: (props) => <p>{String(props.getValue() ?? '')}</p>,
  },
  {
    id: "unsubscriptions",
    accessorKey: "unsubscriptions",
    header: "Не подписанные",
    cell: (props) => <p>{String(props.getValue() ?? '')}</p>,
  },
  {
    id: "percentage_unsubscriptions",
    accessorKey: "percentage_unsubscriptions",
    header: "% Не подписанных",
    cell: (props) => <p>{String(props.getValue() ?? '')}</p>,
  },

  {
    id: "total_purchase",
    accessorKey: "total_purchase",
    header: "Кол-во продаж",
    cell: (props) => <p>{String(props.getValue() ?? '')}</p>,
  },
  {
    id: "total_sum_purchase",
    accessorKey: "total_sum_purchase",
    header: "Сумма продаж",
    cell: (props) => <p>{String(props.getValue() ?? '')}</p>,
  },
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
