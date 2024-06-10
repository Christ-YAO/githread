import Post from "@/components/features/post/Post";
import { getLatestPosts } from "@/components/features/query/post.query";
import { getAuthSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export default async function Home() {
    const session = await getAuthSession();

    const posts = await getLatestPosts()
    return (
        <div className="divide-y divide-muted ">
            {posts.map(p => (
                <Post post={p} key={p.id} />
            ))}
        </div>
    );
}