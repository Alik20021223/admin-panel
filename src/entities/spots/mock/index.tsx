import { CustomColumnDef } from '@entities/landing/types';
import { TableRowFollower, TableRowСonversion } from '@entities/spots/types';
import TgIcon from '@assets/telegram.svg'
import { EllipsisVertical } from 'lucide-react';
import { Button } from '@shadcdn/button';



export const tableHeaderMockConversion: CustomColumnDef<TableRowСonversion>[] = [
  {
    id: "id",
    accessorKey: "id",
    header: "ID",
    cell: (props) => <p>{String(props.getValue() ?? "")}</p>,
  },
  {
    id: "date",
    accessorKey: "date",
    header: "Дата",
    cell: (props) => <p>{String(props.getValue() ?? "")}</p>,
  },
  {
    id: "type",
    accessorKey: "type",
    header: "Тип",
    cell: (props) => <p>{String(props.getValue() ?? "")}</p>,
  },
  {
    id: "follower",
    accessorKey: "follower",
    header: "Фолловер",
    cell: (props) => <p>{String(props.getValue() ?? "")}</p>,
  },
  {
    id: "deal",
    accessorKey: "deal",
    header: "Сделка",
    cell: (props) => <p>{String(props.getValue() ?? "")}</p>,
  },
  {
    id: "actions",
    accessorKey: "actions",
    header: "Действия",
    cell: (props) => <Button onClick={() => console.log(props)}>
      <EllipsisVertical />
    </Button >,
  },
];

export const tableBodyMockConversion: TableRowСonversion[] = [
  {
    id: 1,
    date: "2025-06-18 14:30",
    type: "Copy",
    follower: "user1@example.com",
    deal: "Buy BTC/USD",
  },
  {
    id: 2,
    date: "2025-06-18 14:45",
    type: "Signal",
    follower: "user2@example.com",
    deal: "Sell ETH/USDT",
  },
  {
    id: 3,
    date: "2025-06-18 15:00",
    type: "Copy",
    follower: "user3@example.com",
    deal: "Buy XRP/USD",
  },
  {
    id: 4,
    date: "2025-06-18 15:15",
    type: "Manual",
    follower: "user4@example.com",
    deal: "Sell ADA/USDT",
  },
];

// ----------------------------

export const tableHeaderMockFollower: CustomColumnDef<TableRowFollower>[] = [
  { id: "id", accessorKey: "id", header: "ID", cell: (props) => <p>{String(props.getValue() || '')}</p> },
  { id: "name", accessorKey: "name", header: "Название", cell: (props) => <p>{String(props.getValue() || '')}</p> },
  { id: "username", accessorKey: "username", header: "Юзернейм", cell: (props) => <p>{String(props.getValue() || '')}</p> },
  { id: "tg_channel_id", accessorKey: "tg_channel_id", header: "ID канала в ТГ", cell: (props) => <p>{String(props.getValue() || '')}</p> },
  { id: "tg_channel_name", accessorKey: "tg_channel_name", header: "Название канала в ТГ", cell: (props) => <p>{String(props.getValue() || '')}</p> },
  { id: "country", accessorKey: "country", header: "Страна", cell: (props) => <p>{String(props.getValue() || '')}</p> },
  { id: "campaign_id", accessorKey: "campaign_id", header: "ID кампании", cell: (props) => <p>{String(props.getValue() || '')}</p> },
  { id: "campaign_name", accessorKey: "campaign_name", header: "Название кампании", cell: (props) => <p>{String(props.getValue() || '')}</p> },
  { id: "adset_id", accessorKey: "adset_id", header: "ID эдсета", cell: (props) => <p>{String(props.getValue() || '')}</p> },
  { id: "adset_name", accessorKey: "adset_name", header: "Название эдсета", cell: (props) => <p>{String(props.getValue() || '')}</p> },
  { id: "ad_id", accessorKey: "ad_id", header: "ID объявления", cell: (props) => <p>{String(props.getValue() || '')}</p> },
  { id: "ad_name", accessorKey: "ad_name", header: "Название объявления", cell: (props) => <p>{String(props.getValue() || '')}</p> },
  { id: "placement", accessorKey: "placement", header: "Место размещения", cell: (props) => <p>{String(props.getValue() || '')}</p> },
  { id: "landing", accessorKey: "landing", header: "Лэндинг", cell: (props) => <p>{String(props.getValue() || '')}</p> },
  { id: "source", accessorKey: "source", header: "Источник", cell: (props) => <p>{String(props.getValue() || '')}</p> },
  { id: "os", accessorKey: "os", header: "OS", cell: (props) => <p>{String(props.getValue() || '')}</p> },
  {
    id: "actions",
    accessorKey: "actions",
    header: "Действия",
    cell: (props) => (
      <Button variant="ghost" size="icon" onClick={() => console.log(props.row.original)}>
        <EllipsisVertical className="w-4 h-4" />
      </Button>
    ),
    meta: {
      style: { width: "60px" },
    },
  },
];

export const tableBodyMockFollower: TableRowFollower[] = [
  {
    id: 1,
    name: "Crypto Bot",
    username: "@crypto_bot",
    tg_channel_id: "123456789",
    tg_channel_name: "Crypto Signals",
    country: "US",
    campaign_id: "cmp_001",
    campaign_name: "BTC Promo",
    adset_id: "adset_001",
    adset_name: "High Value Traders",
    ad_id: "ad_001",
    ad_name: "Banner BTC 728x90",
    placement: "Telegram Channel",
    landing: "https://crypto-site.com/landing1",
    source: "Facebook",
    os: "Android",
  },
  {
    id: 2,
    name: "Invest App",
    username: "@invest_app",
    tg_channel_id: "987654321",
    tg_channel_name: "Investing Club",
    country: "DE",
    campaign_id: "cmp_002",
    campaign_name: "ETH Campaign",
    adset_id: "adset_002",
    adset_name: "Mobile Traders",
    ad_id: "ad_002",
    ad_name: "ETH Video Ad",
    placement: "Telegram Bot",
    landing: "https://crypto-site.com/landing2",
    source: "Instagram",
    os: "iOS",
  },
  {
    id: 3,
    name: "Signals Pro",
    username: "@signalspro",
    tg_channel_id: "543216789",
    tg_channel_name: "Signals Pro",
    country: "UZ",
    campaign_id: "cmp_003",
    campaign_name: "XRP Drive",
    adset_id: "adset_003",
    adset_name: "Desktop Audience",
    ad_id: "ad_003",
    ad_name: "XRP Banner",
    placement: "Ad Bot",
    landing: "https://crypto-site.com/landing3",
    source: "Google",
    os: "Windows",
  },
];

export const typeSpotTelegram = [
  { value: 'App', label: 'Telegram app' },
  { value: 'Bot', label: 'Telegram bot' },
  { value: 'channel', label: 'Telegram channel' },
]

export const CreateTypeSpotTelegram = [
  // { value: 'create/app', label: 'Telegram app', icon: <LayoutPanelLeft /> },
  // { value: 'create/bot', label: 'Telegram Бот', icon: <Bot /> },
  {
    value: 'create/channel', label: 'Telegram канал', icon:
      <img src={TgIcon} alt='tg-icon' width={24} height={24}></img>
  },
]

