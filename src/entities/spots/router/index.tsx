import { lazy } from "react";
import { SPOTS } from "@entities/spots/constant";

const SpotsPage = lazy(() => import("@pages/spots/spots-page"));
const SpotsAdd = lazy(() => import("@pages/spots/spots-add-page"));
const SpotsAddChannel = lazy(() => import("@widgets/spots/spots-channel-content"));
const SpotsAddApp = lazy(() => import("@widgets/spots/spots-app-content"));
const SpotsAddBot = lazy(() => import("@widgets/spots/spots-bot-content"));
const SpotsPostBack = lazy(() => import("@widgets/spots/postback-content"));
const SpotConversion = lazy(() => import("@widgets/spots/conversion-content"));
const FollowerContent = lazy(() => import("@widgets/spots/follower-content"));
const SpotItem = lazy(() => import("@pages/spots/spot-item"));

export const SPOTS_ROUTES = [
  {
    path: SPOTS.PREFIX,
    element: <SpotsPage />,
  },
  {
    path: SPOTS.ADD,
    element: <SpotsAdd />,
    children: [
      {
        path: SPOTS.CHANNEL,
        element: <SpotsAddChannel />
      },
      {
        path: SPOTS.BOT,
        element: <SpotsAddBot />
      },
      {
        path: SPOTS.APP,
        element: <SpotsAddApp />
      },
    ]
  },
  {
    path: SPOTS.ITEM,
    element: <SpotItem />,
    children: [
      {
        path: SPOTS.POSTBACK,
        element: <SpotsPostBack />
      },
      {
        path: SPOTS.CONVERSION,
        element: <SpotConversion />
      },
      {
        path: SPOTS.FOLLOWER,
        element: <FollowerContent />
      },

    ]
  },

  // {
  //   path: LANDINGS.ADD,
  //   element: <LandingAddPage />,
  // },
];
