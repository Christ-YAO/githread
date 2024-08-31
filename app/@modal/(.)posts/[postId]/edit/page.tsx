import { getUser } from "@/query/user.query";
import EditModal from "./EditModal";
import { getPost } from "@/query/post.query";
import { notFound } from "next/navigation";

export default async function Page({ params }: { params: { postId: string } }) {
  const user = await getUser();
  const post = await getPost(params.postId, user.id);

  if (!post) {
    return notFound();
  }

  return (
    <EditModal
      path="edit"
      user={user}
      post={post}
    />
  );
}
