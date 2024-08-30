"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { usePathname, useRouter } from "next/navigation";
import WritePostForm, { WritePostFormValues } from "../../write/WritePostForm";
import { User } from "@prisma/client";

export default function WriteModal({
  user,
  // createPost,
  path,
}: {
  user: User;
  // createPost: (values: WritePostFormValues) => Promise<string>;
  path: string;
}) {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <Dialog open={pathname?.includes(path)} onOpenChange={() => router.back()}>
      <DialogContent>
        <WritePostForm
          user={user}
          // onSubmit={createPost}
        />
      </DialogContent>
    </Dialog>
  );
}
