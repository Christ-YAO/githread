// src/components/layout/Header.
import Link from "next/link";
import { Typography } from "../ui/Typography";
import { ThemeToggle } from "../theme/ThemeToggle";
import { SiteConfig } from "@/lib/site-config";
import { AuthButton } from "../features/auth/AuthButton";

export function Header() {
  return (
    <header className="border-b border-b-accent fixed z-20 top-0 bg-background w-full">
      <div className="container flex items-center py-2 max-w-lg m-auto gap-1">
        <div className="flex gap-2 items-center">
          <Typography variant="h3" as={Link} href="/">
            {SiteConfig.title}
          </Typography>
        </div>

        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-1">
            <AuthButton />
            <ThemeToggle />
          </nav>
        </div>
      </div>
    </header>
  );
}
