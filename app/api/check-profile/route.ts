import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import prisma from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const session = await auth();

  if (!session?.user?.email) {
    return NextResponse.json({ isComplete: false });
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    include: { member: true, recruiter: true },
  });

  const isComplete =
    (user?.role === "MEMBER" && !!user.member) ||
    (user?.role === "RECRUITER" && !!user.recruiter);

  return NextResponse.json({ isComplete });
}