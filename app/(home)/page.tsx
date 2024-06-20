import Post from "@/components/features/post/Post";
import { getLatestPosts } from "@/query/post.query";
import { getAuthSession } from "@/lib/auth";
import { AuthButton } from "@/components/features/auth/AuthButton";

export default async function Home() {
  const session = await getAuthSession();

  const posts = await getLatestPosts(session?.user.id);

  return (
    <div className="divide-y divide-muted ">
      {!session?.user.id ? (
        <div className="grid place-content-center h-[80vh] gap-4 px-4">
          <div className="w-full grid">
            <div className="flex items-center justify-center text-sm sm:text-nowrap">
              <h5 className="text-lg font-semibold capitalize">
                Not Logged In
              </h5>{" "}
              <div className="h-10 w-[0.5px] bg-accent mx-4"></div>You must be
              logged in before you can view posts !
            </div>
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
