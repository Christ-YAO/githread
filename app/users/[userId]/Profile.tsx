import { UserProfile } from "@/query/user.query";
import { PropsWithChildren } from "react";

export default function Profile({
  user,
}: PropsWithChildren<{ user: UserProfile }>) {
  return (
    <div className="mt-4">
      <div className="flex gap-2 items-start justify-between">
        <h3 className="text-2xl font-bold">{user.name}</h3>
        <p>{user.username}</p>
      </div>
    </div>
  );
}
