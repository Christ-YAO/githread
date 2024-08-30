import { PropsWithChildren, useEffect, useState } from "react";
import clsx from "clsx";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { formatDate } from "@/lib/date";
import { MoreHorizontal, OctagonAlert, SquarePen, Trash2 } from "lucide-react";
import { PostHome } from "@/query/post.query";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

type PostLayoutProps = PropsWithChildren<{
  user: PostHome["user"];
  createdAdt?: Date;
  className?: string;
  postId?: string;
  userId?: string | undefined;
}>;

export default function PostLayout({
  className,
  user,
  createdAdt,
  postId,
  children,
  userId,
}: PostLayoutProps) {

  const router = useRouter();

  return (
    <div className={clsx("flex w-full flex-row items-start p-4", className)}>
      <Avatar size="default" className="border">
        {user.image ? (
          <AvatarImage src={user.image} alt={`${user.username}`} />
        ) : null}
        <AvatarFallback>
          {user.username?.slice(0, 2).toUpperCase()}
        </AvatarFallback>
      </Avatar>
      <div className="ml-4 flex w-full flex-col gap-2">
        <div>
          <div className="flex flex-row items-center justify-between gap-2">
            <Link href={`/users/${user.id}`} className="flex gap-2 items-baseline">
              <p className="text-md font-medium text-card-foreground mr-auto hover:underline transition-all">
                {user.username}
              </p>
              {createdAdt ? (
                <p className="text-sm text-muted-foreground font-light">
                  {formatDate(createdAdt)}
                </p>
              ) : null}
            </Link>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant={"ghost"} className="rounded-3xl p-2">
                  <MoreHorizontal size={20} strokeWidth={"1.5px"} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className=" divide-y divide-muted">
                <DropdownMenuItem className="flex items-center justify-between cursor-pointer rounded-none">
                  report
                  <OctagonAlert size={16} className="ml-2" />
                </DropdownMenuItem>
                {userId === user.id && (
                  <>
                    <DropdownMenuItem className="texflex items-center justify-between cursor-pointer rounded-none">
                      update
                      <SquarePen size={16} className="ml-2" />
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={async () => {
                      // if (confirm("Are you sure you want to delete this post?")) {
                      await fetch(`/api/delete/${postId}`, {
                        method: "DELETE",
                      });
                      router.refresh();
                      // }
                    }} className="text-red-600 flex items-center justify-between cursor-pointer rounded-none">
                      delete
                      <Trash2 size={16} className="ml-2" />
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        {children}
      </div>
    </div>
  );
}
