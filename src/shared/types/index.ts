export type NotificationStatus = "info" | "success" | "warning" | "error";

export type NotificationItems = {
  id: number;
  title: string;
  description: string;
  date: string;
  status: NotificationStatus;
};

export type UserInfo = {
  email: string;
  first_name: string;
  id: number;
  last_name: string;
  role: string;
};

export type UserInfoResponse = {
  user: UserInfo;
};

export type domainItem = {
  id: number;
  created_at: string;
  updated_at: string;
  deleted_at: string;
  url: string;
};

export type DomainListResponse = {
  domain: domainItem[];
};

export type BreadCrumpType = {
  PATH: string;
  BREADCRUMB: string;
};

export type BreadcrumbHandle =
  | { breadcrumb: string }
  | { breadcrumb: (params: Record<string, string>) => string };

export interface DragHandleProps {
  onPointerDown?: (event: React.PointerEvent) => void;
  onKeyDown?: (event: React.KeyboardEvent) => void;
  onFocus?: (event: React.FocusEvent) => void;
  role?: string;
  tabIndex?: number;
  [key: string]: unknown;
}

export type ButtonBotType = {
  name: string;
  url: string;
  id?: number;
};

export type ButtonBotTypeResponse = {
  text: string;
  url: string;
  id?: string;
} 

export type UserType = {
  id: number;
  role: string;
};

export type DomainType = {
  id: number;
  url: string;
};

export type SpotType = {
  id: number;
  channel_id: number;
  title: string;
  spot_type?: string;
};

export type SelectOption = {
  value: string;
  label: string;
  flag?: string;
};
