// types/next-auth.d.ts
import NextAuth from "next-auth"

declare module "next-auth" {
  interface Session {
    user: {
      name?: string | null
      id?: string | null
      role?: string | null
      email?: string | null
      image?: string | null
      role?: string | null
    }
  }

  interface User {
    role?: string | null
  }
}