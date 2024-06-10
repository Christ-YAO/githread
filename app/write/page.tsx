import { getUser } from "@/components/features/query/user.query";
import WritePostForm from "./WritePostForm";

export default async function WritePage() {
    const user = await getUser();
    return (
        <WritePostForm user={user} onSubmit={async () => {
            "use server";
        }} />
    );
}