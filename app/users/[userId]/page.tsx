import { getAuthSession } from "@/lib/auth";
import { getUserProfile } from "@/query/user.query";
import Profile from "./Profile";
import { notFound, redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { Button } from "@/components/ui/button";

import Post from "@/components/features/post/Post";
import { Metadata } from "next";
import { AuthButton } from "@/components/features/auth/AuthButton";
import { FollowButton } from "./FollowButton";

export const generateMetadata = async ({
  params,
}: PageParams): Promise<Metadata> => {
  const user = await getUserProfile(params.userId);

  if (!user) {
    throw new Error("User not found");
  }

  return {
    title: `${user?.name} (${user?.username})`,
  };
};

type PageParams = {
  params: { userId: string };
};

export default async function UserPage({
  params,
}: {
  params: { userId: string };
}) {
  const session = await getAuthSession();
  const user = await getUserProfile(params.userId);

  if (!session?.user.id) {
    return (
      <div className="grid place-content-center h-[80vh] gap-4 px-4">
        <div className="w-full grid">
          <div className="flex items-center justify-center text-sm sm:text-nowrap">
            <h5 className="text-lg font-semibold capitalize">Not Logged In</h5>{" "}
            <div className="h-10 w-[0.5px] bg-accent mx-4"></div>You must be
            logged in before you can view posts !
          </div>
        </div>
        <AuthButton />
      </div>
    );
  }

  if (!user) {
    return notFound();
  }

  const isFollowing = session?.user.id
    ? await prisma.follow.findFirst({
        where: {
          followerId: session.user.id,
          followingId: user.id,
        },
        select: {
          id: true,
        },
      })
    : null;

  const isCurrentUser = params.userId === session?.user.id;

  if (isCurrentUser) {
    redirect("/profile");
  }

  return (
    <div>
      <Profile user={user}>
        <form className="mt-4">
          {/* <Button
            variant={"outline"}
            formAction={async () => {
              "use server";
              if (!session?.user.id) {
                return;
              }

              await followUser(params.userId);
            }}
          >
            {isFollowing ? "Unfollow" : "Follow"}
          </Button> */}
          <FollowButton id={params.userId} isFollowing={isFollowing} />
        </form>
      </Profile>
      <div className="divide-y divide-accent border-t border-accent mt-4">
        {user.posts.map((post) => (
          <Post post={post} key={post.id} />
        ))}
      </div>
    </div>
  );
}
