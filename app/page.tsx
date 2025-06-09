import { auth } from "@/auth";
import { Navbar } from "@/components/global/navbar";
import { LandingSection } from "@/components/sections/landing";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";


export default async function Home() {

  {/* 
  const supabase = await createClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  let profile = null;

  if (session) {
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", session.user.id)
      .single();

    if (!data || error) {
      redirect("/account");
    }

    profile = data;
  } else {
    redirect("/login");
  }*/}

  return (
      <LandingSection /> //i just want their role
  );
}
