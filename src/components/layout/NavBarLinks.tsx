"use client";

import Link from "next/link";
import clsx from "clsx";
import { buttonVariants } from "../ui/button";
import { Home, PenSquare, User } from "lucide-react";
import { usePathname } from "next/navigation";
import GoBack from "./GoBack";

export const NavBarLinks = () => {
  const pathname = usePathname();
  return (
    <div className="py-2 flex-1 hidden  md:flex justify-center items-center container gap-1 max-w-xs md:max-w-sm">
      <div className="hidden sm:block">
        <GoBack />
      </div>
      <Link
        href="/"
        className={clsx(
          buttonVariants({
            variant: "ghost",
          }),
          "flex-1",
          { "bg-accent": pathname === "/" }
        )}
      >
        <Home size={16} />
      </Link>
      <Link
        href="/write"
        className={clsx(
          buttonVariants({
            variant: "ghost",
          }),
          "flex-1",
          { "bg-accent": pathname?.includes("/write") }
        )}
      >
        <PenSquare size={16} />
      </Link>
      <Link
        href="/profile"
        className={clsx(
          buttonVariants({
            variant: "ghost",
          }),
          "flex-1",
          {
            "bg-accent": pathname?.includes("/profile"),
          }
        )}
      >
        <User size={16} />
      </Link>
    </div>
  );
};
