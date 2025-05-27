"use server";

import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { update } from "@/auth";
import { redirect } from "next/navigation";

export async function completeProfileAction(formData: FormData): Promise<void> {
  for (const [key, value] of formData.entries()) {
    console.log(`${key}: ${value}`);
  }

  const session = await auth();
  console.log("session:", session);

  if (!session?.user?.email) {
    console.error("no authenticated session");
    throw new Error("not authenticated");
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });
  console.log("fetched user:", user);

  if (!user) {
    console.error("user not found in database for email:", session.user.email);
    throw new Error("user not found");
  }

  const role = formData.get("role") as "MEMBER" | "RECRUITER";
  console.log("selected role:", role);

  if (role !== "MEMBER" && role !== "RECRUITER") {
    console.error("invalid role provided:", role);
    throw new Error("invalid role selected");
  }

  try {
    if (role === "MEMBER") {
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
      console.log("Creating member with data:", memberData);

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
      const recruiterData = {
        userId: user.id,
        company: formData.get("company") as string,
      };
      console.log("creating recruiter with data:", recruiterData);

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
    console.error("error completing profile:", error.message || error);
    throw new Error("failed to complete profile. " + (error.message || ""));
  }
  console.log("profile completed successfully. Redirecting...");
  redirect("/");
}


