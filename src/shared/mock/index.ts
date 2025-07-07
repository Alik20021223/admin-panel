import { AtSign, ChartNoAxesColumn, PanelsTopLeft, Users } from "lucide-react";
import img from "@assets/shadcn-user.jpg";
import { NotificationItems, SelectOption } from "@shared/types";

export const mockSideBarItems = [
  {
    title: "Статистика",
    url: "/statistic",
    icon: ChartNoAxesColumn,
  },
  {
    title: "Споты",
    url: "/spots",
    icon: Users,
  },
  {
    title: "Лендинги",
    url: "/landings",
    icon: PanelsTopLeft,
  },
  {
    title: "Рассылки",
    url: "/mailings",
    icon: AtSign,
  },
];

export const notifications: NotificationItems[] = [
  {
    id: 1,
    title: "Успешная попытка входа в аккаунт!",
    description: "Вы успешно вошли в аккаунт с IP 95.142.94.53",
    date: "04.06.2025 16:09",
    status: "success",
  },
  {
    id: 2,
    title: "Успешная попытка входа в аккаунт!",
    description: "Вы успешно вошли в аккаунт с IP 46.20.196.97",
    date: "03.06.2025 17:58",
    status: "info",
  },
  {
    id: 3,
    title: "Успешная попытка входа в аккаунт!",
    description: "Вы успешно вошли в аккаунт с IP 46.20.196.97",
    date: "03.06.2025 17:34",
    status: "info",
  },
  {
    id: 2,
    title: "Успешная попытка входа в аккаунт!",
    description: "Вы успешно вошли в аккаунт с IP 46.20.196.97",
    date: "03.06.2025 17:58",
    status: "info",
  },
  {
    id: 3,
    title: "Успешная попытка входа в аккаунт!",
    description: "Вы успешно вошли в аккаунт с IP 46.20.196.97",
    date: "03.06.2025 17:34",
    status: "info",
  },
  {
    id: 2,
    title: "Успешная попытка входа в аккаунт!",
    description: "Вы успешно вошли в аккаунт с IP 46.20.196.97",
    date: "03.06.2025 17:58",
    status: "info",
  },
  {
    id: 3,
    title: "Успешная попытка входа в аккаунт!",
    description: "Вы успешно вошли в аккаунт с IP 46.20.196.97",
    date: "03.06.2025 17:34",
    status: "info",
  },
];

export const userMock = {
  name: "John",
  email: "alik20021223@gmail.com",
  avatar: img,
};

export const defaultOptions = [
  { label: "Опция 1", value: "option1" },
  { label: "Опция 2", value: "option2" },
];

export const booleanOptions = [
  { label: "Нет", value: "false" },
  { label: "Да", value: "true" },
];

export const postBackOptions = [
  { label: "Выключен", value: "false" },
  { label: "Включен", value: "true" },
];

export const CommandOptions = [
  { label: "Сообщение", value: "false" },
  { label: "Команда", value: "true" },
];

const mailingTypesRaw = ["permanent", "disposable"];
export const mailingTypesObjects = mailingTypesRaw.map((type) => ({
  value: type,
  label: type === "permanent" ? "Постоянная" : "Одноразовая", // можно задать перевод или оставить как есть
}));

export const dayOptions: SelectOption[] = [
  { value: "monday", label: "Понедельник" },
  { value: "tuesday", label: "Вторник" },
  { value: "wednesday", label: "Среда" },
  { value: "thursday", label: "Четверг" },
  { value: "friday", label: "Пятница" },
  { value: "saturday", label: "Суббота" },
  { value: "sunday", label: "Воскресенье" },
];
