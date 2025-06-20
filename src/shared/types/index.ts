export type NotificationStatus = "info" | "success" | "warning" | "error";

export type NotificationItems = {
  id: number;
  title: string;
  description: string;
  date: string;
  status: NotificationStatus;
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
  link: string;
  id: number;
};
