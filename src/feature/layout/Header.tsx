import { ThemeToggle } from "@/src/theme/ThemeToggle";
import LoginButton from "./auth/LoginButton";
import { getAuthSession } from "@/lib/auth";
import { UserProfile } from "./UserProfile";

export const Header = async () => {
  const session = await getAuthSession();

  return (
    <header className="border-b border-b-accent fixed top-0 bg-background w-full">
      <div className="container flex items-center py-2 max-w-lg m-auto gap-1">
        <h2 className="text-2xl font-bold mr-auto">Githread</h2>
        {session?.user ? <UserProfile /> : <LoginButton />}
        <ThemeToggle />
      </div>
    </header>
  );
};
