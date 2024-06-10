import Link from "next/link";
import { PostHome } from "../query/post.query";
import PostLayout from "./PostLayout";
import { Button } from "@/components/ui/button";
import { Heart, MessageCircle } from "lucide-react";

type PostProps = {
  post: PostHome;
};

export default function Post({ post }: PostProps) {
  return (
    <PostLayout user={post.user} postId={post.id} createdAdt={post.createdAt}>
      <Link href={"/posts/${post.id}"} className="text-sm text-foreground">
        {post.content}
      </Link>
      <div className="flex items-center gap-2">
        <Button size={"icon"} variant={"ghost"}>
          <Heart size={20} />
        </Button>
        <Button size={"icon"} variant={"ghost"}>
          <MessageCircle size={20} />
        </Button>
      </div>
      <div>
        <Link
          className="text-muted-foreground text-sm"
          href={`/posts/${post.id}`}
        >
          {post._count.likes} likes
        </Link>
        {" . "}
        <Link
          className="text-muted-foreground text-sm"
          href={`/posts/${post.id}`}
        >
          {post._count.replies} comments
        </Link>
      </div>
    </PostLayout>
  );
}
