import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { buttonVariants } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <Alert className="my-8 space-x-4">
      <AlertTriangle />
      <AlertTitle>Not found</AlertTitle>
      <AlertDescription className="mb-2">
        Post Not Found.
      </AlertDescription>
      <Link href={"/"} className={buttonVariants({variant: "link"})}>Home</Link>
    </Alert>
  );
}
