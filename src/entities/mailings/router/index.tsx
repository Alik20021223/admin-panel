import { lazy } from "react";
import { MAILINGS } from "@entities/mailings/constant";

const MailingAddBot = lazy(() => import("@/pages/mailing/mailing-add-page"));
const MailingPage = lazy(() => import("@/pages/mailing/mailing-page"));

export const MAILING_ROUTES = [
  {
    path: MAILINGS.PREFIX,
    element: <MailingPage />,
    handle: {
      breadcrumb: "Рассылки"
    },
  },
  {
    path: MAILINGS.ADD,
    element: <MailingAddBot />,
    handle: {
      breadcrumb: "Добавить рассылку"
    }
  },
];
