import LoginPage from "@/pages/login-register/login-page";
import RegisterPage from "@/pages/login-register/register-page";
import { createBrowserRouter, Outlet } from "react-router-dom";
import MainLayout from "@app/layouts/main-layout";
import StatisticPage from "@/pages/statistic/statistic-page";

import { MAILING_ROUTES } from "@entities/mailings/router";
import { LANDING_ROUTES } from "@entities/landing/router";
import { MAILINGS } from "@entities/mailings/constant";
import { LANDINGS } from "@entities/landing/constant";
import { SPOTS } from "@entities/spots/constant";
import { SPOTS_ROUTES } from "@entities/spots/router";

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/statistic",
        element: <StatisticPage />
      },
      {
        path: SPOTS.PREFIX,
        element: <Outlet />,
        children: SPOTS_ROUTES,
      },
      {
        path: LANDINGS.PREFIX,
        element: <Outlet />,
        children: LANDING_ROUTES,
      },
      {
        path: MAILINGS.PREFIX,
        element: <Outlet />,
        children: MAILING_ROUTES,
      },
    ]
  },
]);
