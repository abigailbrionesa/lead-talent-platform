import { z } from "zod";

export const memberSchema = z.object({
  role: z.literal("MEMBER"),
  age: z.coerce.number().min(18).max(100),
  phone: z.string().min(9).max(15),
  chapter: z.string().min(2),
  university_cycle: z.string().min(1),
  lead_role: z.string().min(2),
  career: z.string().min(2),
  linkedin_url: z.string().url(),
  resume_url: z.string().url(),
  availability: z.string().min(2),
  name: z.string().min(2),
  email: z.string().email(),
  image: z.string().url().optional(),
});

export const recruiterSchema = z.object({
  role: z.literal("RECRUITER"),
  company: z.string().min(2),
  name: z.string().min(2),
  email: z.string().email(),
  image: z.string().url().optional(),
});

export const formSchema = z.discriminatedUnion("role", [memberSchema, recruiterSchema]);
