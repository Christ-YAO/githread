import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UserProfile } from "@/query/user.query";
import Link from "next/link";
import { PropsWithChildren } from "react";

const removeHttp = (url: string) => {
  return url.replace(/(^\w+:|^)\//, "");
};

export default function Profile({
  user,
  children,
}: PropsWithChildren<{ user: UserProfile }>) {
  return (
    <div className="mt-4 px-4">
      <div className="flex gap-2 items-start justify-between">
        <div className="flex flex-col gap-0.5">
          <h3 className="text-2xl font-bold">{user.name}</h3>
          <p className="font-light">{user.username}</p>
        </div>
        <Avatar size="xl">
          {user.image ? (
            <AvatarImage src={user.image} alt={`${user.username}`} />
          ) : null}
          <AvatarFallback>
            {user.username?.slice(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>
      </div>
      {user.bio ? (
        <pre className="text-sm font-light mt-4 text-wrap font-sans">{user.bio}</pre>
      ) : (
        <p className="text-muted-foreground text-sm font-light">No bio</p>
      )}
      <div className="flex items-center gap-2 mt-4">
        <div className="flex -space-x-2">
          {user.followeds.map((f) => (
            <Avatar
              size="sm"
              key={f.follower.id}
              className="border-2 border-background"
            >
              {f.follower.image ? (
                <AvatarImage
                  src={f.follower.image}
                  alt={`${f.follower.username}`}
                />
              ) : null}
              <AvatarFallback>
                {f.follower.username?.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
          ))}
        </div>
        <p className="text-muted-foreground">{" ~ "}</p>
        <p className="text-muted-foreground text-sm">
          {user._count.followeds} followers
        </p>
        {user.link ? (
          <>
            <p className="text-muted-foreground">{" ~ "}</p>
            <Link
              className="text-muted-foreground hover:underline"
              href={user.link}
            >
              {removeHttp(user.link)}
            </Link>
          </>
        ) : null}
      </div>
      {children}
    </div>
  );
}
