import NavbarServer from "@/components/global/navbar-server";
import prisma from "@/lib/prisma";
import AccountForm from "./account-form";
import { auth } from "@/auth";

export default async function AccountPage() {
  const session = await auth();
  if (!session) return <div>Not authenticated</div>

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    include: {
      member: true,
      recruiter: true,
    },
  });

  console.log(user)

  if (!user) return <p>User not found</p>;

  return (
    <div>
      <NavbarServer />
      <div className="h-20" />
      <h1 className="text-2xl font-bold mb-6">Edit Profile</h1>
        <AccountForm user={user} />
    </div>
  );
}