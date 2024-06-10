import { getAuthSession } from "@/lib/auth";

export default async function Home() {
  const session = await getAuthSession()
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-2">
      <p>{JSON.stringify(session, null, 2)}</p>
    </main>
  );
}
