import { getAuthSession } from "@/lib/auth";
import { getUserProfile } from "@/query/user.query";
import Profile from "../users/[userId]/Profile";
import Post from "@/components/features/post/Post";
import { notFound } from "next/navigation";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

export default async function ProfilPage() {
  const session = await getAuthSession();

  if (!session?.user.id) {
    notFound();
  }

  const user = await getUserProfile(session.user.id);

  if (!user) {
    notFound();
  }

  return (
    <div>
      <Profile user={user}>
        <div className="mt-4">
          <Link
            href={"profile/edit"}
            className={buttonVariants({ variant: "outline" })}
          >
            Edit Profile
          </Link>
        </div>
      </Profile>
      <div className="divide-y divide-accent border-t border-accent mt-4">
        {user.posts.map((post) => (
          <Post post={post} key={post.id} />
        ))}
      </div>
    </div>
  );
}
