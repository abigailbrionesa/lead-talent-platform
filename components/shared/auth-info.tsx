import { auth } from "@/auth";
import prisma from "@/lib/prisma";

export default async function AuthInfo() {
  const session = await auth();

  if (!session?.user?.id) {
    return <div className="p-8">Not logged in</div>;
  }

  const user = await prisma.user.findUnique({
    where: {
      id: session.user.id,
    },
    include: {
      member: true,
      recruiter: true,
    },
  });

  return (
    <div className="p-8">
      <h1 className="text-xl font-bold">User Info</h1>
      <pre className="mt-4">{JSON.stringify(user, null, 2)}</pre>

    </div>
  );
}
