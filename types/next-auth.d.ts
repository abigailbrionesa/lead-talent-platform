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
