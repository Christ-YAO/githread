import Link from "next/link";
import { PostHome } from "../../../query/post.query";
import PostLayout from "./PostLayout";
import { Button, buttonVariants } from "@/components/ui/button";
import { Heart, MessageCircle } from "lucide-react";
import LikeButton from "./LikeButton";
import { cn } from "@/lib/utils";

type PostProps = {
  post: PostHome;
};

export default function Post({ post }: PostProps) {
  return (
    <PostLayout user={post.user} postId={post.id} createdAdt={post.createdAt}>
      <Link href={`/posts/${post.id}`} className="text-sm text-foreground">
        {post.content}
      </Link>
      <div className="flex items-center gap-2">
        <div>
          <LikeButton
            postId={post.id}
            isLiked={post.likes.length > 0}
            likeCount={post._count.likes}
          />
        </div>
        <Link
          href={`/posts/${post.id}/reply`}
          className={cn(buttonVariants({ variant: "ghost", size: "icon" }), 'px-1')}
        >
          <MessageCircle size={20} />
          <p className="font-light text-xs ml-1">{post._count.replies}</p>
        </Link>
      </div>
      {/* <div>
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
      </div> */}
    </PostLayout>
  );
}
