// src/components/layout/Header.
import Link from "next/link";
import { Typography } from "../ui/Typography";
import { ThemeToggle } from "../theme/ThemeToggle";
import { SiteConfig } from "@/lib/site-config";
import { AuthButton } from "../features/auth/AuthButton";
import { Footer } from "./Footer";
import GoBack from "./GoBack";

export function Header() {
  return (
    <header className="fixed z-20 top-0 w-full backdrop-blur-xl">
      <div className="container flex items-center justify-between py-2 max-w-5xl m-auto gap-1">
        <div className="block sm:hidden">
          <GoBack />
        </div>
        <div className="flex gap-2 items-center">
          <Typography
            variant="h3"
            as={Link}
            href="/"
            className="font-extralight bg-accent/50 p-1 rounded hover:bg-accent transition-all"
          >
            <span className="hidden sm:block tracking-tighter">{SiteConfig.title}</span>{" "}
            <span className="block sm:hidden">~T.C~</span>
          </Typography>
        </div>
        {/* Links */}
        <Footer />
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
