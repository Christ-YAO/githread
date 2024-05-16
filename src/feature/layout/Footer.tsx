import { buttonVariants } from "@/components/ui/button";
import clsx from "clsx";
import { Home, PenSquare, User } from "lucide-react";
import Link from "next/link";

export const Footer = () => {
  return (
    <div className="border-t border-t-accent">
      <div className="py-2 flex justify-between container gap-1 fixed bottom-0 left-0 right-0 bg-background max-w-lg m-auto">
        <Link
          href={"/"}
          className={clsx(buttonVariants({ variant: "ghost" }), "flex-1")}
        >
          <Home size={16} />
        </Link>
        <Link
          href={"/"}
          className={clsx(buttonVariants({ variant: "ghost" }), "flex-1")}
        >
          <PenSquare size={16} />
        </Link>
        <Link
          href={"/"}
          className={clsx(buttonVariants({ variant: "ghost" }), "flex-1")}
        >
          <User size={16} />
        </Link>
      </div>
    </div>
  );
};
