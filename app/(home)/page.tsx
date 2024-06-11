import Post from "@/components/features/post/Post";
import { getLatestPosts } from "@/query/post.query";
import { getAuthSession } from "@/lib/auth";
import { AuthButton } from "@/components/features/auth/AuthButton";

export default async function Home() {
  const session = await getAuthSession();

  const posts = await getLatestPosts();
  return (
    <div className="divide-y divide-muted ">
      {!session?.user.id ? (
        <div className="w-full h-[80svh] grid">
          <div className="flex items-center justify-center text-sm">
            <h5 className="text-xl font-semibold">Not Logged In</h5>{" "}
            <div className="h-10 w-[0.5px] bg-accent mx-4"></div>You must be logged in before you can view posts !
          </div>
          <AuthButton />
        </div>
      ) : (
        <>
          {posts.map((p) => (
            <Post post={p} key={p.id} />
          ))}
        </>
      )}
    </div>
  );
}
