import LoginPage from "@pages/login-register/login-page";
import RegisterPage from "@pages/login-register/register-page";
import { createBrowserRouter, Outlet } from "react-router-dom";
import MainLayout from "@app/layouts/main-layout";
import StatisticPage from "@pages/statistic/statistic-page";

import { MAILING_ROUTES } from "@entities/mailings/router";
import { LANDING_ROUTES } from "@entities/landing/router";
import { MAILINGS } from "@entities/mailings/constant";
import { LANDINGS } from "@entities/landing/constant";
import { SPOTS } from "@entities/spots/constant";
import { SPOTS_ROUTES } from "@entities/spots/router";
import PublicRoute from "./publicRoute";
import ProtectedRoute from "./protectedRoute";
import { DOMEN } from "@entities/domen/constant";
import { DOMENS_ROUTES } from "@entities/domen/router";
import RolePage from "@pages/role-page";
import { PIXELS } from "@entities/pixels/constant";
import { PIXELS_ROUTES } from "@entities/pixels/router";
import { USERS } from "@entities/users/constant";
import { USERS_ROUTES } from "@entities/users/router";



export const router = createBrowserRouter([
  {
    path: "/login",
    element: (
      <PublicRoute>
        <LoginPage />
      </PublicRoute>
    ),
  },
  {
    path: "/register",
    element: (
      <PublicRoute>
        <RegisterPage />
      </PublicRoute>
    ),
  },
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <MainLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "/",
        element: <RolePage />
      },
      {
        path: "/statistic",
        element: <StatisticPage />,
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
      {
        path: DOMEN.PREFIX,
        element: <Outlet />,
        children: DOMENS_ROUTES,
      },
      {
        path: PIXELS.PREFIX,
        element: <Outlet />,
        children: PIXELS_ROUTES,
      },
      {
        path: USERS.PREFIX,
        element: <Outlet />,
        children: USERS_ROUTES,
      },
    ],
  },
]);
