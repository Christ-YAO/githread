import { getAuthSession } from "@/lib/auth";
import { getUserProfile } from "@/query/user.query";
import Profile from "../users/[userId]/Profile";
import Post from "@/components/features/post/Post";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { AuthButton } from "@/components/features/auth/AuthButton";
import { Edit } from "lucide-react";
import { cn } from "@/lib/utils";

export default async function ProfilPage() {
  const session = await getAuthSession();

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

  const user = await getUserProfile(session.user.id);

  if (!user) {
    throw new Error(`User not found`);
  }

  return (
    <div>
      <Profile user={user}>
        <div className="mt-4">
          <Link
            href={"profile/edit"}
            className={cn(
              buttonVariants({ variant: "secondary" }),
              "flex gap-2 items-center font-light"
            )}
          >
            <Edit size={16} /> Edit Profile
          </Link>
        </div>
      </Profile>
      <div className="divide-y divide-accent border-t border-accent mt-4">
        {user.posts.map((post) => (
          <Post post={post} key={post.id} userId={session.user.id} />
        ))}
      </div>
    </div>
  );
}
