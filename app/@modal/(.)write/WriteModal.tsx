"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { usePathname, useRouter } from "next/navigation";
import WritePostForm, { WritePostFormValues } from "../../write/WritePostForm";
import { User } from "@prisma/client";

export default function WriteModal({
  user,
  createPost,
}: {
  user: User;
  createPost: (values: WritePostFormValues) => Promise<string>;
}) {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <Dialog open={pathname === "/write"} onOpenChange={() => router.back()}>
      <DialogContent>
        <WritePostForm user={user} onSubmit={createPost} />
      </DialogContent>
    </Dialog>
  );
}
