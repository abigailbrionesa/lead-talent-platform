import { auth } from "@/auth";
import { Navbar } from "./navbar";
import { redirect } from "next/navigation";

export default async function NavbarServer() {
  const session = await auth();

  return <Navbar session={session} />;
}