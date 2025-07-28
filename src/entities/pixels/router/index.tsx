import { lazy } from "react";
import { PIXELS } from "@entities/pixels/constant";

const PixelPage = lazy(() => import("@pages/pixels/pixels-page"));

export const PIXELS_ROUTES = [
  {
    path: PIXELS.PREFIX,
    element: <PixelPage />,
    handle: {
      breadcrumb: "Пиксели"
    },
  },
];
