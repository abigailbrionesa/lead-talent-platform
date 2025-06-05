"use server";

import { redirect } from "next/navigation";
import { formSchema } from "@/lib/schemas";
import { combineBirthday } from "@/lib/utils";
import { LeadChapter } from "@prisma/client";
import { LeadRole } from "@prisma/client";
import { createClient } from "@/utils/supabase/server";
import { formDataToObject } from "./utils";


export async function completeProfileAction(formData: FormData, id: string): Promise<void> {
  const supabase = await createClient();
  const rawValues = formDataToObject(formData);
  const parsed = formSchema.safeParse(rawValues);
  if (!parsed.success) {
    console.error("validation failed", parsed.error.flatten());
    throw new Error("invalid data");
  }

  const data = parsed.data;

  const { error } = await supabase
  .from("profiles")
  .upsert(
    { id: id, role: data.role },
    { onConflict: "id" }
  );
  if (error) throw error;

  try {
    if (data.role === "member") {
      const memberData = {
        id: id,
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
    } else if (data.role === "recruiter") {
      const recruiterData = {
        id: id,
        company: data.company,
      };

      const { error } = await supabase
        .from("recruiter_profiles")
        .upsert(recruiterData);

      if (error) throw error;
    }

    console.log("profile successful");
  } catch (error: any) {
    console.error("error in completing profile:", error);
    throw new Error("failure completing profile. " + (error.message || ""));
  }

  redirect("/");
}
