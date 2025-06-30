import { lazy } from "react";
import { LANDINGS } from "@entities/landing/constant";

const LandingPage = lazy(() => import("@pages/landing/landing-page"));
const LandingAddPage = lazy(() => import("@pages/landing/landing-add-page"));

export const LANDING_ROUTES = [
  {
    path: LANDINGS.PREFIX,
    element: <LandingPage />,
    handle: {
      breadcrumb: "Лендинг"
    }
  },
  {
    path: LANDINGS.ADD,
    element: <LandingAddPage />,
  },
];
