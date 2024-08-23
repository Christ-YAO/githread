"use client";

import Link from "next/link";
import { PostHome } from "../../../query/post.query";
import PostLayout from "./PostLayout";
import { buttonVariants } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";
import LikeButton from "./LikeButton";
import { cn } from "@/lib/utils";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { useEffect, useState } from "react";
import useDetectScroll, { Direction } from "@smakss/react-scroll-direction";

type PostProps = {
  post: PostHome;
};

export default function Post({ post }: PostProps) {

  // State variable for managing zoomed image
  const [zoomedImage, setZoomedImage] = useState<string | null>(null);
  // Function to open zoomed image
  const openZoomedImage = (imageUrl: string | null) => {
    setTimeout(() => {
      setZoomedImage(imageUrl);
    }, 300);
  };
  // Function to close zoomed image
  const closeZoomedImage = () => {
    setZoomedImage(null);
  };
  

  const { scrollDir, scrollPosition } = useDetectScroll();

  useEffect(() => {
    if (scrollDir === Direction.Up || scrollDir === Direction.Down) {
      setZoomedImage(null);
    }
  }, [scrollPosition]);

  return (
    <PostLayout user={post.user} postId={post.id} createdAdt={post.createdAt} className="group">
      <Link href={`/posts/${post.id}`} className="text-sm text-foreground">
        {post.content}
      </Link>
      {post.media && post.media?.length > 1 ? (
        <Carousel className="mr-14 sm:-ml-4 sm:mr-10">
          <CarouselContent>
            {post.media?.map((media, index) => (
              <CarouselItem key={index} className="sm:basis-1/2 cursor-pointer h-full" onClick={() => openZoomedImage(media)}>
                <img src={media || ""} alt="post image" className="h-full w-fit rounded active:scale-[96%] transition-all duration-300" />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden group-hover:flex transition-all" />
          <CarouselNext className="hidden group-hover:flex transition-all" />
        </Carousel>
      ) : (
        post.media && post.media.length === 1 ? (
          <img src={post.media[0]} alt="post image" className="w-fit rounded cursor-pointer active:scale-[96%] transition-all duration-300" onClick={() => openZoomedImage(post.media[0])}/>
        ) : null
      )}

      {/* Render the zoomed image */}
      {zoomedImage && (
        <div className="zoomed-image-container" onClick={closeZoomedImage}>
          <img src={zoomedImage} alt="zoomed-image" className="zoomed-image" />
        </div>
      )}

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
