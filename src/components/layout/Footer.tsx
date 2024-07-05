"use client";

import Link from "next/link";
import clsx from "clsx";
import { buttonVariants } from "../ui/button";
import { Home, PenSquare, User } from "lucide-react";
import { usePathname } from "next/navigation";

export const Footer = () => {
  const pathname = usePathname();
  return (
    <div className="py-2 flex-1 flex justify-center items-center container gap-6 max-w-sm">
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
        <Home size={20} />
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
        <PenSquare size={20} />
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
        <User size={20} />
      </Link>
    </div>
  );
};
