import { ButtonBotType, UserType } from "@shared/types";
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
  autoReception: boolean;
  HelloSelect: boolean;
  textHello: string;
  mediaHello: File | null;
  buttonsTypeHello: ButtonBotType[];
  postBack: PostBack[];
  title?: string;
};

export type CommandCondition = {
  commandCondition: string;
  textCommand: string;
  descriptionCommand: string;
  buttonsTypeCommand?: ButtonBotType[];
  mediaCommand?: File | null;
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
};

export type AppSpotPostBackType = {
  postBack: PostBack[];
};

export type AppSpotGeneralType = {
  generalText: string;
};

export type AppSpotBotType = {
  botToken: string;
  userName: string;
  linkToApp: string;
  linkToName: string;
  HelloSelect: string;
  textHello?: string;
  mediaHello?: File | null;
  buttonsTypeHello?: ButtonBotType[];
  command?: CommandCondition[];
};

export type BotSpotType = {
  generalText: string;
  shortName: string;
  linkToWebhook: string;
  postBack: PostBack[];
};

export type BotSpotBotType = {
  shortName: string;
  linkToWebhook: string;
};

export type WelcomeButton = {
  id?: number;
  text_button: string;
  url_button: string;
};

export type Pixel = {
  id: number;
  pixel_id: number; // int64, но в JS это number
  access_token: string;
};

// export type UserShortInfo = {
//   // Предполагается, что структура описана отдельно
//   // id: number;
//   // name: string;
//   // ...
// };

// export type ChannelPermissionDTO = {
//   // Предполагается, что структура описана отдельно
//   // permission: string;
//   // ...
// };

export type ChannelUser = {
  id: number;
  email: string;
  role: string;
};

export type ChannelInfo = {
  id: number;
  channel_id: number; // int64
  bot_token: string;
  welcome_message: string;
  welcome_image_url: string;
  members: number;
  welcome_buttons: WelcomeButton[];
  title: string;
  spot_type: string;
  pixels: Pixel[];
  // available_users: UserShortInfo[];
  // permissions: ChannelPermissionDTO[];
  user: ChannelUser;
  owner_email: string;
};

export type ListSpotsResponseType = {
  user: UserType;
  spots: ChannelInfo[];
};

export type CheckChannelType = {
  bot_token: string;
  channel_id: number;
};

export type AddChannelMessage = {
  auto_approve: boolean;
  welcome_message_flag: boolean;
  welcome_message: string;
  welcome_buttons: WelcomeButton[];
};

export type AddChannelPhoto = {
  photo: File;
};
