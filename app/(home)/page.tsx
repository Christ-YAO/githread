import Post from "@/components/features/post/Post";
import { getLatestPosts } from "@/query/post.query";
import { getAuthSession } from "@/lib/auth";

export default async function Home() {
  const session = await getAuthSession();

  const posts = await getLatestPosts(session?.user.id);

  await new Promise((r) => setTimeout(r, 2000));

  return (
    <div className="divide-y divide-neutral-200 dark:divide-muted space-y-4">
      <>
        {posts.map((p) => (
          <Post post={p} key={p.id} userId={session?.user.id} />
        ))}
      </>
    </div>
  );
}
