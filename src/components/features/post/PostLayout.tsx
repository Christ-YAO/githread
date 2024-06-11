import { PropsWithChildren } from "react";
import { PostHome } from "../../../query/post.query";
import clsx from "clsx";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { formatDate } from "@/lib/date";
import { MoreHorizontal } from "lucide-react";

type PostLayoutProps = PropsWithChildren<{
  user: PostHome["user"];
  createdAdt?: Date;
  className?: string;
  postId?: string;
}>;

export default function PostLayout({
  className,
  user,
  createdAdt,
  postId,
  children
}: PostLayoutProps) {
  return (
    <div className={clsx("flex w-full flex-row items-start p-4", className)}>
      <Avatar>
        {user.image ? (
          <AvatarImage src={user.image} alt={`${user.username}`} />
        ) : null}
        <AvatarFallback>
          {user.username?.slice(0, 2).toUpperCase()}
        </AvatarFallback>
      </Avatar>
      <div className="ml-4 flex w-full flex-col gap-2">
        <Link href={`/users/${user.id}`}>
          <div className="flex flex-row items-center gap-2">
            <p className="text-sm text-card-foreground mr-auto">
              {user.username}
            </p>
            {createdAdt ? (
              <p className="text-sm text-muted-foreground">
                {formatDate(createdAdt)}
              </p>
            ) : null}
            <button>
              <MoreHorizontal size={20} />
            </button>
          </div>
        </Link>
        {children}
      </div>
    </div>
  );
}
