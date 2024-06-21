import { getUser } from "@/query/user.query";
import WritePostForm from "./WritePostForm";
import { createPost } from "./write-post.action";

// On est pas obligé de créer cette page pour afficher la @modal, mais néanmois faudrait la faire pour quelle retourne le formulaire lorsque le page est rafraichit

export default async function WritePage() {
  const user = await getUser();
  return (
    <WritePostForm
      user={user}
      onSubmit={createPost}
      label="Post"
    />
  );
}
