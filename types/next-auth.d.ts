import NextAuth from "next-auth";
import type { Role } from "@prisma/client";
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name: string;
      email: string;
      image: string | null;
      role: Role | null;
      emailVerified: Date | null;
      password: string | null;
      isProfileComplete: boolean;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: Role | null;
    isProfileComplete?: boolean;
  }
}

export type FormValues = {
  role: string;
  name: string;
  email: string;
  image: string;
  age: string;
  phone: string;
  chapter: string;
  university_cycle: string;
  lead_role: string;
  career: string;
  linkedin_url: string;
  resume_url: string;
  availability: string;
  company: string;
};

export type UserInForm = {
  id: string;
  name: string;
  email: string;
  emailVerified: Date | null;
  image: string | null;
  password: string | null;
  role: "MEMBER" | "RECRUITER" | "ADMIN" | string;
  isProfileComplete: boolean;
  member?: {
    birthday: string;
    skills: string[];
    languages: string[];
    phone: string;
    chapter: string;
    university_cycle: string;
    lead_role: string;
    career: string;
    linkedin_url: string;
    birthday:string;
    resume_url: string;
    availability: string;
    submitted_at: Date;
  };
  recruiter?: {
    company: string;
  };
};