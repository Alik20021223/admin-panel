import { ChannelType, DomainType, UserType } from "@shared/types";
import { ColumnDef } from "@tanstack/react-table";

export type TableRow = {
  landing_id: string;
  title: string;
  spot_title: string;
  domain: string;
};

export type ColumnConfig = {
  id: string;
  isVisible: boolean;
  isPinned: boolean;
};

export type CustomColumnDef<T> = ColumnDef<T, unknown> & {
  meta?: {
    style?: React.CSSProperties;
    className?: string;
  };
};

export type GeneralFormType = {
  name: string;
  domen: string;
  autoRedirect: string;
  spot: string;
};

export type AccessFormType = {
  // channelAccess: string;
  showToCountry: string;
  deleteAccess: string;
};

export type TranslateFormType = {
  textDownload: string;
  textViewTelegram: string;
  textMembers: string;
};

export type ExpertGeneralFormType = {
  name: string;
  title: string;
  whitePage: string;
  description: string;
  domen: string;
  autoRedirect: string;
  spot: string;
  countUsers: string;
};

export type ExpertDesignFormType = {
  colorBgBanner: string;
  accentColor: string;
  bgColor: string;
  logo: File | null;
  avatar: File | null;
  patternBg: File | null;
};

export type ListLandingResponseType = {
  user: UserType;
  landings: TableRow[];
};

export type InfoAddFormResponseType = {
  user: UserType;
  channels: ChannelType[];
  domains: DomainType[];
};
