"use client";

import Link from "next/link";

import { useParams, usePathname } from "next/navigation";

import {
  Image as LucidImg,
  LayoutDashboard,
  Settings,
  Grip,
  TabletSmartphone,
  Palette,
  Box,
  BaggageClaim,
} from "lucide-react";

import { cn } from "@/lib/utils";

export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const pathName = usePathname();
  const params = useParams();

  const routes = [
    {
      href: `/${params.storeId}`,
      label: "OverView",
      active: pathName === `/${params.storeId}`,
      icon: <LayoutDashboard className=" h-5 w-5" />,
    },
    {
      href: `/${params.storeId}/billboards`,
      label: "Billboards",
      active: pathName === `/${params.storeId}/billboards`,
      icon: <LucidImg className=" h-5 w-5" />,
    },
    {
      href: `/${params.storeId}/categories`,
      label: "Categories",
      active: pathName === `/${params.storeId}/categories`,
      icon: <Grip className=" h-5 w-5" />,
    },
    {
      href: `/${params.storeId}/storages`,
      label: "Storage",
      active: pathName === `/${params.storeId}/storages`,
      icon: <TabletSmartphone className=" h-5 w-5" />,
    },
    {
      href: `/${params.storeId}/colors`,
      label: "Colors",
      active: pathName === `/${params.storeId}/colors`,
      icon: <Palette className=" h-5 w-5" />,
    },
    {
      href: `/${params.storeId}/products`,
      label: "Products",
      active: pathName === `/${params.storeId}/products`,
      icon: <Box className=" h-5 w-5" />,
    },
    {
      href: `/${params.storeId}/orders`,
      label: "Orders",
      active: pathName === `/${params.storeId}/orders`,
      icon: <BaggageClaim className="w-5 h-5" />,
    },
    {
      href: `/${params.storeId}/settings`,
      label: "Settings",
      active: pathName === `/${params.storeId}/settings`,
      icon: <Settings className=" h-5 w-5" />,
    },
  ];

  return (
    <div className={cn("flex flex-col justify-center gap-2", className)}>
      {routes.map((route) => (
        <Link
          key={route.href}
          href={route.href}
          className={cn(
            "flex items-center  text-base font-medium transition-colors hover:text-primary  p-2 border-2 border-transparent lg:gap-2 lg:px-3 lg:py-2",
            route.active
              ? "text-black dark:text-white border-inherit rounded-sm"
              : "text-muted-foreground "
          )}
        >
          <div className="mx-auto lg:m-0">{route.icon}</div>
          <div className="hidden lg:block">{route.label}</div>
        </Link>
      ))}
    </div>
  );
}
