"use client";

import Link from "next/link";

import { useParams, usePathname } from "next/navigation";

import { Settings } from "lucide-react";

import { cn } from "@/lib/utils";

export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const pathName = usePathname();
  const params = useParams();

  const routes = [
    {
      href: `/${params.storeId}/settings`,
      label: "Settings",
      active: pathName === `/${params.storeId}/settings`,
      icon: <Settings className=" h-5 w-5" />,
    },
  ];

  return (
    <div
      className={cn(
        "flex flex-col justify-center space-x-4 lg:space-x-6",
        className
      )}
    >
      {routes.map((route) => (
        <Link
          key={route.href}
          href={route.href}
          className={cn(
            "flex items-center gap-2 text-base font-medium transition-colors hover:text-primary px-3 py-1",
            route.active
              ? "text-black dark:text-white border-2 rounded-sm"
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
