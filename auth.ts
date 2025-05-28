import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "./lib/prisma";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";
import bcrypt from "bcryptjs";
import authConfig from "./auth.config";

export const {
  handlers,
  auth,
  signIn,
  signOut,
  unstable_update: update,
} = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  ...authConfig,
  providers: [
    Google,
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        try {
          const parsedCredentials = z
            .object({
              email: z.string().email(),
              password: z.string().min(6),
            })
            .safeParse(credentials);

          if (!parsedCredentials.success) return null;

          const { email, password } = parsedCredentials.data;

          const user = await prisma.user.findUnique({
            where: { email },
            select: {
              id: true,
              email: true,
              name: true,
              image: true,
              password: true,
              role: true,
              isProfileComplete: true,
            },
          });

          if (!user || !user.password) return null;

          const passwordsMatch = await bcrypt.compare(password, user.password);
          if (!passwordsMatch) return null;

          return {
            id: user.id,
            email: user.email,
            name: user.name,
            image: user.image,
            role: user.role,
            isProfileComplete: user.isProfileComplete,
          };
        } catch (error) {
          console.error("credentials auth error:", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
  async session({ session, user }) {
    if (!session.user?.email) return session;

    const dbUser = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: {
        id: true,
        role: true,
        image: true,
        isProfileComplete: true,
      },
    });

    if (dbUser) {
      session.user.id = dbUser.id;
      session.user.role = dbUser.role;
      session.user.image = dbUser.image;
      session.user.isProfileComplete = dbUser.isProfileComplete;
    }
    return session;
  },
},
  pages: {
    signIn: "/login",
  },
});
