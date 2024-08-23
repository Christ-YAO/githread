// src/components/layout/Header.
import Link from "next/link";
import { Typography } from "../ui/Typography";
import { ThemeToggle } from "../theme/ThemeToggle";
import { SiteConfig } from "@/lib/site-config";
import { AuthButton } from "../features/auth/AuthButton";
import GoBack from "./GoBack";
import { NavBarLinks } from "./NavBarLinks";

export function Header() {
  return (
    <header className="fixed z-20 top-0 w-full bg-[#000000c8] backdrop-blur-xl">
      <div className="container flex items-center justify-between py-2 max-w-5xl m-auto gap-1">
        <div className="block md:hidden">
          <GoBack />
        </div>
        <div className="flex gap-2 items-center">
          <Typography
            variant="h3"
            as={Link}
            href="/"
            className="font-extralight bg-accent/50 p-1 rounded hover:bg-accent transition-all"
          >
            <span className="hidden md:block tracking-tighter">{SiteConfig.title}</span>{" "}
            <span className="block md:hidden">~T.C~</span>
          </Typography>
        </div>
        {/* Links */}
        <NavBarLinks />
        {/* Links */}
        <div className="flex items-center justify-end space-x-4">
          <nav className="flex items-center space-x-1">
            <AuthButton />
            <ThemeToggle />
          </nav>
        </div>
      </div>
    </header>
  );
}
