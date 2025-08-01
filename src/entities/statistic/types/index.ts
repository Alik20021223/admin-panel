export type TableRow = {
  channel_id: number;
  channel_name: string;
  total_clicks: number;
  total_subscribers: number;
  net_subscribers: number;
  unsubscriptions: number;
  percentage_unsubscriptions: number;
  conversion: number;
  total_purchase: number;
  total_sum_purchase: number;
  conversion_clear: number;
};

export type StatisticResponse = {
  channels: TableRow[];
};

export type FilterInputType = {
  id: string;
  value: string;
};

export type ColumnConfig = {
  id: string;
  isVisible: boolean;
  isPinned: boolean;
};

export type FormType = {
  period?: {
    from: Date;
    to: Date;
  };
  pixel?: number | null; // ID Facebook Pixel для фильтрации
  campaign_id?: string; // ID кампании Facebook
  campaign_name?: string; // Название кампании Facebook
  adset_id?: string; // ID набора объявлений
  adset_name?: string; // Название набора объявлений
  ad_id?: string; // ID объявления
  ad_name?: string; // Название объявления
  placement?: string; // Размещение объявления
  site_source_name?: string; // Источник трафика (например, facebook)
  landing?: string; // ID лендинга для фильтрации
  channels?: string; // ID канала
  // spot_type?: string; // Тип спота
  // group?: string; // Группировка данных (например: date__date)
  date_from?: string; // Начальная дата в формате YYYY-MM-DD
  date_to?: string; // Конечная дата в формате YYYY-MM-DD
  // domain?: string; // Домен для фильтрации (example.com и т.д.)
};
