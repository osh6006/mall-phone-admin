"use client";

import Link from "next/link";

import { useParams, usePathname } from "next/navigation";

import { LayoutDashboard, Receipt, Settings } from "lucide-react";

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
      icon: <Receipt className=" h-5 w-5" />,
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
            "flex items-center gap-2 text-base font-medium transition-colors hover:text-primary px-3 py-2 border-2 border-transparent",
            route.active
              ? "text-black dark:text-white border-inherit rounded-sm"
              : "text-muted-foreground "
          )}
        >
          <>{route.icon}</>
          <>{route.label}</>
        </Link>
      ))}
    </div>
  );
}