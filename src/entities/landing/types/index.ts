import { SpotType, DomainType, UserType } from "@shared/types";
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
  showToCountry: string[];
};

export type TranslateFormType = {
  textDownload: string;
  textViewTelegram: string;
  textMembers: string;
};

export type ExpertGeneralFormType = {
  name: string;
  title: string;
  // whitePage: string;
  description: string;
  showToCountry: string[];
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
  spots: SpotType[];
  domains: DomainType[];
  auto_redirect: boolean;
  text_button: string;
  text_members: string;
};

export type CreateDefaultLanding = {
  name: string;
  domain_id: number;
  spot_id: number;
  spot_type: string;
  auto_redirect: boolean;
  allowed_countries: string[];
};

export type CreateProLanding = {
  name: string;
  title: string;
  description: string;
  domain_id: number;
  spot_id: number;
  spot_type: string;
  auto_redirect: boolean;
  members: number;
};

export interface CreateProDesign {
  avatar_image: File;
  background_image: File;
  logo: File;
  accent_color: string;
  background_color: string;
  banner_background_color: string;
}

export interface ButtonsPro {
  text_members: string;
  text_button: string;
  text_view_telegram: string;
}

type Landing = {
  landing_id: string;
  name: string;
  title: string;
  description: string;
  members: number;
  auto_redirect: boolean;
  avatar_image: string;
  background_image: string;
  logo_image: string;
  use_custom_html: boolean;
  use_custom_css: boolean;
  text_members: string;
  text_button: string;
  text_view_telegram: string;
  accent_color: string;
  background_color: string;
  allowed_countries: string[] | null;
  banner_background_color: string;
  html: string;
  css: string;
};

type CurrentLanding = {
  domain: DomainType;
  spot: SpotType;
};

export type LandingData = {
  current_landing: CurrentLanding;
  domains: DomainType[];
  landing: Landing;
  spots: SpotType[];
};
