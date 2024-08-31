"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { usePathname, useRouter } from "next/navigation";
import { User } from "@prisma/client";
import WriteEditForm, { WritePostFormValues } from "../../../../write/WriteEditForm";
import { PostHome } from "@/query/post.query";

export default function EditModal({
  user,
  // createReply,
  path,
  post
}: {
  user: User;
  // createReply: (values: WritePostFormValues) => Promise<string>;
  path: string;
  post: PostHome
}) {
  const router = useRouter();
  const pathname = usePathname();

  console.log("pathname", pathname);
  

  return (
    <Dialog open={pathname?.includes(path)} onOpenChange={() => router.back()}>
      <DialogContent>
        <WriteEditForm
          user={user}
          post={post}
          // onSubmit={createReply}
        />
      </DialogContent>
    </Dialog>
  );
}
