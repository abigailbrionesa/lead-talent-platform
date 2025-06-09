"use client";

import { Button } from "./button";
import { createClient } from "@/utils/supabase/client"; 
import { LogOut } from "lucide-react";

export default function SignOut() {
  const supabase = createClient();
  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Error signing out:", error.message);
    } else {
      console.log("Signed out successfully from Supabase Auth");
    }
  };
  return (
    <Button onClick={handleSignOut} size="sm" variant="ghost">
      <LogOut />
      Cerrar Sesión
    </Button>
  );
}
