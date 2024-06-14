"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { usePathname, useRouter } from "next/navigation";
import { User } from "@prisma/client";
import WritePostForm, { WritePostFormValues } from "../../../../write/WritePostForm";

export default function ReplyModal({
  user,
  createReply,
  path,
}: {
  user: User;
  createReply: (values: WritePostFormValues) => Promise<string>;
  path: string;
}) {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <Dialog open={pathname?.includes(path)} onOpenChange={() => router.back()}>
      <DialogContent>
        <WritePostForm
          user={user}
          onSubmit={createReply}
          label={pathname?.includes("reply") ? "Reply" : "Post"}
        />
      </DialogContent>
    </Dialog>
  );
}
