import { getUserEdit } from "@/query/user.query";
import { ProfileForm } from "./ProfileForm";
import { editProfile } from "./edit-profile.action";

export default async function ProfileEditPage() {
  const user = await getUserEdit();
  return (
    <div className="h-[80vh] container flex items-center">
      <div className="bg-card border rounded-md border-border p-4 flex-1">
        <ProfileForm user={user} onSubmit={editProfile} />
      </div>
    </div>
  );
}
