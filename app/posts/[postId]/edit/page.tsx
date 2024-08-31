import Post from "@/components/features/post/Post";
import { getPost } from "@/query/post.query";
import { getUser } from "@/query/user.query";
import { notFound } from "next/navigation";
import WriteEditForm from "../../../write/WriteEditForm";

export default async function PostEdit({
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
      <WriteEditForm
        user={user}
        post={post}
        // onSubmit={async (values) => {
        //   "use server";
        //   return createReply(post.id, values);
        // }}
      />
    </div>
  );
}
