import { ADDRCONFIG } from "dns";
import { TextCursorInput } from "lucide-react";
import { z } from "zod";

const today = new Date();
const minYear = today.getFullYear() - 18;

export const memberSchema = z.object({
  role: z.literal("MEMBER"),
  birthday_day: z.string().min(1).max(31),
  birthday_month: z.string().min(1).max(12),
  birthday_year: z.string().min(4).max(4),
  phone: z.string().min(9).max(9),
  chapter: z.string().min(2),
  university_cycle: z.string().min(1),
  lead_role: z.string().min(2),
  career: z.string().min(2),
  linkedin_url: z.string().url(),
  resume_url: z.string().url(),
  availability: z.string().min(2),
  full_name: z.string().min(2),
  email: z.string().email(),
  profile_picture: z.string().url().optional(),
  skills: z.array(z.string()).min(1),
  languages: z.array(z.string()).min(1),
});

export const recruiterSchema = z.object({
  role: z.literal("RECRUITER"),
  company: z.string().min(2),
  full_name: z.string().min(2),
  email: z.string().email(),
  profile_picture: z.string().url().optional(),
});

export const adminSchema = z.object({
  role: z.literal("ADMIN"),
  full_name: z.string().min(2),
  email: z.string().email(),
  profile_picture: z.string().url().optional(),
});


export const emptyRoleSchema = z.object({
  role: z.literal(""),
});


export const formSchema = z.discriminatedUnion("role", [
  memberSchema,
  recruiterSchema,
  adminSchema,
  emptyRoleSchema,
]);