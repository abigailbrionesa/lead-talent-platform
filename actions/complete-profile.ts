"use server";

import { update } from "@/auth";
import { redirect } from "next/navigation";
import { formSchema } from "@/lib/schemas";
import { combineBirthday } from "@/lib/utils";
import { LeadChapter } from "@prisma/client";
import { LeadRole } from "@prisma/client";
import { createClient } from "@/utils/supabase/server";

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
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const rawValues = formDataToObject(formData);

  const parsed = formSchema.safeParse(rawValues);
  if (!parsed.success) {
    console.error("Validation failed", parsed.error.flatten());
    throw new Error("Invalid data");
  }

  const data = parsed.data;
const { error } = await supabase
  .from("profiles")
  .upsert(
    { id: user.id, role: data.role },
    { onConflict: "id" }
  );
  if (error) throw error;

  try {
    if (data.role === "MEMBER") {
      const memberData = {
        id: user?.id,
        birthday: combineBirthday({
          day: data.birthday_day,
          month: data.birthday_month,
          year: data.birthday_year,
        }),
        phone: data.phone,
        chapter: LeadChapter[data.chapter as keyof typeof LeadChapter],
        lead_role: LeadRole[data.lead_role as keyof typeof LeadRole],
        university_cycle: Number(data.university_cycle),
        career: data.career,
        linkedin_url: data.linkedin_url,
        resume_url: data.resume_url,
        availability: data.availability,
        languages: data.languages,
        skills: data.skills,
      };

      const { error } = await supabase
        .from("member_profiles")
        .upsert(memberData);

      if (error) throw error;
    } else if (data.role === "RECRUITER") {
      const recruiterData = {
        userId: user?.id,
        company: data.company,
      };

      const { error } = await supabase
        .from("recruiter_profiles")
        .upsert(recruiterData);

      if (error) throw error;
    }

    console.log("Profile completed successfully");
  } catch (error: any) {
    console.error("Error completing profile:", error);
    throw new Error("Failed to complete profile. " + (error.message || ""));
  }

  redirect("/");
}
