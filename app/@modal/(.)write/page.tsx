import { getUser } from "@/query/user.query";
import WriteModal from "./WriteModal";
import { createPost } from "../../write/write-post.action";

export default async function Page() {
    const user = await getUser();
    return (
        <WriteModal user={user} createPost={createPost} />
    );
}