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
      variant={"ghost"}
      onClick={() => {
        router.back();
      }}
      className={cn("rounded-full py-1 px-[10px] hidden", {
        block: pathname !== "/",
      })}
    >
      <ArrowLeftIcon size={16} />
    </Button>
  );
}
