
import LandingSection from "@/components/sections/landing";
import { auth } from "@/auth";
import { Navbar } from "@/components/global/navbar";

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