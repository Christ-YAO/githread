"use client"; // Error components must be Client Components

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { AlertTriangle } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);
  const router = useRouter();
  const pathname = usePathname();

  return (
    <Dialog open={pathname === "/write"} onOpenChange={() => router.back()}>
      <DialogContent>
        <Alert className="my-8 space-x-4">
          <AlertTriangle />
          <AlertTitle>Not logged</AlertTitle>
          <AlertDescription>
            You must be logged in to access this page.
          </AlertDescription>
        </Alert>
      </DialogContent>
    </Dialog>
  );
}
