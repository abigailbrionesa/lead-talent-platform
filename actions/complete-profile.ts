"use server";

import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { update } from "@/auth";
import { redirect } from "next/navigation";

export async function completeProfileAction(formData: FormData): Promise<void> {
  const session = await auth();
  if (!session?.user?.email) throw new Error("not authenticated");

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });
  if (!user) throw new Error("user not found");

  const role = formData.get("role") as "MEMBER" | "RECRUITER";
  if (!["MEMBER", "RECRUITER"].includes(role)) throw new Error("invalid role selected");

  try {
    if (role === "MEMBER") {
      const existing = await prisma.member.findUnique({ where: { userId: user.id } });
      if (existing) throw new Error("User is already registered as a member");

      const memberData = {
        userId: user.id,
        age: parseInt(formData.get("age") as string),
        phone: formData.get("phone") as string,
        chapter: formData.get("chapter") as string,
        lead_role: formData.get("lead_role") as string,
        university_cycle: formData.get("university_cycle") as string,
        career: formData.get("career") as string,
        linkedin_url: formData.get("linkedin_url") as string,
        resume_url: formData.get("resume_url") as string,
        availability: formData.get("availability") as string,
      };

      await prisma.member.create({ data: memberData });

      await prisma.user.update({
        where: { id: user.id },
        data: { role: "MEMBER", isProfileComplete: true },
      });

      await update({
        user: {
          id: user.id,
          isProfileComplete: true,
        },
      });
    } else if (role === "RECRUITER") {
      const existing = await prisma.recruiter.findUnique({ where: { userId: user.id } });
      if (existing) throw new Error("User is already registered as a recruiter");

      const recruiterData = {
        userId: user.id,
        company: formData.get("company") as string,
      };

      await prisma.recruiter.create({ data: recruiterData });

      await prisma.user.update({
        where: { id: user.id },
        data: { role: "RECRUITER", isProfileComplete: true },
      });

      await update({
        user: {
          id: user.id,
          isProfileComplete: true,
        },
      });
    }
  } catch (error: any) {
    console.error("Error completing profile:", error);
    throw new Error("Failed to complete profile. " + (error.message || ""));
  }

  redirect("/");
}