import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@shadcdn/breadcrumb";
import { NavLink, useLocation, matchPath, generatePath } from "react-router-dom";

import { BreadCrumpType } from "@shared/types";
import { useMemo } from "react";

// Карта соответствий разделов

type DynamicBreadcrumbsProps = {
  pathMap: Record<string, BreadCrumpType[]>;
};

const DynamicBreadcrumbs: React.FC<DynamicBreadcrumbsProps> = ({ pathMap }) => {
  const location = useLocation();
  const pathParts = location.pathname.split("/").filter(Boolean);
  
  const data = useMemo(() => {
    const first = pathParts[0];
    return pathMap[first] ?? [];
  }, [location.pathname]);
  

const breadcrumbs = useMemo(() => {
  let currentPath = "";
  const items: { link: string; text: string }[] = [];

  for (let i = 0; i < pathParts.length; i++) {
    currentPath += `/${pathParts[i]}`;

    const matched = data.find((item) => matchPath({ path: item.PATH, end: true }, currentPath))
      || data.find((item) => matchPath({ path: item.PATH, end: false }, currentPath));

    if (matched) {
      const paramMatches = matched.PATH.match(/:([a-zA-Z]+)/g) || [];
      const params = Object.fromEntries(
        paramMatches.map((param) => [param.slice(1), pathParts[i + 1]])
      );

      const link = matched.PATH.includes(":")
        ? generatePath(matched.PATH, params)
        : matched.PATH;

      // ➤ Избегаем дублей по text
      if (!items.find((el) => el.text === matched!.BREADCRUMB)) {
        items.push({ link, text: matched.BREADCRUMB });
      }
    }
  }

  return items;
}, [location.pathname, data]);



  const len = breadcrumbs.length;

  return (
    <Breadcrumb>
      <BreadcrumbList className="hidden sm:flex text-xs lg:text-sm">
        <BreadcrumbItem>
          <NavLink to="/" className="text-neutral-500 text-xs">
            Главная
          </NavLink>
        </BreadcrumbItem>

        {breadcrumbs.map((item, i) => (
          <BreadcrumbSegment key={i} item={item} isLast={i === len - 1} />
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

const BreadcrumbSegment = ({
  item,
  isLast,
}: {
  item: { link: string; text: string };
  isLast: boolean;
}) => {
  return (
    <>
      <BreadcrumbSeparator />
      <BreadcrumbItem>
        {isLast ? (
          <BreadcrumbPage>{item.text}</BreadcrumbPage>
        ) : (
          <NavLink to={item.link} className="text-xs text-neutral-500">
            {item.text}
          </NavLink>
        )}
      </BreadcrumbItem>
    </>
  );
};

export default DynamicBreadcrumbs;
