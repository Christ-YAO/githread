"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { usePathname, useRouter } from "next/navigation";
import { User } from "@prisma/client";
import WriteReplyForm, { WritePostFormValues } from "../../../../write/WriteReplyForm";

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
        <WriteReplyForm
          user={user}
          onSubmit={createReply}
        />
      </DialogContent>
    </Dialog>
  );
}
