import { ChannelUser } from ".";

export interface Channel {
  id: number;
  channel_id: number;
  bot_token: string;
  welcome_message: string;
  welcome_image_url: string;
  members: number;
  welcome_buttons: WelcomeButton[];
  title: string;
}

export interface WelcomeButton {
  id: number;
  text_button: string;
  url_button: string;
}

export interface Pixel {
  id: number;
  pixel_id: number;
  access_token: string;
}

export interface AvailableUser {
  id: number;
  email: string;
  name: string;
}

export interface Permission {
  user_id: number;
  channel_id: string; // Обрати внимание: в JSON это строка, хотя выглядит как число
  email: string;
  name: string;
  can_edit: boolean;
  can_use: boolean;
}



export interface ChannelResponse {
  channel: Channel;
  pixels: Pixel[];
  available_users: AvailableUser[];
  permissions: Permission[];
  user: ChannelUser;
  owner_email: string;
}
