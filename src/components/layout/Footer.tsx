"use client";

import Link from "next/link";
import clsx from "clsx";
import { buttonVariants } from "../ui/button";
import { Home, PenSquare, User } from "lucide-react";
import { usePathname } from "next/navigation";

export const Footer = () => {
  const pathname = usePathname();
  return (
    <div className="py-2 flex-1 hidden  sm:flex justify-center items-center container gap-2 max-w-xs md:max-w-sm">
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
        <Home size={19} />
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
        <PenSquare size={19} />
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
        <User size={19} />
      </Link>
    </div>
  );
};
