import { getAuthSession } from "@/lib/auth";

export default async function Home() {
  const session = await getAuthSession()
  return (
    <div className="">
      <p>{JSON.stringify(session, null, 2)}</p>
    </div>
  );
}
