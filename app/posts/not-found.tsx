import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { AlertTriangle, Home } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <Alert className="my-8 space-x-4">
      <AlertTriangle />
      <AlertTitle>Not found</AlertTitle>
      <AlertDescription className="mb-2">
        Post Not Found.
      </AlertDescription>
      <Link href={"/"} className={cn(buttonVariants({variant: "secondary"}), 'flex gap-2')}>
      <Home size={16} />Home</Link>
    </Alert>
  );
}
