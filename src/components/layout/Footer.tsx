"use client";

import Link from "next/link";
import clsx from "clsx";
import { buttonVariants } from "../ui/button";
import { usePathname } from "next/navigation";
import { Home, PenSquare, User } from "lucide-react";

export function Footer() {
    const pathname = usePathname();
    return (
        <header className="fixed z-20 bottom-0 w-full bg-[#000000c8] backdrop-blur-xl md:hidden">
            <div className="container flex items-center justify-between py-2 max-w-5xl m-auto gap-1">
                {/* Links */}
                <div className="py-1 flex-1 flex justify-evenly items-center container gap-1 ">
                    <Link
                        href="/"
                        className={clsx(
                            buttonVariants({
                                variant: "ghost",
                            }),
                            "flex-1",
                            { "bg-accent/65": pathname === "/" }
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
                            { "bg-accent/65": pathname?.includes("/write") }
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
                                "bg-accent/65": pathname?.includes("/profile"),
                            }
                        )}
                    >
                        <User size={20} />
                    </Link>
                </div>
                {/* Links */}
            </div>
        </header>
    );
}
