export type TableRow = {
  channel_id: number;
  channel_name: string;
  total_clicks: number;
  total_subscribers: number;
  net_subscribers: number;
  unsubscriptions: number;
  percentage_unsubscriptions: number;
  conversion: number;
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
  period: {
    from: Date | null;
    to: Date | null;
  };
};
