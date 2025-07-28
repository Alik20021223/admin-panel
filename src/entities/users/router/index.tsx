import { lazy } from "react";
import { USERS } from "@entities/users/constant";

const UsersListPage = lazy(() => import("@pages/users/users-page"));

export const USERS_ROUTES = [
  {
    path: USERS.PREFIX,
    element: <UsersListPage />,
    handle: {
      breadcrumb: "Пользователи"
    },
  },
];
