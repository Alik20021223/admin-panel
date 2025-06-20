import { ButtonBotType } from "@shared/types";
import { ColumnDef } from "@tanstack/react-table";
import { ReactNode } from "react";

export type TableRowСonversion = {
  id: number;
  date: string;
  type: string;
  follower: string;
  deal: string;
  actions?: ReactNode;
};

export type TableRowFollower = {
  id: number; // ID
  name: string; // Название
  username: string; // Юзернейм
  tg_channel_id: string; // ID канала в ТГ
  tg_channel_name: string; // Название канала в ТГ
  country: string; // Страна
  campaign_id: string; // ID кампании
  campaign_name: string; // Название кампании
  adset_id: string; // ID эдсета
  adset_name: string; // Название эдсета
  ad_id: string; // ID объявления
  ad_name: string; // Название объявления
  placement: string; // Место размещения
  landing: string; // Лэндинг
  source: string; // Источник
  os: string; // OS
  actions?: ReactNode; // Действия
};

export type ItemSpotType = {
  name: string;
  id: string;
  subscriber: number;
  type: "App" | "Bot" | "channel";
  creator: string;
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

export type FormType = {
  search: string;
  typeSpot: string[];
};

export type FormTypeConversion = {
  search: string;
  typeSpot: string[];
  period: {
    from: Date;
    to: Date;
  };
};

export type FormFilterTypeFollower = {
  channel: string; // Рекламный канал
  fb_campaign: string; // Кампания ФБ
  fb_adset: string; // Эдсет ФБ
  fb_ad: string; // Объявление ФБ
  company: string; // Название компании
  adset_name: string; // Название Эдсета
  fb_ad_name: string; // Название объявления
  placement: string; // Место размещения
  source_name: string; // Название источника
  landing: string; // Лэндинг
  spot: string; // Спот
  country: string; // Страна
  buyer: string; // Баер
  period: {
    // Дата подписки (range)
    from: Date | null;
    to: Date | null;
  };
  bot_activation_date: {
    // Дата активации бота (range)
    from: Date | null;
    to: Date | null;
  };
  contact_date: {
    // Дата контакта (range)
    from: Date | null;
    to: Date | null;
  };
  unsubscribe_date: {
    // Дата отписки (range)
    from: Date | null;
    to: Date | null;
  };
  first_sale_date: {
    // Первая продажа (range)
    from: Date | null;
    to: Date | null;
  };
  registration_date: {
    // Дата регистрации (range)
    from: Date | null;
    to: Date | null;
  };
  hide_unsubscribed: boolean; // Не показывать отписавшихся
};

export type StepOneSpotChannel = {
  idChannel: string;
  tokenBot: string;
};

export type CommandCondition = {
  commandCondition: string;
  textCommand: string;
  descriptionCommand: string;
  buttonsTypeCommand: ButtonBotType[];
  mediaCommand: File | null;
};

export type outPostBackType = {
  event: string;
  id: string;
  typeRequest: string;
  linkToOutPostBack: string;
};

export type PostBack = {
  typePostBack: string;
  enterPixel: string;
  apiKey: string;
  outPostBack: string;
  outPostBackArray: outPostBackType[];
};

export type AppSpotType = {
  generalText: string;
  botToken: string;
  userName: string;
  linkToApp: string;
  linkToName: string;
  HelloSelect: string;
  textHello?: string;
  mediaHello?: File | null;
  buttonsTypeHello?: ButtonBotType[];
  command: CommandCondition[];
  postBack: PostBack[];
};

export type BotSpotType = {
  generalText: string;
  shortName: string;
  linkToWebhook: string;
  postBack: PostBack[];
};
