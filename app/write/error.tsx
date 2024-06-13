"use client"; // Error components must be Client Components

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";
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

  return (
    // <div className="grid place-content-center h-[80vh] gap-4 px-4">
    //   <div className="w-full grid">
    //       <div className="flex items-center justify-center text-sm sm:text-nowrap">
    //         <h5 className="text-lg font-semibold capitalize">Something went wrong!</h5>{" "}
    //         <div className="h-10 w-[0.5px] bg-accent mx-4"></div>You must be logged in before you can view posts !
    //       </div>
    //     </div>
    //   <Button
    //   variant={'outline'}
    //     onClick={
    //       // Attempt to recover by trying to re-render the segment
    //       () => reset()
    //     }
    //   >
    //     Try again
    //   </Button>
    // </div>
    <Alert className="my-8 space-x-4">
      <AlertTriangle />
      <AlertTitle>Not logged</AlertTitle>
      <AlertDescription>You must be logged in to access this page.</AlertDescription>
    </Alert>
  );
}
