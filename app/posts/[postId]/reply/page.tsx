import Post from "@/components/features/post/Post";
import { getPost } from "@/query/post.query";
import { getUser } from "@/query/user.query";
import { notFound } from "next/navigation";
import WriteReplyForm from "../../../write/WriteReplyForm";
import { createReply } from "./write-reply.action";

export default async function PostReply({
  params,
}: {
  params: { postId: string };
}) {
  const user = await getUser();
  const post = await getPost(params.postId, user.id);

  if (!post) {
    return notFound();
  }

  return (
    <div>
      <Post post={post} userId={user.id} />
      <WriteReplyForm
        user={user}
        onSubmit={async (values) => {
          "use server";
          return createReply(post.id, values);
        }}
      />
    </div>
  );
}
