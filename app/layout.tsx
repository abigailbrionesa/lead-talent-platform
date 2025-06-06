import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "next-themes";
import "./globals.css";
import { createClient } from "@/utils/supabase/server";
import { cn } from "@/lib/utils";
import { Navbar } from "@/components/global/navbar";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "LEAD",
  description: "comunidad LEAD",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = await createClient();
  const {data: {user}} = await supabase.auth.getUser();
  let user_profile_data = null;
  if (user) {
    const { data } = await supabase
      .from("profiles")
      .select("role, profile_picture, full_name, email")
      .eq("id", user.id)
      .single();
    user_profile_data = data;
  }
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(geistSans.variable,geistMono.variable,"antialiased","min-h-screen bg-background")}>
        <Navbar user={user_profile_data} />
        {/*CAN BE NULL  navbar needs the following elements (IT CAN BE NULL TOO) ROLE, PROFILE_PICTURE, FULL_NAME, EMAIL */}
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
