export type TableRow = {
  name: string;
  clicks: number;
  subscribers: number;
  cr: string;
  clean_subscribers: number;
  clean_cr: string;
  unsubs: number;
  unsubs_percent: string;
  bot_activations: number;
  dialogs: number;
  repeat_sales_sum: number;
  repeat_sales_count: number;
  sales_sum: number;
  sales_count: number;
  registrations_sum: number;
  registrations_count: number;
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
