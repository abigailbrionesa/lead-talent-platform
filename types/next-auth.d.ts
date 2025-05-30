import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      role?: string | null;
      emailVerified: Date | null;
      password: string | null;
      isProfileComplete?: boolean;
    };
  }

  interface User {
    id: string;
    role?: string | null;
    isProfileComplete?: boolean | null;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
    role?: string;
    isProfileComplete?: boolean;
  }
}
