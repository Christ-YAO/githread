"use client";

import { usePathname, useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { ArrowLeftIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export default function GoBack() {
  const pathname = usePathname();
  const router = useRouter();
  return (
    <Button
      variant={"secondary"}
      onClick={() => {
        router.back();
      }}
      className={cn("rounded-full py-1 px-[10px] opacity-0", {
        "opacity-100 transition-all": pathname !== "/",
      })}
    >
      <ArrowLeftIcon size={16} />
    </Button>
  );
}
