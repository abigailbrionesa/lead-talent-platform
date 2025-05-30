"use server";

import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { update } from "@/auth";
import { redirect } from "next/navigation";
import { formSchema } from "@/lib/schemas";
import { toast } from "sonner";

function formDataToObject<T = any>(formData: FormData): T {
  const obj: any = {};
  formData.forEach((value, key) => {
    obj[key] = value;
  });
  return obj;
}

export async function completeProfileAction(formData: FormData): Promise<void> {

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
        age: Number(data.age),
        phone: data.phone,
        chapter: data.chapter,
        lead_role: data.lead_role,
        university_cycle: data.university_cycle,
        career: data.career,
        linkedin_url: data.linkedin_url,
        resume_url: data.resume_url,
        availability: data.availability,
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

    console.log("succesful")

  } catch (error: any) {
    console.error("error completing profile:", error);
    throw new Error("failed to complete profile. " + (error.message || ""));
  }
  toast("Event has been created", {
            description: "Sunday, December 03, 2023 at 9:00 AM",
            action: {
              label: "Undo",
              onClick: () => console.log("Undo"),
            },
          })
  
  redirect("/");


}
