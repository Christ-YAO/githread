"use client";

import { Button } from "@/components/ui/button";
import Loader from "@/components/ui/loader";
import { useMutation } from "@tanstack/react-query";
import { followUser } from "./follow.action";
import { toast } from "sonner";
import { UserRoundMinus, UserRoundPlus } from "lucide-react";

export function FollowButton({
  id,
  isFollowing,
}: {
  id: string;
  isFollowing: { id: string } | null;
}) {
  let toastActive = false;
  const mutation = useMutation({
    // mutationKey: "signIn",
    mutationFn: async () => followUser(id),
    // onError: () => window.location.reload(),
  });
  return (
    <Button
      variant={"secondary"}
      size={"sm"}
      disabled={mutation.isPending}
      onClick={() => {
        mutation.mutate();
        toast(`${isFollowing ? `Unfollowed` : `Followed`}`);
      }}
    >
      {mutation.isPending ? (
        <Loader className="mr-2" size={12} />
      ) : isFollowing ? (
        <span className="flex items-center gap-2">
          <UserRoundMinus size={16}/>
          Unfollow
        </span>
      ) : (
        <span className="flex items-center gap-2">
          {" "}
          <UserRoundPlus size={16}/> Follow
        </span>
      )}
    </Button>
  );
}
