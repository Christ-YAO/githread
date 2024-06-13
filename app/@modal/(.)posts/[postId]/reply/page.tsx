import { getUser } from "@/query/user.query";
import WriteModal from "../../../(.)write/WriteModal";
import { createReply } from "../../../../posts/[postId]/reply/write-reply.action";

export default async function Page({ params }: { params: { postId: string } }) {
  const user = await getUser();
  return (
    <WriteModal
    path="reply"
      user={user}
      createPost={async (values) => {
        "use server";

        const reply = createReply(params.postId, values);
        return reply;
      }}
    />
  );
}
