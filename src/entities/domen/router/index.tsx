import { lazy } from "react";
import { DOMEN } from "@entities/domen/constant";

const DomenPage = lazy(() => import("@pages/domen/domen-list"));

export const DOMENS_ROUTES = [
  {
    path: DOMEN.PREFIX,
    element: <DomenPage />,
    handle: {
      breadcrumb: "Домены"
    },
  },
];
