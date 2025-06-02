"use server";

import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { update } from "@/auth";
import { redirect } from "next/navigation";
import { formSchema } from "@/lib/schemas";
import { combineBirthday } from "@/lib/utils";
import { LeadChapter } from "@prisma/client";

function formDataToObject(formData: FormData) {
  const obj: Record<string, any> = {};

  for (const [key, value] of formData.entries()) {
    if (obj[key]) {
      if (Array.isArray(obj[key])) {
        obj[key].push(value);
      } else {
        obj[key] = [obj[key], value];
      }
    } else {
      obj[key] = value;
    }
  }

  return obj;
}

export async function completeProfileAction(formData: FormData): Promise<void> {
  console.log(formData, "is form data")

    const session = await auth();
  if (!session?.user?.email) throw new Error("not authenticated");

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });
  if (!user) throw new Error("user not found");

  const rawValues = formDataToObject(formData);

  const parsed = formSchema.safeParse(rawValues);
  if (!parsed.success) {
    console.error("validation failed", parsed.error.flatten());
    throw new Error("invalid data");
  }

  const data = parsed.data;

  try {
    if (data.role === "MEMBER") {
      const memberData = {
        userId: user.id,
        birthday: combineBirthday({
          day: data.birthday_day,
          month: data.birthday_month,
          year: data.birthday_year,
        }),
        phone: data.phone,
        chapter: LeadChapter[data.chapter as keyof typeof LeadChapter],
        lead_role: data.lead_role,
        university_cycle: Number(data.university_cycle),
        career: data.career,
        linkedin_url: data.linkedin_url,
        resume_url: data.resume_url,
        availability: data.availability,
        languages: data.languages,
        skills: data.skills,
      };

      await prisma.member.upsert({
        where: { userId: user.id },
        update: memberData,
        create: memberData,
      });

      await prisma.user.update({
        where: { id: user.id },
        data: { role: "MEMBER", isProfileComplete: true },
      });
    } else if (data.role === "RECRUITER") {
      const recruiterData = {
        userId: user.id,
        company: data.company!,
      };

      await prisma.recruiter.upsert({
        where: { userId: user.id },
        update: recruiterData,
        create: recruiterData,
      });

      await prisma.user.update({
        where: { id: user.id },
        data: { role: "RECRUITER", isProfileComplete: true },
      });
    }

    await update({
      user: {
        id: user.id,
        isProfileComplete: true,
      },
    });

    console.log("succesful");
    
  } catch (error: any) {
    console.error("error completing profile:", error);
    throw new Error("failed to complete profile. " + (error.message || ""));
  }

  redirect("/");
}
