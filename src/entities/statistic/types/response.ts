interface Landing {
  id: number;
  name: string;
}

interface Channel {
  id: number;
  name: string;
}

interface DateRange {
  min_date: string; // ISO date string, e.g. "2023-01-01"
  max_date: string; // ISO date string, e.g. "2023-12-31"
}

export interface AdData {
  adset_id: string[];
  adset_name: string[];
  site_source_name: string[]; // e.g. ["facebook.com", "instagram.com"]
  pixel: string[];
  ad_id: string[];
  ad_name: string[];
  campaign_id: string[];
  campaign_name: string[];
  placement: string[];
  landings: Landing[];
  channels: Channel[];
  domains: string[];
  date_range: DateRange;
}
