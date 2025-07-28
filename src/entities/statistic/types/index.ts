export type TableRow = {
  channel_id: number;
  channel_name: string;
  total_clicks: number;
  total_subscribers: number;
  net_subscribers: number;
  unsubscriptions: number;
  percentage_unsubscriptions: number;
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
    from: Date;
    to: Date;
  };
  fb_adset: string;
  fb_campaign: string;
  fb_ad: string;
  fb_ad_name: string;
  adset_name: string;
  source_name: string;
  spot_type: string;
  channel: string;
  company: string;
  placement: string;
  landing: string;
  spot: string;
  country: string;
  buyer: string;
};
