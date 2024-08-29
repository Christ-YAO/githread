import Post from "@/components/features/post/Post";
import { getLatestPosts } from "@/query/post.query";
import { getAuthSession } from "@/lib/auth";
import { AuthButton } from "@/components/features/auth/AuthButton";

export default async function Home() {
  const session = await getAuthSession();

  const posts = await getLatestPosts(session?.user.id);

  await new Promise((r) => setTimeout(r, 2000));

  return (
    <div className="divide-y divide-muted">
      <>
        {posts.map((p) => (
          <Post post={p} key={p.id} />
        ))}
      </>
    </div>
  );
}
