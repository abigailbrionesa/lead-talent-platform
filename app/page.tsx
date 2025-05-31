
import { auth } from "@/auth";
import { Navbar } from "@/components/global/navbar";
import { LandingSection } from "@/components/sections/landing";

export default async function Home() {
  const session = await auth();
  console.log("session", session)

  return (
    <div>
      <Navbar user={session?.user} />
      <LandingSection user={session?.user} />
    </div>
  );
}