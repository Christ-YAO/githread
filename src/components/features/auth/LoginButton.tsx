"use client";

import { Button } from "@/components/ui/button";
import Loader from "@/components/ui/loader";
import { useMutation } from "@tanstack/react-query";
import { LogIn } from "lucide-react";
import { signIn } from "next-auth/react";

export function LoginButton() {
  const mutation = useMutation({
    // mutationKey: "signIn",
    mutationFn: async () => signIn('github'),
    // onSuccess: () => window.location.reload(),
    onError: () => window.location.reload(),
  });
  return (
    <Button
      variant={"outline"}
      size={"sm"}
      disabled={mutation.isPending}
      onClick={() => {
        mutation.mutate();
      }}
    >
      {mutation.isPending ? (
        <Loader className="mr-2" size={12} />
      ) : (
        <LogIn className="mr-2" size={12} />
      )}
      Login
    </Button>
  );
}
